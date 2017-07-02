using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Biggy.Core;
using Biggy.Data.Json;

namespace CEF.Custom
{




    public class DownloadRepository : IDownloadRepository
    {
        private JsonStore<DownloadRecord> JsonStore { get; set; }

        public static string GlobalRootFolder { get; set; }
        public string RootFolder { get { return GlobalRootFolder; } }

        public DownloadRepository()
        {
            var dbPath = EnsurePath(".DB");
            JsonStore = new JsonStore<DownloadRecord>(dbPath);
        }
        public string EnsurePath(string subPath)
        {
            var path = Path.Combine(RootFolder, subPath);
            Directory.CreateDirectory(path);
            return path;

        }

        public string InitDownload(DownloadRecord downloadRecord)
        {
            var dRecords = new BiggyList<DownloadRecord>(JsonStore);
            var dr = dRecords.FirstOrDefault(a => a.Url == downloadRecord.Url);
            if (dr != null)
            {
                dr.IsComplete = downloadRecord.IsComplete;
                dr.FileName = downloadRecord.FileName;
                dr.Hash = downloadRecord.Hash;
                dr.PercentComplete = downloadRecord.PercentComplete;
                dRecords.Update(dr);
            }
            else
            {
                dRecords.Add(downloadRecord);
            }
            var finalFolder = EnsurePath(downloadRecord.Hash);
            var suggestedName = Path.Combine(finalFolder, downloadRecord.FileName);

            return suggestedName;
        }

        public void UpdateDownload(string url, int percentComplete, bool isComplete)
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
            dr.IsComplete = isComplete;
            dr.PercentComplete = percentComplete;
            dRecords.Update(dr);
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


    }
}
