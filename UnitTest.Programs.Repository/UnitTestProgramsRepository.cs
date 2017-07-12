using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Programs.Repository;

namespace UnitTest.Programs.Repository
{
    [TestClass]
    public class UnitTestProgramsRepository
    {
        [TestMethod]
        public void Test_GetRecords()
        {
            IProgramsRepository programsRepo = new ProgramsRepository();
            programsRepo.Load();
            var count = programsRepo.Count;
            Assert.IsTrue(count > 1);

            var records = programsRepo.Page(0, count+10);
            Assert.IsNotNull(records);
            Assert.AreEqual(records.Length,count);
        }

        [TestMethod]
        public void Test_IsInstalled()
        {
            IProgramsRepository programsRepo = new ProgramsRepository();
            programsRepo.Load();
            var count = programsRepo.Count;
            Assert.IsTrue(count > 1);
            var installed = programsRepo.IsInstalled("Norton Internet Security");
            Assert.IsTrue(installed);

        }
    }
}
