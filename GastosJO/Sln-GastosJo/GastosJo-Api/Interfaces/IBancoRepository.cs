using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models;

namespace GastosJo_Api.Interfaces
{
    public interface IBancoRepository
    {
        Task<IQueryable<Banco>> GetBancos(Paginado paginado, int elementosParaOmitir, bool[] estados);

        Task<Banco?> GetBanco(int id);

        Task<Banco?> GetBanco(int id, bool[] estados);

        Task<Banco> AddBanco(Banco bancoNuevo);

        Task<Banco> UpdateBanco(Banco bancoActual, Banco bancoModificado);

        Task DeleteBanco(Banco bancoActual);

        Task<List<Banco>> ListarBancosPorCodigoNombre(int id, string codigo, string nombre);
    }
}