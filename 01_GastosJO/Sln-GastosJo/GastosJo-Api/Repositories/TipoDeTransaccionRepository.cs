using GastosJo_Api.Data;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models;
using Microsoft.EntityFrameworkCore;
using GastosJo_Api.Interfaces.Repository;

namespace GastosJo_Api.Repositories
{
    public class TipoDeTransaccionRepository : ITipoDeTransaccionRepository
    {
        private readonly GastosJo_ApiContext _context;

        public TipoDeTransaccionRepository(GastosJo_ApiContext context)
        {
            _context = context;
        }

        public async Task<TipoDeTransaccion?> GetTipoDeTransaccion(int id)
        {
            return await _context.TiposDeTransaccion.FindAsync(id);
        }

        public async Task<TipoDeTransaccion?> GetTipoDeTransaccion(int id, bool[] estados)
        {
            return await _context.TiposDeTransaccion.Where(x => x.IdTipoDeTransaccion == id && estados.Contains(x.Activo)).FirstOrDefaultAsync();
        }

        public async Task<IQueryable<TipoDeTransaccion>> GetTiposDeTransaccion(Paginado paginado, int elementosParaOmitir, bool[] estados)
        {
            var tipoDeTransaccion = await _context.TiposDeTransaccion
                .Where(x => estados.Contains(x.Activo))
                .Skip(elementosParaOmitir)
                .Take(paginado.RegistrosPorPagina)
                .OrderBy(x => x.Nombre)
                .ToListAsync();

            return tipoDeTransaccion.AsQueryable();
        }

        public async Task<TipoDeTransaccion> AddTipoDeTransaccion(TipoDeTransaccion tipoDeTransaccionNuevo)
        {
            tipoDeTransaccionNuevo.IdTipoDeTransaccion = 0;
            tipoDeTransaccionNuevo.Nombre = tipoDeTransaccionNuevo.Nombre.Trim();
            tipoDeTransaccionNuevo.Codigo = tipoDeTransaccionNuevo.Codigo.Trim();

            _context.TiposDeTransaccion.Add(tipoDeTransaccionNuevo);
            await _context.SaveChangesAsync();

            return tipoDeTransaccionNuevo;
        }

        public async Task<TipoDeTransaccion> UpdateTipoDeTransaccion(TipoDeTransaccion tipoDeTransaccionActual, TipoDeTransaccion tipoDeTransaccionModificado)
        {
            tipoDeTransaccionActual.Codigo = tipoDeTransaccionModificado.Codigo.Trim();
            tipoDeTransaccionActual.Nombre = tipoDeTransaccionModificado.Nombre.Trim();
            tipoDeTransaccionActual.Activo = tipoDeTransaccionModificado.Activo;

            await _context.SaveChangesAsync();
            return tipoDeTransaccionModificado;
        }

        public async Task DeleteTipoDeTransaccion(TipoDeTransaccion tipoDeTransaccionActual)
        {
            _context.TiposDeTransaccion.Remove(tipoDeTransaccionActual);
            await _context.SaveChangesAsync();
        }

        public async Task<List<TipoDeTransaccion>> ListarTipoDeTransaccionPorCodigoNombre(int id, string codigo, string nombre)
        {
            return await _context.TiposDeTransaccion.Where(x => x.IdTipoDeTransaccion != id && (x.Codigo == codigo || x.Nombre == nombre)).ToListAsync();
        }
    }
}