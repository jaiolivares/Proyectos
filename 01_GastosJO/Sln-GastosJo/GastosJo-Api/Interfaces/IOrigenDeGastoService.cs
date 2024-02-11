using GastosJo_Api.Models;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models.Dto;

namespace GastosJo_Api.Interfaces
{
    public interface IOrigenDeGastoService
    {
        Task<OrigenDeGasto?> GetOrigenDeGasto(int id, Estados estados);

        Task<IQueryable<OrigenDeGasto>> GetOrigenesDeGastos(Paginado paginado, Estados estados);

        Task<OrigenDeGastoResponse> AddOrigenDeGasto(OrigenDeGastoRequest origenDeGastoRequest);

        Task<OrigenDeGastoResponse> UpdateOrigenDeGasto(int id, OrigenDeGastoRequest origenDeGastoRequest);

        Task<OrigenDeGastoResponse> DeleteOrigenDeGasto(int id);
    }
}