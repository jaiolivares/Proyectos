using AutoMapper;
using GastosJo_Api.Interfaces;
using GastosJo_Api.Models;
using GastosJo_Api.Models.Dto;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Services.Helpers;

namespace GastosJo_Api.Services
{
    public class CuentaBancariaService : ICuentaBancariaService
    {
        private readonly ICuentaBancariaRepository _cuentaBancariaRepository;
        private readonly IMapper _mapper;
        private readonly IBancoRepository _bancoRepository;
        private readonly ITipoDeCuentaRepository _tipoDeCuentaRepository;
        private readonly bool[] estadoActivo = new bool[] { true };

        //TODO: implementar ILOGER private readonly ILogger _logger;

        public CuentaBancariaService(ICuentaBancariaRepository cuentaBancariaRepository, IMapper mapper, IBancoRepository bancoRepository, ITipoDeCuentaRepository tipoDeCuentaRepository)
        {
            _cuentaBancariaRepository = cuentaBancariaRepository;
            _mapper = mapper;
            _bancoRepository = bancoRepository;
            _tipoDeCuentaRepository = tipoDeCuentaRepository;
        }

        public async Task<List<CuentaBancariaDto>> GetCuentasBancaria(Paginado paginado, Estados estado)
        {
            int elementosParaOmitir = PaginacionQuery.ElementosParaOmitir(paginado);

            bool[] estados = EstadosQuery.EstadosBusquedaEnTabla(estado);

            var cuentasBancaria = await _cuentaBancariaRepository.GetCuentasBancaria(paginado, elementosParaOmitir, estados);

            if (cuentasBancaria == null)
                return null;

            return cuentasBancaria.ToList();
        }

        public async Task<CuentaBancariaDto?> GetCuentaBancaria(int id, Estados estado)
        {
            bool[] estados = EstadosQuery.EstadosBusquedaEnTabla(estado);

            return await _cuentaBancariaRepository.GetCuentaBancaria(id, estados);
        }

        public async Task<CuentaBancariaResponse> AddCuentaBancaria(CuentaBancariaRequest cuentaBancariaRequest)
        {
            //CuentaBancariaResponse cuentaBancariaResponse = new();

            //CuentaBancaria cuentaBancariaNueva = _mapper.Map<CuentaBancaria>(cuentaBancariaRequest.CuentaBancaria);

            //cuentaBancariaNueva.IdCuentaBancaria = 0;

            ////_context.CuentasBancaria.Add(cuentaBancariaNueva);
            ////await _context.SaveChangesAsync();

            //cuentaBancariaResponse.CuentaBancaria = cuentaBancariaNueva;

            //return cuentaBancariaResponse;

            //TODO: NOW - Revisar problemas con objeto de entrada porque da error el postman

            //"errors": {
            //    "CuentaBancaria.CodigoBanco": [
            //        "The CodigoBanco field is required."
            //    ],
            //    "CuentaBancaria.NombreBanco": [
            //        "The NombreBanco field is required."
            //    ],
            //    "CuentaBancaria.CodigoTipoDeCuenta": [
            //        "The CodigoTipoDeCuenta field is required."
            //    ],
            //    "CuentaBancaria.NombreTipoDeCuenta": [
            //        "The NombreTipoDeCuenta field is required."
            //    ]
            //}

            CuentaBancariaResponse cuentaBancariaResponse = await ValidacionDeEntrada(cuentaBancariaRequest);

            if (!cuentaBancariaResponse.Resultado.EjecucionCorrecta)
                return cuentaBancariaResponse;

            CuentaBancaria cuentaBancariaNuevo = _mapper.Map<CuentaBancaria>(cuentaBancariaRequest);

            cuentaBancariaNuevo = await _cuentaBancariaRepository.AddCuentaBancaria(cuentaBancariaNuevo);

            cuentaBancariaResponse = _mapper.Map<CuentaBancariaResponse>(cuentaBancariaNuevo);

            return cuentaBancariaResponse;
        }

        public async Task<CuentaBancariaResponse> UpdateCuentaBancaria(int id, CuentaBancariaRequest cuentaBancariaRequest)
        {
            //CuentaBancariaResponse cuentaBancariaResponse = new();

            //CuentaBancaria cuentaBancariaModificada = _mapper.Map<CuentaBancaria>(cuentaBancariaRequest.CuentaBancaria);

            //CuentaBancaria cuentaBancariaActual = await GetCuentaBancaria(id);

            //if (cuentaBancariaActual == null)
            //{
            //    cuentaBancariaResponse.Resultado = Helpers.Resultados.InsertarEjecucionIncorrecta(false, "La CuentaBancaria con el id: " + id + " no fue encontrada");
            //    return cuentaBancariaResponse;
            //}

            //cuentaBancariaActual.Codigo = cuentaBancariaModificada.Codigo;
            //cuentaBancariaActual.Nombre = cuentaBancariaModificada.Nombre;
            //cuentaBancariaActual.Activo = cuentaBancariaModificada.Activo;
            //cuentaBancariaActual.VerCuentasPorPagar = cuentaBancariaModificada.VerCuentasPorPagar;

            ////await _context.SaveChangesAsync();

            //cuentaBancariaResponse.CuentaBancaria = cuentaBancariaActual;

            //return cuentaBancariaResponse;

            cuentaBancariaRequest.IdCuentaBancaria = id;
            CuentaBancariaResponse cuentaBancariaResponse = await ValidacionDeEntrada(cuentaBancariaRequest);

            if (!cuentaBancariaResponse.Resultado.EjecucionCorrecta)
                return cuentaBancariaResponse;

            CuentaBancaria cuentaBancariaModificado = _mapper.Map<CuentaBancaria>(cuentaBancariaRequest);

            CuentaBancaria? cuentaBancariaActual = await GetCuentaBancaria(id, Estados.Todos);

            if (cuentaBancariaActual == null)
            {
                cuentaBancariaResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "La CuentaBancaria con el id: " + id + " no fue encontrado");
                return cuentaBancariaResponse;
            }

            cuentaBancariaActual = await _cuentaBancariaRepository.UpdateCuentaBancaria(cuentaBancariaActual, cuentaBancariaModificado);

            cuentaBancariaResponse = _mapper.Map<CuentaBancariaResponse>(cuentaBancariaActual);

            return cuentaBancariaResponse;
        }

        public async Task<CuentaBancariaResponse> DeleteCuentaBancaria(int id)
        {
            //CuentaBancariaResponse cuentaBancariaResponse = new();

            //var cuentaBancariaActual = await GetCuentaBancaria(id);

            //if (cuentaBancariaActual == null)
            //{
            //    cuentaBancariaResponse.Resultado = Helpers.Resultados.InsertarEjecucionIncorrecta(false, "La CuentaBancaria con el id: " + id + " no fue encontrada");
            //    return cuentaBancariaResponse;
            //}

            //cuentaBancariaResponse.CuentaBancaria = cuentaBancariaActual;

            ////_context.CuentasBancaria.Remove(cuentaBancariaActual);
            ////await _context.SaveChangesAsync();

            //return cuentaBancariaResponse;

            //TODO: Capturar error cuando se elimina con ForeignKey
            CuentaBancariaResponse cuentaBancariaResponse = new();

            var cuentaBancariaActual = await GetCuentaBancaria(id, Estados.Todos);

            if (cuentaBancariaActual == null)
            {
                cuentaBancariaResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "La CuentaBancaria con el id: " + id + " no fue encontrado");
                return cuentaBancariaResponse;
            }

            cuentaBancariaResponse = _mapper.Map<CuentaBancariaResponse>(cuentaBancariaActual);

            await _cuentaBancariaRepository.DeleteCuentaBancaria(cuentaBancariaActual);

            return cuentaBancariaResponse;
        }

        public async Task<CuentaBancariaResponse> ValidacionDeEntrada(CuentaBancariaRequest cuentaBancariaRequest)
        {
            CuentaBancariaResponse cuentaBancariaResponse = new();

            if (cuentaBancariaRequest == null)
            {
                cuentaBancariaResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El JSON CuentaBancaria es obligatorio");
                return cuentaBancariaResponse;
            }

            if (!Validaciones.ValidaCamposVacios(cuentaBancariaRequest.Codigo))
            {
                cuentaBancariaResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El Código es obligatorio");
                return cuentaBancariaResponse;
            }

            if (!Validaciones.ValidaCamposVacios(cuentaBancariaRequest.Nombre))
            {
                cuentaBancariaResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El Nombre es obligatorio");
                return cuentaBancariaResponse;
            }

            Banco? banco = await _bancoRepository.GetBanco(cuentaBancariaRequest.IdBanco, estadoActivo);

            if (banco == null)
            {
                cuentaBancariaResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El id del Banco no existe");
                return cuentaBancariaResponse;
            }

            TipoDeCuenta? tipoDeCuenta = await _tipoDeCuentaRepository.GetTipoDeCuenta(cuentaBancariaRequest.IdTipoDeCuenta, estadoActivo);

            if (tipoDeCuenta == null)
            {
                cuentaBancariaResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El id del TipoDeCuenta no existe");
                return cuentaBancariaResponse;
            }

            List<CuentaBancaria> cuentaBancarias = await ListarCuentasBancariaPorCodigoNombre(cuentaBancariaRequest.IdCuentaBancaria, cuentaBancariaRequest.Codigo, cuentaBancariaRequest.Nombre);

            if (cuentaBancarias.Any())
            {
                cuentaBancariaResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "Los datos del CuentaBancaria ingresado ya existen");
                return cuentaBancariaResponse;
            }

            return cuentaBancariaResponse;
        }

        public async Task<List<CuentaBancaria>> ListarCuentasBancariaPorCodigoNombre(int id, string codigo, string nombre)
        {
            return await _cuentaBancariaRepository.ListarCuentasBancariaPorCodigoNombre(id, codigo, nombre);
        }

        //TODO: Count total para paginados
    }
}