using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CEF.Custom
{
    public class DownloadRepository : IDownloadRepository
    {
        public static string GlobalRootFolder { get; set; }
        public string RootFolder { get { return GlobalRootFolder; } }

        public string EnsurePath(string subPath)
        {
            var path = Path.Combine(RootFolder, subPath);
            Directory.CreateDirectory(path);
            return path;

        }

        public static byte[] GetHash(string inputString)
        {
            HashAlgorithm algorithm = MD5.Create();  //or use SHA256.Create();
            return algorithm.ComputeHash(Encoding.UTF8.GetBytes(inputString));
        }

        public static string GetHashString(string inputString)
        {
            StringBuilder sb = new StringBuilder();
            foreach (byte b in GetHash(inputString))
                sb.Append(b.ToString("X2"));

            return sb.ToString();
        }


    }
}
