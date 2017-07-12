using System;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using CefSharp.MinimalExample.WinForms.Commands;
using CEF.Custom;
using Synoptic;

namespace CefSharp.MinimalExample.WinForms.Commands
{
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
}
