using System.ComponentModel.DataAnnotations;

namespace GastosJo_Api.Models
{
    public class OrigenDeGasto
    {
        [Key]
        public int IdOrigenDeGasto { get; set; }

        public string Codigo { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public bool Activo { get; set; } = true;
    }
}