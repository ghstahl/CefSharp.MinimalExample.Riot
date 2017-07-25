using CEF.Custom;
using Programs.Repository;
using Synoptic;
using LaunchResult = Programs.Repository.LaunchResult;

namespace CefSharp.MinimalExample.WinForms.Commands
{
    class PageQuery
    {
        public int Offset { get; set; }
        public int Count { get; set; }
    }

    class LaunchUrlQuery
    {
        public string Url { get; set; }
    }

    class IsInstalledQuery
    {
        public string DisplayName { get; set; }
    }

    class IsRunningQuery
    {
        public string ProcessName { get; set; }
    }

    [Command]
    internal class Programs
    {
        [CommandAction]
        public void PostLoad()
        {
            Global.ProgramsRepository.LoadInstall();
        }
        [CommandAction]
        public int GetCount()
        {
            var result = Global.ProgramsRepository.InstallCount;
            return result;
        }
        [CommandAction]
        public bool GetIsInstalled([CommandParameter(FromBody = true)]IsInstalledQuery body)
        {
            var result = Global.ProgramsRepository.IsInstalled(body.DisplayName);
            return result;
        }
        [CommandAction]
        public InstalledApp[] GetPage([CommandParameter(FromBody = true)]PageQuery body)
        {
            var result = Global.ProgramsRepository.PageInstalled(body.Offset,body.Count);
            return result;
        }
        [CommandAction]
        public LaunchUrlResult PostLaunchUrl([CommandParameter(FromBody = true)]LaunchUrlQuery body)
        {
            return Global.ProgramsRepository.LaunchUrl(body.Url);
        }
        [CommandAction]
        public LaunchResult PostLaunchSpecial([CommandParameter(FromBody = true)]LaunchSpecialQuery body)
        {
            return Global.ProgramsRepository.LaunchSpecial(body);
        }

    }
    [Command]
    internal class Processes
    {
        [CommandAction]
        public void PostLoad()
        {
            Global.ProgramsRepository.LoadProcesses();
        }
        [CommandAction]
        public int GetCount()
        {
            var result = Global.ProgramsRepository.ProcessCount;
            return result;
        }
        [CommandAction]
        public bool GetIsRunning([CommandParameter(FromBody = true)]IsRunningQuery body)
        {
            var result = Global.ProgramsRepository.IsRunning(body.ProcessName);
            return result;
        }
        [CommandAction]
        public ProcessApp[] GetPage([CommandParameter(FromBody = true)]PageQuery body)
        {
            var result = Global.ProgramsRepository.PageProcess(body.Offset, body.Count);
            return result;
        }
    }
}