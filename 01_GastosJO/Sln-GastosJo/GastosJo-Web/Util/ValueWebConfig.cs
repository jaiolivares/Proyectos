namespace GastosJo_Web.App_Start
{
    public class ValueWebConfig
    {
        private static string apiGastosJo;

        public static string ApiGastosJo
        {
            get => apiGastosJo;
            set => apiGastosJo = value;
        }

        public static void LeerWebConfig()
        {
            apiGastosJo = System.Configuration.ConfigurationManager.AppSettings.Get("ApiGastosJo").ToString();
        }
    }
}