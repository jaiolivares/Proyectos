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
    public class TipoDeCuentaController : ControllerBase
    {
        private readonly ITipoDeCuentaService _tipoDeCuentaService;

        public TipoDeCuentaController(ITipoDeCuentaService tipoDeCuentaService)
        {
            _tipoDeCuentaService = tipoDeCuentaService;
        }

        [HttpGet("Listar")]
        public async Task<ActionResult<IQueryable<TipoDeCuenta>>> GetTiposDeCuenta([FromQuery] Paginado paginado, Estados estados)
        {
            try
            {
                var tipoDeCuentas = await _tipoDeCuentaService.GetTiposDeCuenta(paginado, estados);

                if (tipoDeCuentas == null)
                    return StatusCode(StatusCodes.Status404NotFound);

                if (!tipoDeCuentas.Any())
                    return StatusCode(StatusCodes.Status204NoContent);

                return StatusCode(StatusCodes.Status200OK, tipoDeCuentas);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        [HttpGet("Obtener/{id}/{estados}")]
        public async Task<ActionResult<TipoDeCuenta>> GetTipoDeCuenta(int id, Estados estados)
        {
            try
            {
                var tipoDeCuenta = await _tipoDeCuentaService.GetTipoDeCuenta(id, estados);

                if (tipoDeCuenta == null)
                    return StatusCode(StatusCodes.Status404NotFound);

                return StatusCode(StatusCodes.Status200OK, tipoDeCuenta);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        [HttpPost("Insertar")]
        public async Task<ActionResult<TipoDeCuentaResponse>> PostTipoDeCuenta(TipoDeCuentaRequest tipoDeCuentaRequest)
        {
            try
            {
                var nuevoTipoDeCuenta = await _tipoDeCuentaService.AddTipoDeCuenta(tipoDeCuentaRequest);

                if (nuevoTipoDeCuenta == null)
                    return StatusCode(StatusCodes.Status500InternalServerError, nuevoTipoDeCuenta);

                if (!nuevoTipoDeCuenta.Resultado.EjecucionCorrecta)
                    return StatusCode(StatusCodes.Status400BadRequest, nuevoTipoDeCuenta);

                return StatusCode(StatusCodes.Status201Created, nuevoTipoDeCuenta);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        [HttpPut("Modificar/{id}")]
        public async Task<ActionResult<TipoDeCuentaResponse>> PutTipoDeCuentas(int id, TipoDeCuentaRequest tipoDeCuentaRequest)
        {
            try
            {
                if (id <= 0)
                    return StatusCode(StatusCodes.Status400BadRequest, "El Id es obligatorio");

                if (tipoDeCuentaRequest == null)
                    return StatusCode(StatusCodes.Status400BadRequest, "El json TipoDeCuenta es obligatorio");

                var tipoDeCuentaModificado = await _tipoDeCuentaService.UpdateTipoDeCuenta(id, tipoDeCuentaRequest);

                if (!tipoDeCuentaModificado.Resultado.EjecucionCorrecta)
                    return StatusCode(StatusCodes.Status400BadRequest, tipoDeCuentaModificado);

                return StatusCode(StatusCodes.Status200OK, tipoDeCuentaModificado);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        [HttpDelete("Eliminar/{id}")]
        public async Task<IActionResult> DeleteTipoDeCuenta(int id)
        {
            try
            {
                var tipoDeCuentaEliminado = await _tipoDeCuentaService.DeleteTipoDeCuenta(id);

                if (!tipoDeCuentaEliminado.Resultado.EjecucionCorrecta)
                    return StatusCode(StatusCodes.Status400BadRequest, tipoDeCuentaEliminado);

                return StatusCode(StatusCodes.Status200OK, tipoDeCuentaEliminado);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }
    }
}