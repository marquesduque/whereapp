using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace Utility
{
    public class Validation
    {
        public static bool VerifyAccent(string value)
        {
            return Regex.Match(value, "[áàâãªÁÀÂÃéèêëÉÈÊËíìîÍÌÎóòôõºÓÒÔÕúùûÚÙÛÜçÇ]").Success;
        }
    }
}