using GastosJo_Api.Models.Helpers;

namespace GastosJo_Api.Models.Data
{
    public class BancoRequest
    {
        public Banco Banco { get; set; }
    }

    public class BancoResponse
    {
        public Banco Banco { get; set; } = new Banco();
        public Resultado Resultado { get; set; } = new Resultado();
    }
}