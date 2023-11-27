using System.ComponentModel.DataAnnotations;

namespace GastosJo_Api.Models
{
    public class CuentaBancaria
    {
        [Key]
        public int IdCuentaBancaria { get; set; }

        public string Codigo { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public bool Activo { get; set; } = true;
        public bool VerCuentasPorPagar { get; set; } = false;
    }
}