using System.ComponentModel.DataAnnotations;

namespace GastosJo_Api.Models
{
    public class Banco
    {
        [Key]
        public int IdBanco { get; set; }

        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public bool Activo { get; set; }
    }
}