using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models;

namespace GastosJo_Api.Interfaces.Repository
{
    public interface IOrigenDeGastoRepository
    {
        Task<OrigenDeGasto?> GetOrigenDeGasto(int id);

        Task<OrigenDeGasto?> GetOrigenDeGasto(int id, bool[] estados);

        Task<IQueryable<OrigenDeGasto>> GetOrigenesDeGastos(Paginado paginado, int elementosParaOmitir, bool[] estados);

        Task<OrigenDeGasto> AddOrigenDeGasto(OrigenDeGasto origenDeGastoNuevo);

        Task<OrigenDeGasto> UpdateOrigenDeGasto(OrigenDeGasto origenDeGastoActual, OrigenDeGasto origenDeGastoModificado);

        Task DeleteOrigenDeGasto(OrigenDeGasto origenDeGastoActual);

        Task<List<OrigenDeGasto>> ListarOrigenDeGastosPorCodigoNombre(int id, string codigo, string nombre);
    }
}