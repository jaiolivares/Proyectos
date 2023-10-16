using GastosJo_Api.Models;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace GastosJo_Api.Interfaces
{
    public interface IBancoService
    {
        Task<IQueryable<Banco>> GetBancos(Paginado paginado, Estados estado);

        Task<Banco?> GetBanco(int id);

        Task<Banco> AddBanco(Banco banco);

        Task<Banco> UpdateBanco(Banco banco);

        Task<IActionResult> DeleteBanco(int id);
    }
}