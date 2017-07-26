using Command.Common;
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
        public PrimitiveValue<int> GetCount()
        {
            var result = ProgramsRepository.ProcessCount;
            return new PrimitiveValue<int>(result);
        }
        [CommandAction]
        public PrimitiveValue<bool> GetIsRunning([CommandParameter(FromBody = true)]IsRunningQuery body)
        {
            var result = ProgramsRepository.IsRunning(body.ProcessName);
            return new PrimitiveValue<bool>(result);
        }
        [CommandAction]
        public ProcessApp[] GetPage([CommandParameter(FromBody = true)]PageQuery body)
        {
            var result = ProgramsRepository.PageProcess(body.Offset, body.Count);
            return result;
        }
    }
}