using CEF.Custom;

namespace CefSharp.MinimalExample.WinForms
{
    public static class Global
    {
        public static IBrowser Browser { get; set; }
        public static IDownloadRepository DownloadRepository { get; set; }
    }
}