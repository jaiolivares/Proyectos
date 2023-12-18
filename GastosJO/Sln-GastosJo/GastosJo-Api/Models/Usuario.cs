namespace GastosJo_Api.Models
{
    public class Usuario
    {
        public int IdUsuario { get; set; }
        public string UsuarioX { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool Activo { get; set; }
    }
}