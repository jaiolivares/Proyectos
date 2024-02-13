using GastosJo_Api.Models.Helpers;

namespace GastosJo_Api.Models.Dto
{
    public class EmpresaDeGastoRequest : EmpresaDeGasto
    {
    }

    public class EmpresaDeGastoResponse : EmpresaDeGasto
    {
        public Resultado Resultado { get; set; } = new Resultado();
    }
}