using GastosJo_Api.Models.Helpers;

namespace GastosJo_Api.Models.Dto
{
    public class TipoDeTransaccionRequest : TipoDeTransaccion
    {
    }

    public class TipoDeTransaccionResponse : TipoDeTransaccion
    {
        public Resultado Resultado { get; set; } = new Resultado();
    }
}