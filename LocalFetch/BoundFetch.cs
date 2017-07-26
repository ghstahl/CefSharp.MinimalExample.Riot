using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using Synoptic;

namespace LocalFetch
{
    public class BoundFetch
    {
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
                    else if (runResult.Json.StartsWith("{"))
                    {
                        fetchResponse.Json = JObject.Parse(runResult.Json);
                    }
                    else
                    {
                        fetchResponse.Json = runResult.Json;
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
                fetchResponse.StatusText = e.Message;
            }
            json = JsonConvert.SerializeObject(fetchResponse, camelSettings);

            return json;
        }
    }
}
