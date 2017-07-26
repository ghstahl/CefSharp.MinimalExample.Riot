﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Programs.Repository;
using Synoptic;

namespace ProgramsCommand
{
    [Command]
    public class Programs
    {
        public static IProgramsRepository ProgramsRepository { get; set; }
        [CommandAction]
        public void PostLoad()
        {
            ProgramsRepository.LoadInstall();
        }
        [CommandAction]
        public int GetCount()
        {
            var result = ProgramsRepository.InstallCount;
            return result;
        }
        [CommandAction]
        public IsInstalledResult GetIsInstalled([CommandParameter(FromBody = true)]IsInstalledQuery body)
        {
            var result = ProgramsRepository.IsInstalled(body.DisplayName);
            return result;
        }
        [CommandAction]
        public InstalledApp[] GetPage([CommandParameter(FromBody = true)]PageQuery body)
        {
            var result = ProgramsRepository.PageInstalled(body.Offset, body.Count);
            return result;
        }
        [CommandAction]
        public LaunchUrlResult PostLaunchUrl([CommandParameter(FromBody = true)]LaunchUrlQuery body)
        {
            return ProgramsRepository.LaunchUrl(body.Url);
        }
        [CommandAction]
        public LaunchResult PostLaunchSpecial([CommandParameter(FromBody = true)]LaunchSpecialQuery body)
        {
            return ProgramsRepository.LaunchSpecial(body);
        }

    }
}
