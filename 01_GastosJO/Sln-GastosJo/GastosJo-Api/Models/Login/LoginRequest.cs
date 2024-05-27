using System.ComponentModel.DataAnnotations;

namespace GastosJo_Api.Models.Login
{
    public class LoginRequest
    {
        [Required]
        public string CodigoUsuario { get; set; }

        [Required]
        public string Password { get; set; }
    }
}