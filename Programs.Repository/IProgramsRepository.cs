using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Programs.Repository
{
    public interface IProgramsRepository
    {
        void LoadInstall(bool soft = false);
        void LoadProcesses(bool soft = false);
        InstalledApp[] PageInstalled(int offset, int count);
        int InstallCount { get; }
        bool IsInstalled(string displayName);
        int ProcessCount { get; }

        ProcessApp[] PageProcess(int offset, int count);
        bool IsRunning(string processName);
    }
}


