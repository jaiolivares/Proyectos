using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GastosJo_Api.Data;
using GastosJo_Api.Models;
using GastosJo_Api.Interfaces;
using GastosJo_Api.Services;

namespace GastosJo_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BancoController : ControllerBase
    {
        private readonly GastosJo_ApiContext _context;
        private readonly IBancoService _bancoService;

        public BancoController(GastosJo_ApiContext context, IBancoService bancoService)
        {
            _context = context;
            _bancoService = bancoService;
        }

        // GET: api/Bancos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Banco>>> GetBancos()
        {
            var bancos = await _bancoService.GetBancos();

            if (bancos == null || !bancos.Any())
            {
                return NotFound();
            }

            return Ok(bancos);
        }

        // GET: api/Bancos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Banco>> GetBancos(int id)
        {
            if (_context.Bancos == null)
            {
                return NotFound();
            }
            var bancos = await _context.Bancos.FindAsync(id);

            if (bancos == null)
            {
                return NotFound();
            }

            return bancos;
        }

        // PUT: api/Bancos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBancos(int id, Banco bancos)
        {
            if (id != bancos.IdBanco)
            {
                return BadRequest();
            }

            _context.Entry(bancos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BancosExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Bancos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Banco>> PostBancos(Banco bancos)
        {
            if (_context.Bancos == null)
            {
                return Problem("Entity set 'GastosJo_ApiContext.Bancos'  is null.");
            }
            _context.Bancos.Add(bancos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBancos", new { id = bancos.IdBanco }, bancos);
        }

        // DELETE: api/Bancos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBancos(int id)
        {
            if (_context.Bancos == null)
            {
                return NotFound();
            }
            var bancos = await _context.Bancos.FindAsync(id);
            if (bancos == null)
            {
                return NotFound();
            }

            _context.Bancos.Remove(bancos);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BancosExists(int id)
        {
            return (_context.Bancos?.Any(e => e.IdBanco == id)).GetValueOrDefault();
        }
    }
}