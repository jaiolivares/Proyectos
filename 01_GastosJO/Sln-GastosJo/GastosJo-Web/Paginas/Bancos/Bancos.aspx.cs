using GastosJo_Web.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace GastosJo_Web.Bancos
{
    public partial class Bancos : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var cc = ValueWebConfig.ApiGastosJo;
        }
    }
}