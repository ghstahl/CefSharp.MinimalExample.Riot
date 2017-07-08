using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Sockets;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Biggy.Core;
using Biggy.Data.Json;
using CefSharp;

namespace CEF.Custom
{


    public class DownloadRepository : IDownloadRepository
    {

        private List<IDownloadEventSink> _sinks { get; set; }
        public  void RegisterSink(IDownloadEventSink sink)
        {
            var query = from s in _sinks
                where s == sink
                select s;
            if (!query.Any())
            {
                _sinks.Add(sink);
            }
        }
        public void UnregisterSink(IDownloadEventSink sink)
        {
            var query = from s in _sinks
                        where s != sink
                        select s;
            _sinks = query.ToList();
        }
        private JsonStore<DownloadRecord> JsonStore { get; set; }

        public static string GlobalRootFolder { get; set; }
        public string RootFolder { get { return GlobalRootFolder; } }

        public DownloadRepository()
        {
            var dbPath = EnsurePath(".DB");
            JsonStore = new JsonStore<DownloadRecord>(dbPath);
            _sinks = new List<IDownloadEventSink>();
        }
        public string EnsurePath(string subPath)
        {
            var path = Path.Combine(RootFolder, subPath);
            Directory.CreateDirectory(path);
            return path;

        }

        public List<DownloadRecord> Records
        {
            get
            {
                lock (JsonStore)
                {
                    var dRecords = new BiggyList<DownloadRecord>(JsonStore);
                    return dRecords.ToList();
                }
            }
        }

        public DownloadRecord InitDownload(DownloadRecord downloadRecord)
        {
            lock (JsonStore)
            {
                var dRecords = new BiggyList<DownloadRecord>(JsonStore);
                var dr = dRecords.FirstOrDefault(a => a.Url == downloadRecord.Url);
                if (dr == null)
                {
                    if (downloadRecord.DownloadItem == null)
                    {
                        downloadRecord.DownloadItem = new DownloadItem() {IsComplete = false};
                    }
                    dRecords.Add(downloadRecord);
                    dr = downloadRecord;
                }
                else
                {
                    dr.IsCancelled = downloadRecord.IsCancelled;

                }

                dr.Hash = GetHashString(downloadRecord.Url);

                var finalFolder = EnsurePath(dr.Hash);
                var fullPath = Path.Combine(finalFolder, dr.FileName);

                dr.FullPath = fullPath;

                dRecords.Update(dr);

                return dr;

            }
        }

        public void UpdateDownload(string url, DownloadItem downloadItem)
        {
            lock (JsonStore)
            {

                // This immediately load any existing artist documents from the json file:
                var dRecords = new BiggyList<DownloadRecord>(JsonStore);

                // This query never hits the disk - it uses LINQ directly in memory:
                var dr = dRecords.FirstOrDefault(a => a.Url == url);
                if (dr == null)
                {
                    //   throw new Exception(string.Format("Download record does not exit:[{0}]", url));
                    return;

                }
                dr.DownloadItem = downloadItem;
                dRecords.Update(dr);
            }
        }

        public void Remove(string url)
        {
            lock (JsonStore)
            {
                var dRecords = new BiggyList<DownloadRecord>(JsonStore);
                var item = dRecords.FirstOrDefault(x => x.Url == url);
                if (item != null)
                {
                    var path = Path.Combine(RootFolder, item.Hash);
                    var suggestedName = Path.Combine(path, item.FileName);
                    File.Delete(suggestedName);
                    Directory.Delete(path);
                    dRecords.Remove(item);
                }
            }
        }
        public void Cancel(string url)
        {
            lock (JsonStore)
            {
                var dRecords = new BiggyList<DownloadRecord>(JsonStore);
                var item = dRecords.FirstOrDefault(x => x.Url == url);
                if (item != null)
                {
                    item.IsCancelled = true;
                    dRecords.Update(item);
                }
            }
        }

        public LaunchResult LaunchExecutable(string url)
        {
            lock (JsonStore)
            {
                var dr = GetDownloadRecord(url);
                if (dr != null && dr.DownloadItem.IsComplete)
                {
                    Process process = new Process
                    {
                        StartInfo =
                        {
                            FileName = dr.DownloadItem.FullPath
                        }
                    };
                    var runResult = process.Start();
                    return new LaunchResult()
                    {
                        Ok = runResult
                    };
                }
                return new LaunchResult()
                {
                    Ok = false,
                    Message = "Doesn't exist"
                };

            }
        }

        public void PurgeIncompletes()
        {
            lock (JsonStore)
            {
                var updateList = new List<DownloadRecord>();
                var dRecords = new BiggyList<DownloadRecord>(JsonStore);
                foreach (var item in dRecords)
                {
                    if (item.DownloadItem.IsComplete)
                        continue;
                    if (item.DownloadItem.IsInProgress)
                    {
                        File.Delete(item.DownloadItem.FullPath);

                        item.DownloadItem = new DownloadItem() {IsComplete = false};
                        updateList.Add(item);;
                    }
                }
                foreach (var item in updateList)
                {
                    dRecords.Update(item);
                }
            }
        }

        public static byte[] GetHash(string inputString)
        {
            HashAlgorithm algorithm = MD5.Create();  //or use SHA256.Create();
            return algorithm.ComputeHash(Encoding.UTF8.GetBytes(inputString));
        }

        public static string GetHashString(string inputString)
        {
            StringBuilder sb = new StringBuilder();
            foreach (byte b in GetHash(inputString))
                sb.Append(b.ToString("X2"));

            return sb.ToString();
        }

        public void FireOnUpdate()
        {
            foreach (var sink in _sinks)
            {
                sink.OnUpdate();
            }
        }

        public DownloadRecord GetDownloadRecord(string url)
        {
            lock (JsonStore)
            {
                var dRecords = new BiggyList<DownloadRecord>(JsonStore);
                var item = dRecords.FirstOrDefault(x => x.Url == url);
                return item;
            }
        }
    }
}
