# Local fetch APIs

The winform example exposes a single boundObject entry point.  Fetch

```
 public string Fetch(string url, string init)
```

This is to approximate the browser provided [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

Accessing this bound object in javascript is done in the following riotjs example;
```
_onLocalFetch(input, body, ack) {
    console.log(Constants.WELLKNOWN_EVENTS.in.fetch, '_onLocalFetch', input, ack, window.boundAsync);
    if (window.boundAsync) {
      let result = { response: {}};

      let bodyInput = JSON.stringify(body);

      window.boundAsync.fetch(input, bodyInput).then(function (response) {
        console.log(response);
        let jsonResponse = JSON.parse(response);

        result.response = jsonResponse;
        result.json = jsonResponse.json;

        result.error = null;
        if (ack) {
          riot.control.trigger(ack.evt, result, ack);
        }
      });
    }
  }
```

# Exposed Apis

The following is an axample of data that is passed to the api
api convention is as follows.

local://dash-separated-command/dash-separated-action
maps to C# command classes that looks like the following;
```
[Command]
class DashSeparatedCommand 
{
  [CommandAction]
  public void PostDashSeparatedAction([CommandParameter(FromBody = true)]SomeData body)
  {
     
  }
  [CommandAction]
  public void PutDashSeparatedAction([CommandParameter(FromBody = true)]SomeData body)
  {
     
  }
  [CommandAction]
  public void GetDashSeparatedAction([CommandParameter(FromBody = true)]SomeQuery body)
  {
     
  }
  [CommandAction]
  public void DeleteDashSeparatedAction([CommandParameter(FromBody = true)]SomeData body)
  {
     
  }
  [CommandAction]
  public void HeadDashSeparatedAction([CommandParameter(FromBody = true)]SomeData body)
  {
     
  }
}
```

```
 self.onCancel = (evt) => {
      let url = 'local://download/cancel';
      riot.control.trigger(riot.EVT.fetchStore.in.fetch, url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Symc-Fetch-App-Version': '1.0'
      },
      body: {url:evt.item.url}
    }, null);
  };
  
```
The C# implementation to handle this request is as follows;  
Calls are made by convention, a request to cancel, with the method:'POST', results in a call to PostCancel.
HEAD,GET,POST,PUT,DELETE are supported.

Note that the body gets serialized into a DownloadRecord object.

```
  public class DownloadRecord
  {
      public DownloadItem DownloadItem { get; set; }
      public string Url { get; set; }
      public string Hash { get; set; }
      public string FileName { get; set; }
      public string FullPath { get; set; }
      public bool IsCancelled { get; set; }
  }
  
  [Command]
  internal class Download
  {
      [CommandAction]
      public DownloadRecord[] GetRecords()
      {
          var result =  Global.DownloadRepository.Records;
          return result.ToArray();
      //    var dynamic = new ItemsContainer<DownloadRecord>(result).ToDynamic();
      //    return dynamic;
      }

      [CommandAction]
      public void PostInitDownload([CommandParameter(FromBody = true)]DownloadRecord body)
      {
          Global.DownloadRepository.InitDownload(body);
      }

      [CommandAction]
      public void PostCancel([CommandParameter(FromBody = true)]DownloadRecord body)
      {
          Global.DownloadRepository.Cancel(body.Url);
      }
      [CommandAction]
      public void PostRemove([CommandParameter(FromBody = true)]DownloadRecord body)
      {
          Global.DownloadRepository.Remove(body.Url);
      }
      [CommandAction]
      public LaunchResult PostLaunchExecutable([CommandParameter(FromBody = true)]DownloadRecord body)
      {
          return Global.DownloadRepository.LaunchExecutable(body.Url);
      }
  }
  
  class PageQuery
    {
        public int Offset { get; set; }
        public int Count { get; set; }
    }
    class IsInstalledQuery
    {
        public string DisplayName { get; set; }
    }
    class IsRunningQuery
    {
        public string ProcessName { get; set; }
    }
    [Command]
    internal class Programs
    {
        [CommandAction]
        public void PostLoad()
        {
            Global.ProgramsRepository.LoadInstall();
        }
        [CommandAction]
        public int GetCount()
        {
            var result = Global.ProgramsRepository.InstallCount;
            return result;
        }
        [CommandAction]
        public bool GetIsInstalled([CommandParameter(FromBody = true)]IsInstalledQuery body)
        {
            var result = Global.ProgramsRepository.IsInstalled(body.DisplayName);
            return result;
        }
        [CommandAction]
        public InstalledApp[] GetPage([CommandParameter(FromBody = true)]PageQuery body)
        {
            var result = Global.ProgramsRepository.PageInstalled(body.Offset,body.Count);
            return result;
        }
    }
    [Command]
    internal class Processes
    {
        [CommandAction]
        public void PostLoad()
        {
            Global.ProgramsRepository.LoadProcesses();
        }
        [CommandAction]
        public int GetCount()
        {
            var result = Global.ProgramsRepository.ProcessCount;
            return result;
        }
        [CommandAction]
        public bool GetIsRunning([CommandParameter(FromBody = true)]IsRunningQuery body)
        {
            var result = Global.ProgramsRepository.IsRunning(body.ProcessName);
            return result;
        }
        [CommandAction]
        public ProcessApp[] GetPage([CommandParameter(FromBody = true)]PageQuery body)
        {
            var result = Global.ProgramsRepository.PageProcess(body.Offset, body.Count);
            return result;
        }
    }
```
