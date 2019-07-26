using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;

namespace Utility
{
    public class Generate
    {
        public static void Autorize()
        {
            Assembly asm = Assembly.GetExecutingAssembly();

            var lstController = asm.GetTypes()
                .Where(type => typeof(Controller).IsAssignableFrom(type))
                .SelectMany(type => type.GetMethods())
                .Where(method => method.IsPublic && !method.IsDefined(typeof(NonActionAttribute))).ToList();

            List<string> lstClass= new List<string>();
            lstClass.Add("namespace Utility");
            lstClass.Add("{");
            lstClass.Add("  public class Autorize");
            lstClass.Add("  {");
            string ClassName ="";
            List<string> lstMethos = new List<string>();
            foreach (var controller in lstController)
            {
                if (ClassName != ((System.Reflection.MemberInfo)(controller)).ReflectedType.Name.ToString())
                {
                    if (!string.IsNullOrEmpty(ClassName))
                    {
                        lstClass.Add("      }");
                    }
                    lstClass.Add("      public class "+ ((System.Reflection.MemberInfo)(controller)).ReflectedType.Name.ToString());
                    lstClass.Add("      {");
                    lstClass.Add("          public const string Class = \"*\";");
                    ClassName = ((System.Reflection.MemberInfo)(controller)).ReflectedType.Name.ToString();
                    lstMethos = new List<string>();
                }
                if(!((System.Reflection.MethodBase)(controller)).IsVirtual)
                {
                    if (!lstMethos.Exists(c => c == ((System.Reflection.MemberInfo)(controller)).Name))
                    {
                        if (controller.ReturnType.ToString().Contains("ActionResult") || controller.ReturnType.ToString().Contains("JsonResult"))
                        {
                            lstMethos.Add(((System.Reflection.MemberInfo)(controller)).Name);
                            lstClass.Add("          public const string " + ((System.Reflection.MemberInfo)(controller)).Name + " = \"*\";");
                        }
                    }
                }
            }

            lstClass.Add("      }");
            lstClass.Add("  }");
            lstClass.Add("}");

            System.IO.File.WriteAllLines(HttpContext.Current.Server.MapPath("~/Utility/Autorize.cs"), lstClass.ToArray());
        }
        public void Models()
        {
            Assembly asm = Assembly.GetExecutingAssembly();

            var lstController = asm.GetTypes()
                .Where(method => method.ToString().ToLower().Contains(".models.")).ToList();

            foreach (var _class in lstController)
            {
                foreach (var _property in _class.GetProperties())
                {
                    string Name = _property.Name;
                    Type Type = _property.PropertyType;

                }
            }
        }
    }
}