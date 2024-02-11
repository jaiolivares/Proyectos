using GastosJo_Api.Models.Helpers;

namespace GastosJo_Api.Models.Dto
{
    public class TipoDeCuentaRequest : TipoDeCuenta
    {
    }

    public class TipoDeCuentaResponse : TipoDeCuenta
    {
        public Resultado Resultado { get; set; } = new Resultado();
    }
}