using System;
using System.IO;
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
                    var folder = CEF.Custom.DownloadRepository.GetHashString(downloadItem.Url);
                    var finalFolder = DownloadRepository.EnsurePath(folder);
                    var suggestedName = Path.Combine(finalFolder, downloadItem.SuggestedFileName);

                    callback.Continue(suggestedName, showDialog: false);
                }
            }
        }

        public void OnDownloadUpdated(IBrowser browser, DownloadItem downloadItem, IDownloadItemCallback callback)
        {
            var handler = OnDownloadUpdatedFired;
            if (handler != null)
            {
                handler(this, downloadItem);
            }
        }
    }
}