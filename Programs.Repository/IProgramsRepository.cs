using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Programs.Repository
{
    public class LaunchUrlResult
    {
        public bool Ok { get; set; }
        public string Message { get; set; }
    }
    public class LaunchResult
    {
        public bool Ok { get; set; }
        public string Message { get; set; }
    }
    public class IsInstalledResult
    {
        public bool IsInstalled { get; set; }
    }
    public interface IProgramsRepository
    {
        void LoadInstall(bool soft = false);
        void LoadProcesses(bool soft = false);
        InstalledApp[] PageInstalled(int offset, int count);
        int InstallCount { get; }
        bool IsInstalled(string displayName);
        int ProcessCount { get; }
        LaunchUrlResult LaunchUrl(string url);
        ProcessApp[] PageProcess(int offset, int count);
        bool IsRunning(string processName);
        LaunchResult LaunchSpecial(LaunchSpecialQuery query);
    }
}


