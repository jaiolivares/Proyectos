using GastosJo_Api.Models.Helpers;

namespace GastosJo_Api.Models.Dto
{
    public class BancoRequest : Banco
    {
    }

    public class BancoResponse : Banco
    {
        public Resultado Resultado { get; set; } = new Resultado();
    }
}