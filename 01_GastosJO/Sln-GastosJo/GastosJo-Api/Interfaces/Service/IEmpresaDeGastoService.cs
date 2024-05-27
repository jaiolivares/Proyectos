using GastosJo_Api.Models;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models.Dto;

namespace GastosJo_Api.Interfaces.Service
{
    public interface IEmpresaDeGastoService
    {
        Task<EmpresaDeGasto?> GetEmpresaDeGasto(int id, Estados estados);

        Task<IQueryable<EmpresaDeGasto>> GetEmpresasDeGastos(Paginado paginado, Estados estados);

        Task<EmpresaDeGastoResponse> AddEmpresaDeGasto(EmpresaDeGastoRequest empresaDeGastoRequest);

        Task<EmpresaDeGastoResponse> UpdateEmpresaDeGasto(int id, EmpresaDeGastoRequest empresaDeGastoRequest);

        Task<EmpresaDeGastoResponse> DeleteEmpresaDeGasto(int id);
    }
}