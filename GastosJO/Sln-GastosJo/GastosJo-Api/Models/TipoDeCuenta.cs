using System.ComponentModel.DataAnnotations;

namespace GastosJo_Api.Models
{
    public class TipoDeCuenta
    {
        [Key]
        public int IdTipoDeCuenta { get; set; }

        public string Codigo { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public bool Activo { get; set; } = true;
    }
}