using System.Collections.Generic;

namespace LocalFetch
{
    public class FetchResponse
    {
        public bool Ok { get; set; }
        public Dictionary<string, string> Headers { get; set; }
        public int Status { get; set; }
        public string StatusText { get; set; }
        public dynamic Json { get; set; }
        public string Type { get; set; }
        public string Url { get; set; }
        public bool UseFinalURL { get; set; }
    }
}