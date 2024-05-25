using Microsoft.AspNetCore.Mvc;
using GastosJo_Api.Models;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Dto;
using GastosJo_Api.Interfaces.Service;
using Microsoft.AspNetCore.Authorization;

namespace GastosJo_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrigenDeGastoController : ControllerBase
    {
        private readonly IOrigenDeGastoService _origenDeGastoService;

        public OrigenDeGastoController(IOrigenDeGastoService origenDeGastoService)
        {
            _origenDeGastoService = origenDeGastoService;
        }

        [HttpGet("Obtener/{id}/{estados}")]
        public async Task<ActionResult<OrigenDeGasto?>> GetOrigenDeGasto(int id, Estados estados)
        {
            try
            {
                var origenDeGasto = await _origenDeGastoService.GetOrigenDeGasto(id, estados);

                if (origenDeGasto == null)
                    return StatusCode(StatusCodes.Status404NotFound);

                return StatusCode(StatusCodes.Status200OK, origenDeGasto);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        [HttpGet("Listar")]
        public async Task<ActionResult<IQueryable<OrigenDeGasto?>>> GetOrigenDeGastos([FromQuery] Paginado paginado, Estados estados)
        {
            try
            {
                var origenDeGastos = await _origenDeGastoService.GetOrigenesDeGastos(paginado, estados);

                if (origenDeGastos == null)
                    return StatusCode(StatusCodes.Status404NotFound);

                if (!origenDeGastos.Any())
                    return StatusCode(StatusCodes.Status204NoContent);

                return StatusCode(StatusCodes.Status200OK, origenDeGastos);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        [HttpPost("Insertar")]
        public async Task<ActionResult<OrigenDeGastoResponse>> PostOrigenDeGasto(OrigenDeGastoRequest origenDeGastoRequest)
        {
            try
            {
                var nuevoOrigenDeGasto = await _origenDeGastoService.AddOrigenDeGasto(origenDeGastoRequest);

                if (nuevoOrigenDeGasto == null)
                    return StatusCode(StatusCodes.Status500InternalServerError, nuevoOrigenDeGasto);

                if (!nuevoOrigenDeGasto.Resultado.EjecucionCorrecta)
                    return StatusCode(StatusCodes.Status400BadRequest, nuevoOrigenDeGasto);

                return StatusCode(StatusCodes.Status201Created, nuevoOrigenDeGasto);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        [HttpPut("Modificar/{id}")]
        public async Task<ActionResult<OrigenDeGastoResponse>> PutOrigenDeGastos(int id, OrigenDeGastoRequest origenDeGastoRequest)
        {
            try
            {
                if (id <= 0)
                    return StatusCode(StatusCodes.Status400BadRequest, "El Id es obligatorio");

                if (origenDeGastoRequest == null)
                    return StatusCode(StatusCodes.Status400BadRequest, "El json OrigenDeGasto es obligatorio");

                var origenDeGastoModificado = await _origenDeGastoService.UpdateOrigenDeGasto(id, origenDeGastoRequest);

                if (!origenDeGastoModificado.Resultado.EjecucionCorrecta)
                    return StatusCode(StatusCodes.Status400BadRequest, origenDeGastoModificado);

                return StatusCode(StatusCodes.Status200OK, origenDeGastoModificado);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        [HttpDelete("Eliminar/{id}")]
        public async Task<IActionResult> DeleteOrigenDeGasto(int id)
        {
            try
            {
                var origenDeGastoEliminado = await _origenDeGastoService.DeleteOrigenDeGasto(id);

                if (!origenDeGastoEliminado.Resultado.EjecucionCorrecta)
                    return StatusCode(StatusCodes.Status400BadRequest, origenDeGastoEliminado);

                return StatusCode(StatusCodes.Status200OK, origenDeGastoEliminado);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }
    }
}