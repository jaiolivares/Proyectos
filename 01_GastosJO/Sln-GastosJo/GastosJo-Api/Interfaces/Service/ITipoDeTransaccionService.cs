using GastosJo_Api.Models;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models.Dto;

namespace GastosJo_Api.Interfaces.Service
{
    public interface ITipoDeTransaccionService
    {
        Task<TipoDeTransaccion?> GetTipoDeTransaccion(int id, Estados estados);

        Task<IQueryable<TipoDeTransaccion>> GetTiposDeTransaccion(Paginado paginado, Estados estados);

        Task<TipoDeTransaccionResponse> AddTipoDeTransaccion(TipoDeTransaccionRequest bancoRequest);

        Task<TipoDeTransaccionResponse> UpdateTipoDeTransaccion(int id, TipoDeTransaccionRequest bancoRequest);

        Task<TipoDeTransaccionResponse> DeleteTipoDeTransaccion(int id);
    }
}