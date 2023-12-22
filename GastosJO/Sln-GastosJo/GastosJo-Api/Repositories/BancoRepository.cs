using GastosJo_Api.Data;
using GastosJo_Api.Interfaces;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GastosJo_Api.Repositories
{
    public class BancoRepository : IBancoRepository
    {
        private readonly GastosJo_ApiContext _context;

        public BancoRepository(GastosJo_ApiContext context)
        {
            _context = context;
        }

        public async Task<IQueryable<Banco>> GetBancos(Paginado paginado, int elementosParaOmitir, bool[] estados)
        {
            var bancos = await _context.Bancos
                .Where(x => estados.Contains(x.Activo))
                .Skip(elementosParaOmitir)
                .Take(paginado.RegistrosPorPagina)
                .OrderBy(x => x.Nombre)
                .ToListAsync();

            return bancos.AsQueryable();
        }

        public async Task<Banco?> GetBanco(int id)
        {
            return await _context.Bancos.FindAsync(id);
        }

        public async Task<Banco> AddBanco(Banco bancoNuevo)
        {
            bancoNuevo.IdBanco = 0;
            bancoNuevo.Nombre = bancoNuevo.Nombre.Trim();
            bancoNuevo.Codigo = bancoNuevo.Codigo.Trim();

            _context.Bancos.Add(bancoNuevo);
            await _context.SaveChangesAsync();

            return bancoNuevo;
        }

        public async Task<Banco> UpdateBanco(Banco bancoActual, Banco bancoModificado)
        {
            bancoActual.Codigo = bancoModificado.Codigo.Trim();
            bancoActual.Nombre = bancoModificado.Nombre.Trim();
            bancoActual.Activo = bancoModificado.Activo;

            await _context.SaveChangesAsync();
            return bancoModificado;
        }

        public async Task DeleteBanco(Banco bancoActual)
        {
            _context.Bancos.Remove(bancoActual);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Banco>> ListarBancosPorCodigoNombre(int id, string codigo, string nombre)
        {
            return await _context.Bancos.Where(x => x.IdBanco != id && (x.Codigo == codigo || x.Nombre == nombre)).ToListAsync();
        }
    }
}