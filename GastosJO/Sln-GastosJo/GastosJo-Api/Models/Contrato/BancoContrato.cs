using GastosJo_Api.Models.Helpers;

namespace GastosJo_Api.Models.Respuesta
{
    public class BancoContratoRequest
    {
        public Banco Banco { get; set; }
    }

    public class BancoContratoResponse
    {
        public Banco Banco { get; set; } = new Banco();
        public Resultado Resultado { get; set; } = new Resultado();
    }
}