using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CEF.Custom
{
    public interface IDownloadRepository
    {
        string RootFolder { get;  }
        string EnsurePath(string subPath);
    }
}
