using System;
using System.Collections.Generic;
using LocalFetch;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using Programs.Repository;
using ProgramsCommand;

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
            var result = programsRepo.IsInstalled("Norton Internet Security");
            Assert.IsTrue(result.IsInstalled);

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

        [TestMethod]
        public void Test_LocalFetch_is_installed_success()
        {
            var url = "local://programs/is-installed";
            var fetchInit = new FetchInit() { Headers = new Dictionary<string, string>(), Method = "GET" };
            var camelSettings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
            var json = JsonConvert.SerializeObject(
                new IsInstalledQuery() { DisplayName = "Norton Internet Security"},
                camelSettings);
            fetchInit.Body = JObject.Parse(json);
            var jsonFetchInit = JsonConvert.SerializeObject(fetchInit, camelSettings);

            var programsRepository = new ProgramsRepository();
            ProgramsCommand.Programs.ProgramsRepository = programsRepository;
            ProgramsCommand.Processes.ProgramsRepository = programsRepository;

            var response = new BoundFetch().Fetch(url, jsonFetchInit);
            dynamic isInstalledResponse = JObject.Parse(response);
            bool b = isInstalledResponse.json.isInstalled;
            Assert.IsTrue(b);
        }
    }
}
