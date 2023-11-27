using GastosJo_Api.Models;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models.Data;

namespace GastosJo_Api.Interfaces
{
    public interface ICuentaBancariaService
    {
        Task<IQueryable<CuentaBancaria>> GetCuentasBancaria(Paginado paginado, Estados estado);

        Task<CuentaBancaria> GetCuentaBancaria(int id);

        Task<CuentaBancariaResponse> AddCuentaBancaria(CuentaBancariaRequest bancoRequest);

        Task<CuentaBancariaResponse> UpdateCuentaBancaria(int id, CuentaBancariaRequest bancoRequest);

        Task<CuentaBancariaResponse> DeleteCuentaBancaria(int id);
    }
}