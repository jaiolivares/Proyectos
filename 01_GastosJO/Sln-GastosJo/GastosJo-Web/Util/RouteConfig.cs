using System.Web.Routing;

namespace GastosJo_Web
{
    public static class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.MapPageRoute("AccesoRoute", "Acceso", "~/Paginas/Acceso/Acceso.aspx");
            routes.MapPageRoute("IndexRoute", "Index", "~/Paginas/Index/Index.aspx");
            routes.MapPageRoute("BancosRoute", "Bancos", "~/Paginas/Bancos/Bancos.aspx");
            routes.MapPageRoute("UsuariosRoute", "Usuarios", "~/Paginas/Usuarios/Usuarios.aspx");
        }
    }
}