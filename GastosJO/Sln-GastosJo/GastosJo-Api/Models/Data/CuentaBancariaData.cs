using GastosJo_Api.Models.Helpers;

namespace GastosJo_Api.Models.Data
{
    public class CuentaBancariaRequest
    {
        public CuentaBancaria CuentaBancaria { get; set; }
    }

    public class CuentaBancariaResponse
    {
        public CuentaBancaria CuentaBancaria { get; set; } = new CuentaBancaria();
        public Resultado Resultado { get; set; } = new Resultado();
    }
}