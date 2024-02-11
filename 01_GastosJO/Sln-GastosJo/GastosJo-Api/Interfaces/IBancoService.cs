using GastosJo_Api.Models;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models.Dto;

namespace GastosJo_Api.Interfaces
{
    public interface IBancoService
    {
        Task<Banco?> GetBanco(int id, Estados estados);

        Task<IQueryable<Banco>> GetBancos(Paginado paginado, Estados estados);

        Task<BancoResponse> AddBanco(BancoRequest bancoRequest);

        Task<BancoResponse> UpdateBanco(int id, BancoRequest bancoRequest);

        Task<BancoResponse> DeleteBanco(int id);
    }
}