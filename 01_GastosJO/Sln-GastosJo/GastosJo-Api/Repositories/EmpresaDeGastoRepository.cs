using GastosJo_Api.Data;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models;
using Microsoft.EntityFrameworkCore;
using GastosJo_Api.Interfaces.Repository;

namespace GastosJo_Api.Repositories
{
    public class EmpresaDeGastoRepository : IEmpresaDeGastoRepository
    {
        private readonly GastosJo_ApiContext _context;

        public EmpresaDeGastoRepository(GastosJo_ApiContext context)
        {
            _context = context;
        }

        public async Task<EmpresaDeGasto?> GetEmpresaDeGasto(int id)
        {
            return await _context.EmpresasDeGastos.FindAsync(id);
        }

        public async Task<EmpresaDeGasto?> GetEmpresaDeGasto(int id, bool[] estados)
        {
            return await _context.EmpresasDeGastos.Where(x => x.IdEmpresaDeGasto == id && estados.Contains(x.Activo)).FirstOrDefaultAsync();
        }

        public async Task<IQueryable<EmpresaDeGasto>> GetEmpresasDeGastos(Paginado paginado, int elementosParaOmitir, bool[] estados)
        {
            var empresaDeGastos = await _context.EmpresasDeGastos
                .Where(x => estados.Contains(x.Activo))
                .Skip(elementosParaOmitir)
                .Take(paginado.RegistrosPorPagina)
                .OrderBy(x => x.Nombre)
                .ToListAsync();

            return empresaDeGastos.AsQueryable();
        }

        public async Task<EmpresaDeGasto> AddEmpresaDeGasto(EmpresaDeGasto empresaDeGastoNuevo)
        {
            empresaDeGastoNuevo.IdEmpresaDeGasto = 0;
            empresaDeGastoNuevo.Nombre = empresaDeGastoNuevo.Nombre.Trim();
            empresaDeGastoNuevo.Codigo = empresaDeGastoNuevo.Codigo.Trim();

            _context.EmpresasDeGastos.Add(empresaDeGastoNuevo);
            await _context.SaveChangesAsync();

            return empresaDeGastoNuevo;
        }

        public async Task<EmpresaDeGasto> UpdateEmpresaDeGasto(EmpresaDeGasto empresaDeGastoActual, EmpresaDeGasto empresaDeGastoModificado)
        {
            empresaDeGastoActual.Codigo = empresaDeGastoModificado.Codigo.Trim();
            empresaDeGastoActual.Nombre = empresaDeGastoModificado.Nombre.Trim();
            empresaDeGastoActual.Activo = empresaDeGastoModificado.Activo;

            await _context.SaveChangesAsync();
            return empresaDeGastoModificado;
        }

        public async Task DeleteEmpresaDeGasto(EmpresaDeGasto empresaDeGastoActual)
        {
            _context.EmpresasDeGastos.Remove(empresaDeGastoActual);
            await _context.SaveChangesAsync();
        }

        public async Task<List<EmpresaDeGasto>> ListarEmpresaDeGastosPorCodigoNombre(int id, string codigo, string nombre)
        {
            return await _context.EmpresasDeGastos.Where(x => x.IdEmpresaDeGasto != id && (x.Codigo == codigo || x.Nombre == nombre)).ToListAsync();
        }
    }
}