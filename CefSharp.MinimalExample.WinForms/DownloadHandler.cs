using System;
using System.Collections.Specialized;
using System.IO;
using System.Web;
using CEF.Custom;


namespace CefSharp.MinimalExample.WinForms
{
    public class DownloadHandler : IDownloadHandler
    {
        public DownloadHandler()
        {
            DownloadRepository = new DownloadRepository();
        }
        private IDownloadRepository DownloadRepository { get; set; }
        public event EventHandler<DownloadItem> OnBeforeDownloadFired;

        public event EventHandler<DownloadItem> OnDownloadUpdatedFired;

        public void OnBeforeDownload(IBrowser browser, DownloadItem downloadItem, IBeforeDownloadCallback callback)
        {
            var handler = OnBeforeDownloadFired;
            if (handler != null)
            {
                handler(this, downloadItem);
            }

            if (!callback.IsDisposed)
            {
                using (callback)
                {
                    Uri originalUri = new Uri(downloadItem.OriginalUrl);

                    // Parse the query string variables into a NameValueCollection.
                    NameValueCollection qscoll = HttpUtility.ParseQueryString(originalUri.Query);
                    var dr = new DownloadRecord()
                    {
                        IsComplete = false,
                        FileName = downloadItem.SuggestedFileName,
                        Hash = CEF.Custom.DownloadRepository.GetHashString(downloadItem.Url),
                        PercentComplete = 0,
                        Url = downloadItem.Url
                    };

                    var suggestedPath = DownloadRepository.InitDownload(dr);
                    callback.Continue(suggestedPath, showDialog: false);
                }
            }
        }

        public void OnDownloadUpdated(IBrowser browser, DownloadItem downloadItem, IDownloadItemCallback callback)
        {
            DownloadRepository.UpdateDownload(downloadItem.Url,downloadItem.PercentComplete,downloadItem.IsComplete);
            var handler = OnDownloadUpdatedFired;
            if (handler != null)
            {
                handler(this, downloadItem);
            }
        }
    }
}