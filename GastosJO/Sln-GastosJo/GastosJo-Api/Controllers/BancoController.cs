using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GastosJo_Api.Data;
using GastosJo_Api.Models;
using GastosJo_Api.Interfaces;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Data;

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
        public async Task<ActionResult<BancoResponse>> PostBanco(BancoRequest bancoRequest)
        {
            try
            {
                var nuevoBanco = await _bancoService.AddBanco(bancoRequest);

                if (nuevoBanco == null)
                    return StatusCode(StatusCodes.Status500InternalServerError, nuevoBanco);

                if (!nuevoBanco.Resultado.EjecucionCorrecta)
                    return StatusCode(StatusCodes.Status400BadRequest, nuevoBanco);

                return StatusCode(StatusCodes.Status201Created, nuevoBanco);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        [HttpPut("Modificar/{id}")]
        public async Task<ActionResult<BancoResponse>> PutBancos(int id, BancoRequest bancoRequest)
        {
            try
            {
                if (id <= 0)
                    return StatusCode(StatusCodes.Status400BadRequest, "El Id es obligatorio");

                if (bancoRequest == null)
                    return StatusCode(StatusCodes.Status400BadRequest, "El json Banco es obligatorio");

                var bancoModificado = await _bancoService.UpdateBanco(id, bancoRequest);

                if (!bancoModificado.Resultado.EjecucionCorrecta)
                    return StatusCode(StatusCodes.Status400BadRequest, bancoModificado);

                return StatusCode(StatusCodes.Status200OK, bancoModificado);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        [HttpDelete("Eliminar/{id}")]
        public async Task<IActionResult> DeleteBanco(int id)
        {
            //TODO: Realizar prueba de EndPoint Delete
            try
            {
                var bancoEliminado = await _bancoService.DeleteBanco(id);

                if (!bancoEliminado.Resultado.EjecucionCorrecta)
                    return StatusCode(StatusCodes.Status400BadRequest, bancoEliminado);

                return StatusCode(StatusCodes.Status200OK, bancoEliminado);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }
    }
}