using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Dynamic;
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

    public static class DynamicExtensions
    {
        public static dynamic ToDynamic(this object value)
        {
            IDictionary<string, object> expando = new ExpandoObject();

            foreach (PropertyDescriptor property in TypeDescriptor.GetProperties(value.GetType()))
                expando.Add(property.Name, property.GetValue(value));

            return expando as ExpandoObject;
        }
    }

    [Command]
    internal class Download
    {

        private IDownloadRepository _downloadRepository;

        private IDownloadRepository DownloadRepository
        {
            get { return _downloadRepository ?? (_downloadRepository = new DownloadRepository()); }
        }

        [CommandAction]
        public dynamic Records()
        {
            var result =  DownloadRepository.Records;
            var dynamic = new RecordContainer {Records = result}.ToDynamic();
            return dynamic;
        }
        [CommandAction]
        public void InitDownload([CommandParameter(FromBody = true)]DownloadRecord paramOne)
        {
            DownloadRepository.InitDownload(paramOne);
        }
    }
}
