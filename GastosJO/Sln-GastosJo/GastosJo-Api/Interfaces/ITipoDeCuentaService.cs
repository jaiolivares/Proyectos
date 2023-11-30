using GastosJo_Api.Models;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models.Data;

namespace GastosJo_Api.Interfaces
{
    public interface ITipoDeCuentaService
    {
        Task<IQueryable<TipoDeCuenta>> GetTiposDeCuenta(Paginado paginado, Estados estado);

        Task<TipoDeCuenta> GetTipoDeCuenta(int id);

        Task<TipoDeCuentaResponse> AddTipoDeCuenta(TipoDeCuentaRequest bancoRequest);

        Task<TipoDeCuentaResponse> UpdateTipoDeCuenta(int id, TipoDeCuentaRequest bancoRequest);

        Task<TipoDeCuentaResponse> DeleteTipoDeCuenta(int id);
    }
}