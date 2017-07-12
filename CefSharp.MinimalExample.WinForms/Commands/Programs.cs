using CEF.Custom;
using Programs.Repository;
using Synoptic;

namespace CefSharp.MinimalExample.WinForms.Commands
{
    class PageQuery
    {
        public int Offset { get; set; }
        public int Count { get; set; }
    }
    class IsInstalledQuery
    {
        public string DisplayName { get; set; }
       
    }
    [Command]
    internal class Programs
    {
        [CommandAction]
        public void PostLoad()
        {
            Global.ProgramsRepository.Load();
        }
        [CommandAction]
        public int GetCount()
        {
            var result = Global.ProgramsRepository.Count;
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
            var result = Global.ProgramsRepository.Page(body.Offset,body.Count);
            return result;
        }

    }
}