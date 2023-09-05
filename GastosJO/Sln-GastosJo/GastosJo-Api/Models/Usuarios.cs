namespace GastosJo_Api.Models
{
    public class Usuarios
    {
        public int IdUsuario { get; set; }
        public string Usuario { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool Activo { get; set; }
    }
}