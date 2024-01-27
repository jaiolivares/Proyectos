using GastosJo_Api.Models.Helpers;

namespace GastosJo_Api.Models.Dto
{
    public class OrigenDeGastoRequest : OrigenDeGasto
    {
    }

    public class OrigenDeGastoResponse : OrigenDeGasto
    {
        public Resultado Resultado { get; set; } = new Resultado();
    }
}