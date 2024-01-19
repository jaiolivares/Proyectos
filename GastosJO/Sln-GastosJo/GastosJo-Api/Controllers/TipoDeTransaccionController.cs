using Microsoft.AspNetCore.Mvc;
using GastosJo_Api.Models;
using GastosJo_Api.Interfaces;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Dto;

namespace GastosJo_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoDeTransaccionController : ControllerBase
    {
        private readonly ITipoDeTransaccionService _tipoDeTransaccionService;

        public TipoDeTransaccionController(ITipoDeTransaccionService tipoDeTransaccionService)
        {
            _tipoDeTransaccionService = tipoDeTransaccionService;
        }

        [HttpGet("Obtener/{id}/{estados}")]
        public async Task<ActionResult<TipoDeTransaccion?>> GetTipoDeTransaccion(int id, Estados estados)
        {
            try
            {
                var tipoDeTransaccion = await _tipoDeTransaccionService.GetTipoDeTransaccion(id, estados);

                if (tipoDeTransaccion == null)
                    return StatusCode(StatusCodes.Status404NotFound);

                return StatusCode(StatusCodes.Status200OK, tipoDeTransaccion);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        [HttpGet("Listar")]
        public async Task<ActionResult<IQueryable<TipoDeTransaccion?>>> GetTipoDeTransaccions([FromQuery] Paginado paginado, Estados estados)
        {
            try
            {
                var tipoDeTransaccions = await _tipoDeTransaccionService.GetTiposDeTransaccion(paginado, estados);

                if (tipoDeTransaccions == null)
                    return StatusCode(StatusCodes.Status404NotFound);

                if (!tipoDeTransaccions.Any())
                    return StatusCode(StatusCodes.Status204NoContent);

                return StatusCode(StatusCodes.Status200OK, tipoDeTransaccions);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        [HttpPost("Insertar")]
        public async Task<ActionResult<TipoDeTransaccionResponse>> PostTipoDeTransaccion(TipoDeTransaccionRequest tipoDeTransaccionRequest)
        {
            try
            {
                var nuevoTipoDeTransaccion = await _tipoDeTransaccionService.AddTipoDeTransaccion(tipoDeTransaccionRequest);

                if (nuevoTipoDeTransaccion == null)
                    return StatusCode(StatusCodes.Status500InternalServerError, nuevoTipoDeTransaccion);

                if (!nuevoTipoDeTransaccion.Resultado.EjecucionCorrecta)
                    return StatusCode(StatusCodes.Status400BadRequest, nuevoTipoDeTransaccion);

                return StatusCode(StatusCodes.Status201Created, nuevoTipoDeTransaccion);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        [HttpPut("Modificar/{id}")]
        public async Task<ActionResult<TipoDeTransaccionResponse>> PutTipoDeTransaccions(int id, TipoDeTransaccionRequest tipoDeTransaccionRequest)
        {
            try
            {
                if (id <= 0)
                    return StatusCode(StatusCodes.Status400BadRequest, "El Id es obligatorio");

                if (tipoDeTransaccionRequest == null)
                    return StatusCode(StatusCodes.Status400BadRequest, "El json TipoDeTransaccion es obligatorio");

                var tipoDeTransaccionModificado = await _tipoDeTransaccionService.UpdateTipoDeTransaccion(id, tipoDeTransaccionRequest);

                if (!tipoDeTransaccionModificado.Resultado.EjecucionCorrecta)
                    return StatusCode(StatusCodes.Status400BadRequest, tipoDeTransaccionModificado);

                return StatusCode(StatusCodes.Status200OK, tipoDeTransaccionModificado);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        [HttpDelete("Eliminar/{id}")]
        public async Task<IActionResult> DeleteTipoDeTransaccion(int id)
        {
            try
            {
                var tipoDeTransaccionEliminado = await _tipoDeTransaccionService.DeleteTipoDeTransaccion(id);

                if (!tipoDeTransaccionEliminado.Resultado.EjecucionCorrecta)
                    return StatusCode(StatusCodes.Status400BadRequest, tipoDeTransaccionEliminado);

                return StatusCode(StatusCodes.Status200OK, tipoDeTransaccionEliminado);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }
    }
}