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

        //TODO: Ver los nombres de los EndPoint, por ejemplo GET: api/Bancos, GET: api/Bancos/5

        // GET: api/Bancos
        [HttpGet()]
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

        // POST: api/Bancos
        [HttpPost]
        public async Task<ActionResult<Banco>> PostBanco(Banco banco)
        {
            try
            {
                var nuevoBanco = await _bancoService.AddBanco(banco);

                //TODO: Verificar que estado se devuelve si no puede grabar
                if (nuevoBanco == null)
                    return StatusCode(StatusCodes.Status500InternalServerError, nuevoBanco);

                return StatusCode(StatusCodes.Status201Created, nuevoBanco);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        // PUT: api/Bancos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBancos(int id, Banco banco)
        {
            try
            {
                //Verificar si es necesario enviar el ID, ya que en el objeto banco puede venir
                var bancoModificado = await _bancoService.UpdateBanco(banco);

                return StatusCode(StatusCodes.Status200OK, banco);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        // DELETE: api/Bancos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBanco(int id)
        {
            try
            {
                return null;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        //private bool BancosExists(int id)
        //{
        //    return (_context.Bancos?.Any(e => e.IdBanco == id)).GetValueOrDefault();
        //}
    }
}