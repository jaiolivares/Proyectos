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

        public BancoController(IBancoService bancoService)
        {
            _bancoService = bancoService;
        }

        [HttpGet("Listar")]
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

        [HttpGet("Obtener/{id}")]
        public async Task<ActionResult<Banco>> GetBanco(int id)
        {
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

        [HttpPost("Insertar")]
        public async Task<ActionResult<Banco>> PostBanco(Banco banco)
        {
            try
            {
                var nuevoBanco = await _bancoService.AddBanco(banco);

                if (nuevoBanco == null)
                    return StatusCode(StatusCodes.Status500InternalServerError, nuevoBanco);

                return StatusCode(StatusCodes.Status201Created, nuevoBanco);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        [HttpPut("Modificar/{id}")]
        public async Task<IActionResult> PutBancos(int id, Banco banco)
        {
            try
            {
                if (id <= 0)
                    return StatusCode(StatusCodes.Status400BadRequest, "El Id es obligatorio");

                if (banco == null)
                    return StatusCode(StatusCodes.Status400BadRequest, "El json Banco es obligatorio");

                var bancoModificado = await _bancoService.UpdateBanco(id, banco);

                return StatusCode(StatusCodes.Status200OK, banco);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        [HttpDelete("Eliminar/{id}")]
        public async Task<IActionResult> DeleteBanco(int id)
        {
            try
            {
                var bancoEliminado = await _bancoService.DeleteBanco(id);

                if (bancoEliminado == null)
                    return StatusCode(StatusCodes.Status404NotFound);

                return StatusCode(StatusCodes.Status200OK, bancoEliminado);
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