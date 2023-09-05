using GastosJo_Api.Models;

namespace GastosJo_Api.Interfaces
{
    public interface IBancoService
    {
        Task<List<Banco>> GetBancos();
    }
}