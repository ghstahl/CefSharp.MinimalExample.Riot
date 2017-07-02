using System;
using System.IO;
using System.Windows;
using CefSharp.Custom;

namespace CefSharp.MinimalExample.Wpf
{
    public partial class App : Application
    {
        public App()
        {
            var settings = new CefSettings()
            {
                //By default CefSharp will use an in-memory cache, you need to specify a Cache Folder to persist data
                CachePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "CefSharp\\Cache")
            };
            settings.RegisterScheme(new CefCustomScheme
            {
                SchemeName = "localfolder",
                DomainName = "cefsharp",
                SchemeHandlerFactory = new CefSharpSchemeHandlerFactory(rootFolder: @".\Resources",
                    hostName: "cefsharp", //Optional param no hostname/domain checking if null
                    defaultPage: "home.html") //Optional param will default to index.html
            });

            BoundObject.ResourceFolder = Path.GetFullPath(@".\Resources");
            BoundObject.SchemeRoot = "localfolder://cefsharp";

            //Perform dependency check to make sure all relevant resources are in our output directory.
            Cef.Initialize(settings, performDependencyCheck: true, browserProcessHandler: null);
        }
    }
}
