using GastosJo_Api.Models.Helpers;

namespace GastosJo_Api.Services.Helpers
{
    public class PaginacionQuery
    {
        public static int ElementosParaOmitir(Paginado paginado)
        {
            paginado.PaginaActual = paginado.PaginaActual == 0 ? 1 : paginado.PaginaActual;
            return (paginado.PaginaActual - 1) * paginado.RegistrosPorPagina;
        }
    }
}