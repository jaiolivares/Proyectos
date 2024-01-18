using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models.Dto;
using GastosJo_Api.Models;

namespace GastosJo_Api.Interfaces
{
    public interface ICuentaBancariaService
    {
        Task<List<CuentaBancariaDto>> GetCuentasBancaria(Paginado paginado, Estados estado);

        Task<CuentaBancaria?> GetCuentaBancaria(int id);

        Task<CuentaBancariaDto?> GetCuentaBancaria(int id, Estados estados);

        Task<CuentaBancariaResponse> AddCuentaBancaria(CuentaBancariaRequest bancoRequest);

        Task<CuentaBancariaResponse> UpdateCuentaBancaria(int id, CuentaBancariaRequest bancoRequest);

        Task<CuentaBancariaResponse> DeleteCuentaBancaria(int id);
    }
}