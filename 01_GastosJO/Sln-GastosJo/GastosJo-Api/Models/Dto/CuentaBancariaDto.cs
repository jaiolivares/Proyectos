using GastosJo_Api.Models.Helpers;

namespace GastosJo_Api.Models.Dto
{
    public class CuentaBancariaRequest : CuentaBancaria
    {
    }

    public class CuentaBancariaResponse : CuentaBancaria
    {
        public Resultado Resultado { get; set; } = new Resultado();
    }

    public class CuentaBancariaDto : CuentaBancaria
    {
        public string CodigoBanco { get; set; } = string.Empty;
        public string CodigoTipoDeCuenta { get; set; } = string.Empty;
        public string NombreBanco { get; set; } = string.Empty;
        public string NombreTipoDeCuenta { get; set; } = string.Empty;
    }
}