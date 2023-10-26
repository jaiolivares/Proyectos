using GastosJo_Api.Models;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models.Respuesta;

namespace GastosJo_Api.Interfaces
{
    public interface IBancoService
    {
        Task<IQueryable<Banco>> GetBancos(Paginado paginado, Estados estado);

        Task<Banco> GetBanco(int id);

        Task<BancoContratoResponse> AddBanco(BancoContratoRequest bancoRequest);

        Task<Banco> UpdateBanco(int id, Banco banco);

        Task<Banco> DeleteBanco(int id);
    }
}