using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CEF.Custom
{
    public class DownloadRecord
    {
        public string Url { get; set; }
        public string Hash { get; set; }
        public string FileName { get; set; }
        public int PercentComplete { get; set; }
        public bool IsComplete { get; set; }
    }
    public interface IDownloadRepository
    {
        string RootFolder { get;  }
        string EnsurePath(string subPath);
        string InitDownload(DownloadRecord dr);
        void UpdateDownload(string url, int percentComplete, bool isComplete);
    }
}
