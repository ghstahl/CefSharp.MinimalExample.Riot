using Programs.Repository;
using Synoptic;

namespace ProgramsCommand
{
    [Command]
    public class Processes
    {
        public static IProgramsRepository ProgramsRepository { get; set; }
        [CommandAction]
        public void PostLoad()
        {
            ProgramsRepository.LoadProcesses(false);
        }
        [CommandAction]
        public int GetCount()
        {
            var result = ProgramsRepository.ProcessCount;
            return result;
        }
        [CommandAction]
        public bool GetIsRunning([CommandParameter(FromBody = true)]IsRunningQuery body)
        {
            var result = ProgramsRepository.IsRunning(body.ProcessName);
            return result;
        }
        [CommandAction]
        public ProcessApp[] GetPage([CommandParameter(FromBody = true)]PageQuery body)
        {
            var result = ProgramsRepository.PageProcess(body.Offset, body.Count);
            return result;
        }
    }
}