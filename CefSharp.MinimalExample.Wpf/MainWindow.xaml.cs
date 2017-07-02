using System;
using System.Windows;
using System.Windows.Input;
using CefSharp.Custom;
using CefSharp.Wpf;

namespace CefSharp.MinimalExample.Wpf
{
    public partial class MainWindow : Window
    {
        public ICommand GoCommand { get; private set; }
        public MainWindow()
        {
            InitializeComponent();
            Browser.Address = "localfolder://cefsharp/dist/index.html";
            Browser.DownloadHandler = new DownloadHandler();
            Browser.RenderProcessMessageHandler = new RenderProcessMessageHandler();
            Browser.RegisterAsyncJsObject("boundAsync", new BoundObject.AsyncBoundObject()); //Standard object rego

            GoCommand = new RelayCommand(Go, () => !String.IsNullOrWhiteSpace(Address));
        }
    }
}
