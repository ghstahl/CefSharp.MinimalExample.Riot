using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using Synoptic;

namespace CefSharp.MinimalExample.WinForms
{
    public class FetchInit
    {
        public string Method { get; set; }
        public Dictionary<string, string> Headers { get; set; }
        public dynamic Body { get; set; }
    }

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
    public class FetchResponse
    {
        public bool Ok { get; set; }
        public Dictionary<string, string> Headers { get; set; }
        public int Status { get; set; }
        public string StatusText { get; set; }
        public dynamic Json { get; set; }
        public string Type { get; set; }
        public string Url { get; set; }
        public bool UseFinalURL { get; set; }
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

            public void writeAsyncResult(string call, string end)
            {
            }

            public string Fetch(string url, string init)
            {
                var camelSettings = new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                };

                var fetchInit = JsonConvert.DeserializeObject<FetchInit>(init);
                var body = fetchInit.Body;
                var jsonBody = JsonConvert.SerializeObject((object)body, camelSettings);

                var preAction = "";

                switch (fetchInit.Method)
                {
                    case "HEAD":
                        preAction = "head-";
                        break;
                    case "GET":
                        preAction = "get-";
                        break;
                    case "PUT":
                        preAction = "put-";
                        break;
                    case "POST":
                        preAction = "post-";
                        break;
                    case "DELETE":
                        preAction = "delete-";
                        break;

                }
                if (string.IsNullOrEmpty(preAction))
                {
                    throw new Exception($"Init.Method:[{fetchInit.Method}] is wrong");
                }
                var uri = new Uri(url);
                var actionName = preAction + uri.AbsolutePath.Substring(1);
                var commandName = uri.Host;
                var fetchResponse = new FetchResponse()
                {
                    Ok = false,
                    Status = 404,
                    Url = url,
                    UseFinalURL = true,
                    StatusText = "404",
                    Type = "basic",
                    Headers = fetchInit.Headers,
                    Json = null
                };
                string json = "";
                try
                {
                    var runResult = new CommandRunner().Run(new[]
                    {
                        commandName,
                        actionName,
                        string.Format(@"--body={0}", jsonBody)
                    });
                    if (runResult.Json != null)
                    {
                        runResult.Json = runResult.Json.Trim();
                        if (runResult.Json.StartsWith("["))
                        {
                            fetchResponse.Json = JArray.Parse(runResult.Json);
                        }
                        else
                        {
                            fetchResponse.Json = JObject.Parse(runResult.Json);
                        }

                        
                    }
                    fetchResponse.Ok = true;
                    fetchResponse.Status = 200;
                    fetchResponse.StatusText = "OK";
                   
                }
                catch (Exception e)
                {
                    fetchResponse.Json = null;
                    fetchResponse.Ok = false;
                    fetchResponse.Status = 404;
                    fetchResponse.StatusText= e.Message;
                }
                json = JsonConvert.SerializeObject(fetchResponse, camelSettings);

                return json;
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