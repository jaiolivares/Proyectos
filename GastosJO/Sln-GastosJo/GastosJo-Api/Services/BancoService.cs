using GastosJo_Api.Data;
using GastosJo_Api.Interfaces;
using GastosJo_Api.Models;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Services.Helpers;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
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

        public async Task<Banco?> GetBanco(int id)
        {
            //TODO: revisar si no encuentra el ID "?"
            Banco? banco = await _context.Bancos.FindAsync(id);

            return banco;
        }

        public async Task<Banco> AddBanco(Banco banco)
        {
            //TODO: Ver método Problem del return
            //if (_context.Bancos == null)
            //{
            //    return Problem("Entity set 'GastosJo_ApiContext.Bancos'  is null.");
            //}

            //TODO: Validar datos de entrada y ver si "Activo" llega como True o False

            _context.Bancos.Add(banco);
            await _context.SaveChangesAsync();

            return banco;

            //return CreatedAtAction("GetBancos", new { id = bancos.IdBanco }, bancos);
        }

        public async Task<Banco> UpdateBanco(Banco banco)
        {
            _context.Entry(banco).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return banco;

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

        public async Task<IActionResult> DeleteBanco(int id)
        {
            return null;
            //var banco = await _context.Bancos.FindAsync(id);

            //if (banco == null)

            //return StatusCodes.Status200OK();

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