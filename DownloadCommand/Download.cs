using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CEF.Custom;
using Synoptic;

namespace DownloadCommand
{
    [Command]
    public class Download
    {
        public static IDownloadRepository DownloadRepository { get; set; }
        [CommandAction]
        public DownloadRecord[] GetRecords()
        {
            var result = DownloadRepository.Records;
            return result.ToArray();
            //    var dynamic = new ItemsContainer<DownloadRecord>(result).ToDynamic();
            //    return dynamic;
        }

        [CommandAction]
        public void PostInitDownload([CommandParameter(FromBody = true)]DownloadRecord body)
        {
            DownloadRepository.InitDownload(body);
        }

        [CommandAction]
        public void PostCancel([CommandParameter(FromBody = true)]DownloadRecord body)
        {
            DownloadRepository.Cancel(body.Url);
        }
        [CommandAction]
        public void PostRemove([CommandParameter(FromBody = true)]DownloadRecord body)
        {
            DownloadRepository.Remove(body.Url);
        }
        [CommandAction]
        public LaunchResult PostLaunchExecutable([CommandParameter(FromBody = true)]DownloadRecord body)
        {
            return DownloadRepository.LaunchExecutable(body.Url);
        }
    }
}
