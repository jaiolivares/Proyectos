using GastosJo_Api.Data;
using GastosJo_Api.Interfaces;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GastosJo_Api.Repositories
{
    public class OrigenDeGastoRepository : IOrigenDeGastoRepository
    {
        private readonly GastosJo_ApiContext _context;

        public OrigenDeGastoRepository(GastosJo_ApiContext context)
        {
            _context = context;
        }

        public async Task<OrigenDeGasto?> GetOrigenDeGasto(int id)
        {
            return await _context.OrigenesDeGastos.FindAsync(id);
        }

        public async Task<OrigenDeGasto?> GetOrigenDeGasto(int id, bool[] estados)
        {
            return await _context.OrigenesDeGastos.Where(x => x.IdOrigenDeGasto == id && estados.Contains(x.Activo)).FirstOrDefaultAsync();
        }

        public async Task<IQueryable<OrigenDeGasto>> GetOrigenesDeGastos(Paginado paginado, int elementosParaOmitir, bool[] estados)
        {
            var origenDeGastos = await _context.OrigenesDeGastos
                .Where(x => estados.Contains(x.Activo))
                .Skip(elementosParaOmitir)
                .Take(paginado.RegistrosPorPagina)
                .OrderBy(x => x.Nombre)
                .ToListAsync();

            return origenDeGastos.AsQueryable();
        }

        public async Task<OrigenDeGasto> AddOrigenDeGasto(OrigenDeGasto origenDeGastoNuevo)
        {
            origenDeGastoNuevo.IdOrigenDeGasto = 0;
            origenDeGastoNuevo.Nombre = origenDeGastoNuevo.Nombre.Trim();
            origenDeGastoNuevo.Codigo = origenDeGastoNuevo.Codigo.Trim();

            _context.OrigenesDeGastos.Add(origenDeGastoNuevo);
            await _context.SaveChangesAsync();

            return origenDeGastoNuevo;
        }

        public async Task<OrigenDeGasto> UpdateOrigenDeGasto(OrigenDeGasto origenDeGastoActual, OrigenDeGasto origenDeGastoModificado)
        {
            origenDeGastoActual.Codigo = origenDeGastoModificado.Codigo.Trim();
            origenDeGastoActual.Nombre = origenDeGastoModificado.Nombre.Trim();
            origenDeGastoActual.Activo = origenDeGastoModificado.Activo;

            await _context.SaveChangesAsync();
            return origenDeGastoModificado;
        }

        public async Task DeleteOrigenDeGasto(OrigenDeGasto origenDeGastoActual)
        {
            _context.OrigenesDeGastos.Remove(origenDeGastoActual);
            await _context.SaveChangesAsync();
        }

        public async Task<List<OrigenDeGasto>> ListarOrigenDeGastosPorCodigoNombre(int id, string codigo, string nombre)
        {
            return await _context.OrigenesDeGastos.Where(x => x.IdOrigenDeGasto != id && (x.Codigo == codigo || x.Nombre == nombre)).ToListAsync();
        }
    }
}