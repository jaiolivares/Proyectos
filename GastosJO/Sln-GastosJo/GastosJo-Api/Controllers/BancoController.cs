using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GastosJo_Api.Data;
using GastosJo_Api.Models;
using GastosJo_Api.Interfaces;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models.Enums;

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
        [HttpGet("Bancos")]
        public async Task<ActionResult<IQueryable<Banco>>> GetBancos([FromQuery] Paginado paginado, Estados estado)
        {
            try
            {
                var bancos = await _bancoService.GetBancos(paginado, estado);

                if (bancos == null)
                    return StatusCode(StatusCodes.Status404NotFound);

                if (!bancos.Any())
                    return StatusCode(StatusCodes.Status204NoContent);

                return StatusCode(StatusCodes.Status200OK, bancos);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        // GET: api/Bancos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Banco>> GetBanco(int id)
        {
            //TODO: Probar GET-ID, ver que pasa con el null
            try
            {
                var banco = await _bancoService.GetBanco(id);

                if (banco == null)
                    return StatusCode(StatusCodes.Status404NotFound);

                return StatusCode(StatusCodes.Status200OK, banco);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
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