using CefSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using CefSharp.MinimalExample.WinForms.Properties;
using CefSharp.SchemeHandler;

namespace CefSharp.MinimalExample.WinForms
{
    public class CefSharpSchemeHandlerFactory : ISchemeHandlerFactory
    {
        public const string SchemeName = "custom";
        private ISchemeHandlerFactory FolderSchemeHandlerFactory { get; set; }
        public CefSharpSchemeHandlerFactory(string rootFolder, string schemeName = null, string hostName = null, string defaultPage = "index.html")
        {
            FolderSchemeHandlerFactory = new FolderSchemeHandlerFactory(rootFolder, schemeName, hostName, defaultPage);
        }

        public IResourceHandler Create(IBrowser browser, IFrame frame, string schemeName, IRequest request)
        {
            return FolderSchemeHandlerFactory.Create(browser, frame, schemeName, request);
        }
    }
}
