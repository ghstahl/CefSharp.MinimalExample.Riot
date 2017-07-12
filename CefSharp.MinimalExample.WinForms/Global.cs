using CEF.Custom;
using Programs.Repository;

namespace CefSharp.MinimalExample.WinForms
{
    public static class Global
    {
        public static IWebBrowser WebBrowser { get; set; }
        public static IDownloadRepository DownloadRepository { get; set; }
        public static IProgramsRepository ProgramsRepository { get; set; }
    }
}