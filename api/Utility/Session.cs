using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Security;

namespace Utility
{
    public class Session
    {
        [Flags]
        public enum Roles
        {
            Guest = 0,
            Editor = 1,
            Author = 2,
            Administrator = 4
        }
        public static Site.Models.LoginModel Login
        {
            get
            {
                if (!HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    return new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize<Site.Models.LoginModel>("");
                }
                return new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize<Site.Models.LoginModel>(((System.Web.Security.FormsIdentity)(HttpContext.Current.User.Identity)).Ticket.UserData);
            }
            set
            {
                if (value != null)
                {
                    FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(
                        1,
                         typeof(Site.Models.LoginModel).Name,
                         DateTime.Now,
                         DateTime.Now.AddDays(90),
                         true,
                         Newtonsoft.Json.JsonConvert.SerializeObject(value)
                   );

                    string hashCookies = FormsAuthentication.Encrypt(ticket);
                    HttpCookie cookie = new HttpCookie(FormsAuthentication.FormsCookieName, hashCookies);
                    cookie.Expires = ticket.Expiration;
                    HttpContext.Current.Response.Cookies.Add(cookie);

                }
                else
                {
                    HttpContext.Current.Response.Cookies.Remove(FormsAuthentication.FormsCookieName);
                    FormsAuthentication.SignOut();
                }
            }
        }
    }
}