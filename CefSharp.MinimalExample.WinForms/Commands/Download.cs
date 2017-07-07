using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using CEF.Custom;
using Synoptic;

namespace CefSharp.MinimalExample.WinForms.Commands
{
    class RecordContainer
    {
        public List<DownloadRecord> Records { get; set; }
    }

    [Command]
    internal class Download
    {



        [CommandAction]
        public dynamic Records()
        {
            var result =  Global.DownloadRepository.Records;
            var dynamic = new RecordContainer {Records = result}.ToDynamic();
            return dynamic;
        }
        [CommandAction]
        public void InitDownload([CommandParameter(FromBody = true)]DownloadRecord paramOne)
        {
            Global.DownloadRepository.InitDownload(paramOne);
        }
    }
}
