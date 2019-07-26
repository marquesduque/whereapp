using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace api.App
{
    public partial class index : System.Web.UI.Page
    {
        public static string js
        {
            get
            {
#if DEBUG
                return "";
#else
                return "min.";
#endif
            }
        }
        protected void Page_Load(object sender, EventArgs e)
        {

        }
    }
}