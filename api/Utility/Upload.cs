using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Utility
{
    public class Upload
    {
        public static void Save(HttpPostedFileBase httpPostedFile, string directory ,string fileName=null)
        {
            if (httpPostedFile != null && httpPostedFile.ContentLength > 0)
            {
                // get a stream
                var stream = httpPostedFile.InputStream;
                if (string.IsNullOrEmpty(fileName))
                {
                    fileName = Path.GetFileName(httpPostedFile.FileName);
                }
                var path = Path.Combine(directory, fileName);
                using (var fileStream = File.Create(path))
                {
                    stream.CopyTo(fileStream);
                }
            }
        }
    }
}