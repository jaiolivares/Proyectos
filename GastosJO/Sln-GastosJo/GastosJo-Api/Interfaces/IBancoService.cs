using GastosJo_Api.Models;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models.Data;

namespace GastosJo_Api.Interfaces
{
    public interface IBancoService
    {
        Task<IQueryable<Banco>> GetBancos(Paginado paginado, Estados estado);

        Task<Banco?> GetBanco(int id);

        Task<BancoResponse> AddBanco(BancoRequest bancoRequest);

        Task<BancoResponse> UpdateBanco(int id, BancoRequest bancoRequest);

        Task<BancoResponse> DeleteBanco(int id);
    }
}