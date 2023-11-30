using GastosJo_Api.Models.Helpers;

namespace GastosJo_Api.Models.Data
{
    public class TipoDeCuentaRequest
    {
        public TipoDeCuenta TipoDeCuenta { get; set; }
    }

    public class TipoDeCuentaResponse
    {
        public TipoDeCuenta TipoDeCuenta { get; set; } = new TipoDeCuenta();
        public Resultado Resultado { get; set; } = new Resultado();
    }
}