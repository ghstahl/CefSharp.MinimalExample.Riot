using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Win32;

namespace Programs.Repository
{
    public class ProgramsRepository : IProgramsRepository
    {
        public static object Lock = new object();
        private List<InstalledApp> _records { get; set; }
        private Process[] _processlist { get; set; }

        public void LoadInstall(bool soft = false)
        {
            GetInstalledApps(soft);
        }

        public InstalledApp[] PageInstalled(int offset, int count)
        {
            LoadInstall(true);

            var newArray = _records.Skip(offset).Take(count).ToArray();
            return newArray;
        }

        public int InstallCount
        {
            get
            {
                LoadInstall(true);
                return _records.Count;
            }
        }
        public int ProcessCount
        {
            get
            {
                LoadProcesses(true);
                return _processlist.Length;
            }
        }
        public bool IsInstalled(string displayName)
        {
            LoadInstall();
            var query = from item in _records
                where item.DisplayName == displayName
                select item;
            var any = query.Any();
            return any;

        }

        public void LoadProcesses(bool soft)
        {
            lock (Lock)
            {
                if (soft && _processlist != null)
                    return;

                _processlist = Process.GetProcesses();
            }
        }

        public ProcessApp[] PageProcess(int offset, int count)
        {
            LoadProcesses(true);
            var newArray = _processlist.Skip(offset).Take(count).ToArray();
            var query = from item in newArray
                        let s = new ProcessApp(item)
                select s;
            return query.ToArray();
        }

        public bool IsRunning(string processName)
        {
            LoadProcesses(false);
            var query = from item in _processlist
                        where item.ProcessName == processName
                        select item;
            var any = query.Any();
            return any;
        }

        public void GetInstalledApps(bool soft = false)
        {
            lock (Lock)
            {
                if (soft && _records != null)
                {
                    return;
                }
                string[] keys = new string[]
                {
                    @"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall",
                    @"SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall"
                };

                _records = new List<InstalledApp>();
                foreach (var uninstallKey in keys)
                {
                    using (RegistryKey rk = Registry.LocalMachine.OpenSubKey(uninstallKey))
                    {
                        var subkeys = rk.GetSubKeyNames();
                        var dd = (from name in subkeys
                            let app = new InstalledApp(rk, name)
                            where (app.UnInstallPath != null && app.DisplayName != null)
                            select app).ToList();
                        _records.AddRange(dd);
                    }
                }
            }
        }


    }
}


