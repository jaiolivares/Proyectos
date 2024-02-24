using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GastosJo_Api.Models
{
    public class CuentaBancaria
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdCuentaBancaria { get; set; }

        [ForeignKey("IdBanco")]
        public int IdBanco { get; set; }

        [ForeignKey("IdTipoDeCuenta")]
        public int IdTipoDeCuenta { get; set; }

        public string Codigo { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public bool Activo { get; set; } = true;
        public bool VerCuentasPorPagar { get; set; } = false;
    }
}