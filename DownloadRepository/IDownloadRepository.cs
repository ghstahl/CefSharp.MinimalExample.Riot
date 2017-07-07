using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CefSharp;

namespace CEF.Custom
{
    public interface IDownloadEventSink
    {
       void OnUpdate();
    }

    public interface IDownloadEventSource
    {
        void RegisterSink(IDownloadEventSink sink);
        void UnregisterSink(IDownloadEventSink sink);
        void FireOnUpdate();
    }

    public class DownloadRecord
    {
        public DownloadItem DownloadItem { get; set; }
        public string Url { get; set; }
        public string Hash { get; set; }
        public string FileName { get; set; }
        public string FullPath { get; set; }
        public int PercentComplete { get; set; }
        public bool IsComplete { get; set; }
        public bool IsCancelled { get; set; }
    }
    public interface IDownloadRepository: IDownloadEventSource
    {
        string RootFolder { get;  }
        string EnsurePath(string subPath);
        List<DownloadRecord> Records { get; }
        DownloadRecord GetDownloadRecord(string url);
        DownloadRecord InitDownload(DownloadRecord dr);
        void UpdateDownload(string url, int percentComplete, bool isComplete);
        void Remove(string url);
        void Cancel(string url);
        
    }
}
