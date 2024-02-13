using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models;

namespace GastosJo_Api.Interfaces
{
    public interface ITipoDeCuentaRepository
    {
        Task<TipoDeCuenta?> GetTipoDeCuenta(int id);

        Task<TipoDeCuenta?> GetTipoDeCuenta(int id, bool[] estados);

        Task<IQueryable<TipoDeCuenta>> GetTiposDeCuenta(Paginado paginado, int elementosParaOmitir, bool[] estados);

        Task<TipoDeCuenta> AddTipoDeCuenta(TipoDeCuenta TipoDeCuentaNuevo);

        Task<TipoDeCuenta> UpdateTipoDeCuenta(TipoDeCuenta TipoDeCuentaActual, TipoDeCuenta TipoDeCuentaModificado);

        Task DeleteTipoDeCuenta(TipoDeCuenta TipoDeCuentaActual);

        Task<List<TipoDeCuenta>> ListarTipoDeCuentasPorCodigoNombre(int id, string codigo, string nombre);
    }
}