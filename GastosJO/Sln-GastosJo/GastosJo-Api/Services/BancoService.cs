using GastosJo_Api.Data;
using GastosJo_Api.Interfaces;
using GastosJo_Api.Models;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Services.Helpers;
using Microsoft.EntityFrameworkCore;

namespace GastosJo_Api.Services
{
    public class BancoService : IBancoService
    {
        private readonly GastosJo_ApiContext _context;

        public BancoService(GastosJo_ApiContext context)
        {
            _context = context;
        }

        public async Task<IQueryable<Banco>> GetBancos(Paginado paginado, Estados estado)
        {
            int elementosParaOmitir = PaginacionQuery.ElementosParaOmitir(paginado);

            bool[] estados = EstadosQuery.EstadosBusquedaEnTabla(estado);

            var bancos = await _context.Bancos
                .Where(x => estados.Contains(x.Activo))
                .Skip(elementosParaOmitir)
                .Take(paginado.RegistrosPorPagina)
                .OrderBy(x => x.Nombre)
                .ToListAsync();

            return bancos.AsQueryable();
        }

        public async Task<Banco> GetBanco(int id)
        {
            return await _context.Bancos.FindAsync(id);
        }

        public async Task<Banco> AddBanco(Banco banco)
        {
            banco.IdBanco = 0;

            if (string.IsNullOrEmpty(banco.Codigo))
            {
                banco.ResultadoEjecucion = Helpers.Resultado.InsertarErrorEjecucion(false, "El Código es obligatorio");
                return banco;
            }

            if (string.IsNullOrEmpty(banco.Nombre))
            {
                banco.ResultadoEjecucion = Helpers.Resultado.InsertarErrorEjecucion(false, "El Nombre es obligatorio");
                return banco;
            }

            _context.Bancos.Add(banco);
            await _context.SaveChangesAsync();

            return banco;
        }

        public async Task<Banco> UpdateBanco(int id, Banco bancoModificado)
        {
            //_context.Entry(banco).State = EntityState.Modified;

            var bancoActual = await GetBanco(id);

            bancoActual.Codigo = bancoModificado.Codigo;
            bancoActual.Nombre = bancoModificado.Nombre;
            bancoActual.Activo = bancoModificado.Activo;

            await _context.SaveChangesAsync();

            return bancoActual;

            //if (id != bancos.IdBanco)
            //{
            //    return BadRequest();
            //}

            //_context.Entry(bancos).State = EntityState.Modified;

            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!BancosExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            //return NoContent();
        }

        public async Task<Banco> DeleteBanco(int id)
        {
            var banco = await GetBanco(id);

            if (banco == null)
                return banco;

            _context.Bancos.Remove(banco);
            await _context.SaveChangesAsync();

            return banco;
            //if (_context.Bancos == null)
            //{
            //    return NotFound();
            //}
            //var bancos = await _context.Bancos.FindAsync(id);
            //if (bancos == null)
            //{
            //    return NotFound();
            //}

            //_context.Bancos.Remove(bancos);
            //await _context.SaveChangesAsync();

            //return NoContent();
        }
    }
}