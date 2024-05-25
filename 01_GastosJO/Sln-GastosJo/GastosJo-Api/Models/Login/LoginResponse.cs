using GastosJo_Api.Models.Helpers;

namespace GastosJo_Api.Models.Login
{
    public class LoginResponse : Resultado
    {
        public string CodigoUsuario { get; set; }
        public string Token { get; set; }
    }
}