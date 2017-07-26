using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Web.UI.WebControls;
using LocalFetch;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using Synoptic;

namespace CefSharp.MinimalExample.WinForms
{
   

    public class ComplexData
    {
        public string SomeString { get; set; }
        public int SomeInt { get; set; }
    }
    public class Status
    {
        public bool Ok { get; set; }
        public Exception Exception { get; set; }
    }

    [Command]
    internal class MyCommand
    {
        [CommandAction]
        public ComplexData GetMyAction([CommandParameter(FromBody = true)]ComplexData body)
        {
            return new ComplexData()
            {
                SomeInt = 42,
                SomeString = "Hello"
            };
        }
    }



    public class BoundObject
    {
        public static string ResourceFolder { get; set; }
        public static string SchemeRoot { get; set; }
        public static string SchemeName { get; set; }
        public static string HostName { get; set; }
        public class AsyncBoundObject
        {
            public AsyncBoundObject()
            {

            }


            public void Error()
            {
                throw new Exception("This is an exception coming from C#");
            }

            //We expect an exception here, so tell VS to ignore

            public int Div(int divident, int divisor)
            {
                return divident / divisor;
            }

            public string Fetch(string url, string init)
            {
                return new BoundFetch().Fetch(url, init);
            }

            public string FetchLocalFolder(string url)
            {
                if (BoundObject.SchemeName != null )
                {
                    return null;
                }

                var uri = new Uri(url);

                if (BoundObject.HostName != null && !uri.Host.Equals(BoundObject.HostName, StringComparison.OrdinalIgnoreCase))
                {
                    return null;
                }

                //Get the absolute path and remove the leading slash
                var absolutePath = uri.AbsolutePath.Substring(1);

                if (string.IsNullOrEmpty(absolutePath))
                {
                    return null;
                }
                var filePath = Path.GetFullPath(Path.Combine(BoundObject.ResourceFolder, absolutePath));
                //Check the file requested is within the specified path and that the file exists
                if (filePath.StartsWith(BoundObject.ResourceFolder, StringComparison.OrdinalIgnoreCase) && File.Exists(filePath))
                {
                    var fileStream = File.OpenRead(filePath);
                    string contents;
                    using (var sr = new StreamReader(fileStream))
                    {
                        contents = sr.ReadToEnd();
                    }
                    return contents;
                }
                return null;
            }
        }
    }
}