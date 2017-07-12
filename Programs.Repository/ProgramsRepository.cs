using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Win32;

namespace Programs.Repository
{
    public class ProgramsRepository : IProgramsRepository
    {
        private List<InstalledApp> _records { get; set; }

        public void Load()
        {
            GetInstalledApps();
        }
        void SoftLoad()
        {
            if (_records == null)
            {
                Load();
            }
        }
        public InstalledApp[] Page(int offset, int count)
        {
            if (_records == null)
            {
                Load();
            }
            var newArray = _records.Skip(offset).Take(count).ToArray();
            return newArray;
        }

        public int Count
        {
            get
            {
                SoftLoad();
                return _records.Count;
            }
        }

        public bool IsInstalled(string displayName)
        {
            Load();
            var query = from item in _records
                where item.DisplayName == displayName
                select item;
            var any = query.Any();
            return any;

        }

        public void GetInstalledApps()
        {
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


