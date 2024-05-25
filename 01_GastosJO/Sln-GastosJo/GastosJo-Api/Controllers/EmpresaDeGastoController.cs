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
    public class EmpresaDeGastoController : ControllerBase
    {
        private readonly IEmpresaDeGastoService _empresaDeGastoService;

        public EmpresaDeGastoController(IEmpresaDeGastoService empresaDeGastoService)
        {
            _empresaDeGastoService = empresaDeGastoService;
        }

        [HttpGet("Obtener/{id}/{estados}")]
        public async Task<ActionResult<EmpresaDeGasto?>> GetEmpresaDeGasto(int id, Estados estados)
        {
            try
            {
                var empresaDeGasto = await _empresaDeGastoService.GetEmpresaDeGasto(id, estados);

                if (empresaDeGasto == null)
                    return StatusCode(StatusCodes.Status404NotFound);

                return StatusCode(StatusCodes.Status200OK, empresaDeGasto);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        [HttpGet("Listar")]
        public async Task<ActionResult<IQueryable<EmpresaDeGasto?>>> GetEmpresaDeGastos([FromQuery] Paginado paginado, Estados estados)
        {
            try
            {
                var empresaDeGastos = await _empresaDeGastoService.GetEmpresasDeGastos(paginado, estados);

                if (empresaDeGastos == null)
                    return StatusCode(StatusCodes.Status404NotFound);

                if (!empresaDeGastos.Any())
                    return StatusCode(StatusCodes.Status204NoContent);

                return StatusCode(StatusCodes.Status200OK, empresaDeGastos);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        [HttpPost("Insertar")]
        public async Task<ActionResult<EmpresaDeGastoResponse>> PostEmpresaDeGasto(EmpresaDeGastoRequest empresaDeGastoRequest)
        {
            try
            {
                var nuevoEmpresaDeGasto = await _empresaDeGastoService.AddEmpresaDeGasto(empresaDeGastoRequest);

                if (nuevoEmpresaDeGasto == null)
                    return StatusCode(StatusCodes.Status500InternalServerError, nuevoEmpresaDeGasto);

                if (!nuevoEmpresaDeGasto.Resultado.EjecucionCorrecta)
                    return StatusCode(StatusCodes.Status400BadRequest, nuevoEmpresaDeGasto);

                return StatusCode(StatusCodes.Status201Created, nuevoEmpresaDeGasto);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        [HttpPut("Modificar/{id}")]
        public async Task<ActionResult<EmpresaDeGastoResponse>> PutEmpresaDeGastos(int id, EmpresaDeGastoRequest empresaDeGastoRequest)
        {
            try
            {
                if (id <= 0)
                    return StatusCode(StatusCodes.Status400BadRequest, "El Id es obligatorio");

                if (empresaDeGastoRequest == null)
                    return StatusCode(StatusCodes.Status400BadRequest, "El json EmpresaDeGasto es obligatorio");

                var empresaDeGastoModificado = await _empresaDeGastoService.UpdateEmpresaDeGasto(id, empresaDeGastoRequest);

                if (!empresaDeGastoModificado.Resultado.EjecucionCorrecta)
                    return StatusCode(StatusCodes.Status400BadRequest, empresaDeGastoModificado);

                return StatusCode(StatusCodes.Status200OK, empresaDeGastoModificado);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        [HttpDelete("Eliminar/{id}")]
        public async Task<IActionResult> DeleteEmpresaDeGasto(int id)
        {
            try
            {
                var empresaDeGastoEliminado = await _empresaDeGastoService.DeleteEmpresaDeGasto(id);

                if (!empresaDeGastoEliminado.Resultado.EjecucionCorrecta)
                    return StatusCode(StatusCodes.Status400BadRequest, empresaDeGastoEliminado);

                return StatusCode(StatusCodes.Status200OK, empresaDeGastoEliminado);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }
    }
}