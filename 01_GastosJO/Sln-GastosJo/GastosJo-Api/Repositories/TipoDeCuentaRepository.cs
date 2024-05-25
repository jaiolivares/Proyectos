using GastosJo_Api.Data;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models;
using Microsoft.EntityFrameworkCore;
using GastosJo_Api.Interfaces.Repository;

namespace GastosJo_Api.Repositories
{
    public class TipoDeCuentaRepository : ITipoDeCuentaRepository
    {
        private readonly GastosJo_ApiContext _context;

        public TipoDeCuentaRepository(GastosJo_ApiContext context)
        {
            _context = context;
        }

        public async Task<TipoDeCuenta?> GetTipoDeCuenta(int id)
        {
            return await _context.TiposDeCuenta.FindAsync(id);
        }

        public async Task<TipoDeCuenta?> GetTipoDeCuenta(int id, bool[] estados)
        {
            return await _context.TiposDeCuenta.Where(x => x.IdTipoDeCuenta == id && estados.Contains(x.Activo)).FirstOrDefaultAsync();
        }

        public async Task<IQueryable<TipoDeCuenta>> GetTiposDeCuenta(Paginado paginado, int elementosParaOmitir, bool[] estados)
        {
            var tipoDeCuentas = await _context.TiposDeCuenta
                .Where(x => estados.Contains(x.Activo))
                .Skip(elementosParaOmitir)
                .Take(paginado.RegistrosPorPagina)
                .OrderBy(x => x.Nombre)
                .ToListAsync();

            return tipoDeCuentas.AsQueryable();
        }

        public async Task<TipoDeCuenta> AddTipoDeCuenta(TipoDeCuenta tipoDeCuentaNuevo)
        {
            tipoDeCuentaNuevo.IdTipoDeCuenta = 0;
            tipoDeCuentaNuevo.Nombre = tipoDeCuentaNuevo.Nombre.Trim();
            tipoDeCuentaNuevo.Codigo = tipoDeCuentaNuevo.Codigo.Trim();

            _context.TiposDeCuenta.Add(tipoDeCuentaNuevo);
            await _context.SaveChangesAsync();

            return tipoDeCuentaNuevo;
        }

        public async Task<TipoDeCuenta> UpdateTipoDeCuenta(TipoDeCuenta tipoDeCuentaActual, TipoDeCuenta tipoDeCuentaModificado)
        {
            tipoDeCuentaActual.Codigo = tipoDeCuentaModificado.Codigo.Trim();
            tipoDeCuentaActual.Nombre = tipoDeCuentaModificado.Nombre.Trim();
            tipoDeCuentaActual.Activo = tipoDeCuentaModificado.Activo;

            await _context.SaveChangesAsync();
            return tipoDeCuentaModificado;
        }

        public async Task DeleteTipoDeCuenta(TipoDeCuenta tipoDeCuentaActual)
        {
            _context.TiposDeCuenta.Remove(tipoDeCuentaActual);
            await _context.SaveChangesAsync();
        }

        public async Task<List<TipoDeCuenta>> ListarTipoDeCuentasPorCodigoNombre(int id, string codigo, string nombre)
        {
            return await _context.TiposDeCuenta.Where(x => x.IdTipoDeCuenta != id && (x.Codigo == codigo || x.Nombre == nombre)).ToListAsync();
        }
    }
}