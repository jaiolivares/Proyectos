using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models;

namespace GastosJo_Api.Interfaces.Repository
{
    public interface ITipoDeTransaccionRepository
    {
        Task<TipoDeTransaccion?> GetTipoDeTransaccion(int id);

        Task<TipoDeTransaccion?> GetTipoDeTransaccion(int id, bool[] estados);

        Task<IQueryable<TipoDeTransaccion>> GetTiposDeTransaccion(Paginado paginado, int elementosParaOmitir, bool[] estados);

        Task<TipoDeTransaccion> AddTipoDeTransaccion(TipoDeTransaccion bancoNuevo);

        Task<TipoDeTransaccion> UpdateTipoDeTransaccion(TipoDeTransaccion bancoActual, TipoDeTransaccion bancoModificado);

        Task DeleteTipoDeTransaccion(TipoDeTransaccion bancoActual);

        Task<List<TipoDeTransaccion>> ListarTipoDeTransaccionPorCodigoNombre(int id, string codigo, string nombre);
    }
}