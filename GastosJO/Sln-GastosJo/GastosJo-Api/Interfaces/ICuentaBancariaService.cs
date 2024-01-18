using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models.Dto;

namespace GastosJo_Api.Interfaces
{
    public interface ICuentaBancariaService
    {
        Task<List<CuentaBancaria>> GetCuentasBancaria(Paginado paginado, Estados estado);

        Task<CuentaBancaria?> GetCuentaBancaria(int id, Estados estados);

        Task<CuentaBancariaResponse> AddCuentaBancaria(CuentaBancariaRequest bancoRequest);

        Task<CuentaBancariaResponse> UpdateCuentaBancaria(int id, CuentaBancariaRequest bancoRequest);

        Task<CuentaBancariaResponse> DeleteCuentaBancaria(int id);
    }
}