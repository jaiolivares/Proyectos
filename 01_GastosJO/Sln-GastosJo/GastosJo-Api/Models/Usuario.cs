using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GastosJo_Api.Models
{
    public class Usuario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdUsuario { get; set; }

        public string CodigoUsuario { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool Activo { get; set; }
    }
}