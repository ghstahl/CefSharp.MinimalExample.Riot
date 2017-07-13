using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Programs.Repository;

namespace UnitTest.Programs.Repository
{
    [TestClass]
    public class UnitTestProgramsRepository
    {
        [TestMethod]
        public void Test_GetInstallRecords()
        {
            IProgramsRepository programsRepo = new ProgramsRepository();
            programsRepo.LoadInstall();
            var count = programsRepo.InstallCount;
            Assert.IsTrue(count > 1);

            var records = programsRepo.PageInstalled(0, count+10);
            Assert.IsNotNull(records);
            Assert.AreEqual(records.Length,count);
        }

        [TestMethod]
        public void Test_IsInstalled()
        {
            IProgramsRepository programsRepo = new ProgramsRepository();
            programsRepo.LoadInstall();
            var count = programsRepo.InstallCount;
            Assert.IsTrue(count > 1);
            var installed = programsRepo.IsInstalled("Norton Internet Security");
            Assert.IsTrue(installed);

        }
        [TestMethod]
        public void Test_GetProcesseRecords()
        {
            IProgramsRepository programsRepo = new ProgramsRepository();
            programsRepo.LoadProcesses();
            var count = programsRepo.ProcessCount;
            Assert.IsTrue(count > 1);

            var records = programsRepo.PageProcess(0, count + 10);
            Assert.IsNotNull(records);
            Assert.AreEqual(records.Length, count);

        }
        [TestMethod]
        public void Test_IsRunning()
        {
            IProgramsRepository programsRepo = new ProgramsRepository();
            programsRepo.LoadProcesses();
            var count = programsRepo.ProcessCount;
            Assert.IsTrue(count > 1);

            var running = programsRepo.IsRunning("nis");
            Assert.IsTrue(running);

        }
    }
}
