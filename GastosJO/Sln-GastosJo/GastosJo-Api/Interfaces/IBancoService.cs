using GastosJo_Api.Models;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Helpers;

namespace GastosJo_Api.Interfaces
{
    public interface IBancoService
    {
        Task<IQueryable<Banco>> GetBancos(Paginado paginado, Estados estado);
    }
}