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
    public class CuentaBancariaController : ControllerBase
    {
        private readonly ICuentaBancariaService _cuentaBancariaService;

        public CuentaBancariaController(ICuentaBancariaService cuentaBancariaService)
        {
            _cuentaBancariaService = cuentaBancariaService;
        }

        [HttpGet("Listar")]
        public async Task<ActionResult<List<CuentaBancariaResponse>>> GetCuentasBancaria([FromQuery] Paginado paginado, Estados estados)
        {
            try
            {
                var cuentasBancaria = await _cuentaBancariaService.GetCuentasBancaria(paginado, estados);

                if (cuentasBancaria == null)
                    return StatusCode(StatusCodes.Status404NotFound);

                if (!cuentasBancaria.Any())
                    return StatusCode(StatusCodes.Status204NoContent);

                return StatusCode(StatusCodes.Status200OK, cuentasBancaria);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        [HttpGet("Obtener/{id}/{estados}")]
        public async Task<ActionResult<CuentaBancariaResponse>> GetCuentaBancaria(int id, Estados estados)
        {
            try
            {
                var cuentaBancaria = await _cuentaBancariaService.GetCuentaBancaria(id, estados);

                if (cuentaBancaria == null)
                    return StatusCode(StatusCodes.Status404NotFound);

                return StatusCode(StatusCodes.Status200OK, cuentaBancaria);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        [HttpPost("Insertar")]
        public async Task<ActionResult<CuentaBancariaResponse>> PostCuentaBancaria(CuentaBancariaRequest cuentaBancariaRequest)
        {
            try
            {
                var nuevaCuentaBancaria = await _cuentaBancariaService.AddCuentaBancaria(cuentaBancariaRequest);

                if (nuevaCuentaBancaria == null)
                    return StatusCode(StatusCodes.Status500InternalServerError, nuevaCuentaBancaria);

                if (!nuevaCuentaBancaria.Resultado.EjecucionCorrecta)
                    return StatusCode(StatusCodes.Status400BadRequest, nuevaCuentaBancaria);

                return StatusCode(StatusCodes.Status201Created, nuevaCuentaBancaria);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        [HttpPut("Modificar/{id}")]
        public async Task<ActionResult<CuentaBancariaResponse>> PutCuentaBancarias(int id, CuentaBancariaRequest cuentaBancariaRequest)
        {
            try
            {
                if (id <= 0)
                    return StatusCode(StatusCodes.Status400BadRequest, "El Id es obligatorio");

                if (cuentaBancariaRequest == null)
                    return StatusCode(StatusCodes.Status400BadRequest, "El json CuentaBancaria es obligatorio");

                var cuentaBancariaModificada = await _cuentaBancariaService.UpdateCuentaBancaria(id, cuentaBancariaRequest);

                if (!cuentaBancariaModificada.Resultado.EjecucionCorrecta)
                    return StatusCode(StatusCodes.Status400BadRequest, cuentaBancariaModificada);

                return StatusCode(StatusCodes.Status200OK, cuentaBancariaModificada);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }

        [HttpDelete("Eliminar/{id}")]
        public async Task<IActionResult> DeleteCuentaBancaria(int id)
        {
            try
            {
                var cuentaBancariaEliminada = await _cuentaBancariaService.DeleteCuentaBancaria(id);

                if (!cuentaBancariaEliminada.Resultado.EjecucionCorrecta)
                    return StatusCode(StatusCodes.Status400BadRequest, cuentaBancariaEliminada);

                return StatusCode(StatusCodes.Status200OK, cuentaBancariaEliminada);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }
    }
}