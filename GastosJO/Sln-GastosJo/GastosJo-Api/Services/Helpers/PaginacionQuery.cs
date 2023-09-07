using GastosJo_Api.Models.Helpers;

namespace GastosJo_Api.Services.Helpers
{
    public class PaginacionQuery
    {
        public static int ElementosParaOmitir(Paginado paginado)
        {
            return (paginado.PaginaActual - 1) * paginado.RegistrosPorPagina;
        }
    }
}