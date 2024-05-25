using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models;

namespace GastosJo_Api.Interfaces.Repository
{
    public interface IEmpresaDeGastoRepository
    {
        Task<EmpresaDeGasto?> GetEmpresaDeGasto(int id);

        Task<EmpresaDeGasto?> GetEmpresaDeGasto(int id, bool[] estados);

        Task<IQueryable<EmpresaDeGasto>> GetEmpresasDeGastos(Paginado paginado, int elementosParaOmitir, bool[] estados);

        Task<EmpresaDeGasto> AddEmpresaDeGasto(EmpresaDeGasto empresaDeGastoNuevo);

        Task<EmpresaDeGasto> UpdateEmpresaDeGasto(EmpresaDeGasto empresaDeGastoActual, EmpresaDeGasto empresaDeGastoModificado);

        Task DeleteEmpresaDeGasto(EmpresaDeGasto empresaDeGastoActual);

        Task<List<EmpresaDeGasto>> ListarEmpresaDeGastosPorCodigoNombre(int id, string codigo, string nombre);
    }
}