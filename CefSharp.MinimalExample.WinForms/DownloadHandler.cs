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

        }

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

                        FileName = downloadItem.SuggestedFileName,

                        Url = downloadItem.Url,
                        IsCancelled = false
                    };

                    var fDr = Global.DownloadRepository.InitDownload(dr);
                    Global.DownloadRepository.UpdateDownload(downloadItem.Url, downloadItem);
                    callback.Continue(fDr.FullPath, showDialog: false);
                }
            }
        }

        public void OnDownloadUpdated(IBrowser browser, DownloadItem downloadItem, IDownloadItemCallback callback)
        {
            var dr = Global.DownloadRepository.GetDownloadRecord(downloadItem.Url);
            if (dr.DownloadItem.Id != downloadItem.Id)
            {
                // this missmatch seems to happen when I cancelled this download in a previous step.
                // ignor it.
                return;
            }
            Global.DownloadRepository.UpdateDownload(downloadItem.Url, downloadItem);

            if (downloadItem.PercentComplete != 100 && dr.IsCancelled && downloadItem.IsInProgress)
            {
                callback.Cancel();
            }
            var handler = OnDownloadUpdatedFired;
            if (handler != null)
            {
                handler(this, downloadItem);
            }
        }
    }
}