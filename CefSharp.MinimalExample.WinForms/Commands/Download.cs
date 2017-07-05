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
    [Command]
    internal class Download
    {
        private IDownloadRepository _downloadRepository;

        private IDownloadRepository DownloadRepository
        {
            get { return _downloadRepository ?? (_downloadRepository = new DownloadRepository()); }
        }

        [CommandAction]
        public List<DownloadRecord> Records()
        {
            var result =  DownloadRepository.Records;
            return result;
        }
    }
}
