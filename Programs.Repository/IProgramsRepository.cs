using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Programs.Repository
{
    public interface IProgramsRepository
    {
        void Load();
        InstalledApp[] Page(int offset, int count);
        int Count { get; }
        bool IsInstalled(string displayName);
    }
}
