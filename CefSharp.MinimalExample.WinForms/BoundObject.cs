using System;
using System.Diagnostics;
using System.IO;

namespace CefSharp.MinimalExample.WinForms
{
    public class BoundObject
    {
        public static string ResourceFolder { get; set; }
        public static string SchemeRoot { get; set; }
        public static string SchemeName { get; set; }
        public static string HostName { get; set; }
        public class AsyncBoundObject
        {

            //We expect an exception here, so tell VS to ignore
      
            public void Error()
            {
                throw new Exception("This is an exception coming from C#");
            }

            //We expect an exception here, so tell VS to ignore
           
            public int Div(int divident, int divisor)
            {
                return divident / divisor;
            }

            public void writeAsyncResult(string call, string end)
            {
            }

            public string FetchLocal(string url)
            {
                if (string.IsNullOrEmpty(url))
                {
                    return null;
                }
                var filePath = Path.GetFullPath(Path.Combine(BoundObject.ResourceFolder, url));
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