// Copyright © 2010-2015 The CefSharp Authors. All rights reserved.
//
// Use of this source code is governed by a BSD-style license that can be found in the LICENSE file.

using System;
using System.IO;
using System.Windows.Forms;
using CEF.Custom;

namespace CefSharp.MinimalExample.WinForms
{
    class MyDownloadEventSink : IDownloadEventSink
    {
        public void OnUpdate()
        {
            const string script = "if(windows.bridgeEvent){ windows.bridgeEvent('hi'); }";
            Global.Browser.MainFrame.ExecuteJavaScriptAsync(script);  
        }
    }
    public class Program
    {
        [STAThread]
        public static void Main()
        {
            //For Windows 7 and above, best to include relevant app.manifest entries as well
            Cef.EnableHighDPISupport();

            var settings = new CefSettings()
            {
                //By default CefSharp will use an in-memory cache, you need to specify a Cache Folder to persist data
                CachePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "CefSharp\\Cache")
            };

            DownloadRepository.GlobalRootFolder =
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                    "CefSharp\\Download");
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
            Global.DownloadRepository = new DownloadRepository();
            var browser = new BrowserForm();
            Global.DownloadRepository.RegisterSink(new MyDownloadEventSink());

            Application.Run(browser);
        }
    }
}
