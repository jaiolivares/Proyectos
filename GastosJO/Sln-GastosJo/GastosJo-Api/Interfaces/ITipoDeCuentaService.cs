using GastosJo_Api.Models;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models.Dto;

namespace GastosJo_Api.Interfaces
{
    public interface ITipoDeCuentaService
    {
        Task<IQueryable<TipoDeCuenta>> GetTiposDeCuenta(Paginado paginado, Estados estados);

        Task<TipoDeCuenta?> GetTipoDeCuenta(int id, Estados estados);

        Task<TipoDeCuentaResponse> AddTipoDeCuenta(TipoDeCuentaRequest bancoRequest);

        Task<TipoDeCuentaResponse> UpdateTipoDeCuenta(int id, TipoDeCuentaRequest bancoRequest);

        Task<TipoDeCuentaResponse> DeleteTipoDeCuenta(int id);
    }
}