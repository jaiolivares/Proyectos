using AutoMapper;
using GastosJo_Api.Interfaces;
using GastosJo_Api.Interfaces.Repository;
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

        //TODO: implementar ILOGER private readonly ILogger _logger;

        public CuentaBancariaService(ICuentaBancariaRepository cuentaBancariaRepository, IMapper mapper, IBancoRepository bancoRepository, ITipoDeCuentaRepository tipoDeCuentaRepository)
        {
            _cuentaBancariaRepository = cuentaBancariaRepository;
            _mapper = mapper;
            _bancoRepository = bancoRepository;
            _tipoDeCuentaRepository = tipoDeCuentaRepository;
        }

        public async Task<CuentaBancaria?> GetCuentaBancaria(int id)
        {
            return await _cuentaBancariaRepository.GetCuentaBancaria(id);
        }

        public async Task<CuentaBancariaDto?> GetCuentaBancaria(int id, Estados estado)
        {
            bool[] estados = EstadosQuery.EstadosBusquedaEnTabla(estado);

            return await _cuentaBancariaRepository.GetCuentaBancaria(id, estados);
        }

        public async Task<List<CuentaBancariaDto>?> GetCuentasBancaria(Paginado paginado, Estados estado)
        {
            int elementosParaOmitir = PaginacionQuery.ElementosParaOmitir(paginado);

            bool[] estados = EstadosQuery.EstadosBusquedaEnTabla(estado);

            var cuentasBancaria = await _cuentaBancariaRepository.GetCuentasBancaria(paginado, elementosParaOmitir, estados);

            if (cuentasBancaria == null)
                return null;

            return cuentasBancaria.ToList();
        }

        public async Task<CuentaBancariaResponse> AddCuentaBancaria(CuentaBancariaRequest cuentaBancariaRequest)
        {
            CuentaBancariaResponse cuentaBancariaResponse = await ValidacionDeEntrada(cuentaBancariaRequest, false);

            if (!cuentaBancariaResponse.Resultado.EjecucionCorrecta)
                return cuentaBancariaResponse;

            CuentaBancaria cuentaBancariaNuevo = _mapper.Map<CuentaBancaria>(cuentaBancariaRequest);

            cuentaBancariaNuevo = await _cuentaBancariaRepository.AddCuentaBancaria(cuentaBancariaNuevo);

            cuentaBancariaResponse = _mapper.Map<CuentaBancariaResponse>(cuentaBancariaNuevo);

            return cuentaBancariaResponse;
        }

        public async Task<CuentaBancariaResponse> UpdateCuentaBancaria(int id, CuentaBancariaRequest cuentaBancariaRequest)
        {
            cuentaBancariaRequest.IdCuentaBancaria = id;
            CuentaBancariaResponse cuentaBancariaResponse = await ValidacionDeEntrada(cuentaBancariaRequest, true);

            if (!cuentaBancariaResponse.Resultado.EjecucionCorrecta)
                return cuentaBancariaResponse;

            CuentaBancaria cuentaBancariaModificado = _mapper.Map<CuentaBancaria>(cuentaBancariaRequest);

            CuentaBancaria? cuentaBancariaActual = await GetCuentaBancaria(id);

            if (cuentaBancariaActual == null)
            {
                cuentaBancariaResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "La CuentaBancaria con el id: " + id + " no fue encontrada");
                return cuentaBancariaResponse;
            }

            cuentaBancariaActual = await _cuentaBancariaRepository.UpdateCuentaBancaria(cuentaBancariaActual, cuentaBancariaModificado);

            cuentaBancariaResponse = _mapper.Map<CuentaBancariaResponse>(cuentaBancariaActual);

            return cuentaBancariaResponse;
        }

        public async Task<CuentaBancariaResponse> DeleteCuentaBancaria(int id)
        {
            //TODO: Capturar error cuando se elimina con ForeignKey
            CuentaBancariaResponse cuentaBancariaResponse = new();

            var cuentaBancariaActual = await GetCuentaBancaria(id);

            if (cuentaBancariaActual == null)
            {
                cuentaBancariaResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "La CuentaBancaria con el id: " + id + " no fue encontrada");
                return cuentaBancariaResponse;
            }

            cuentaBancariaResponse = _mapper.Map<CuentaBancariaResponse>(cuentaBancariaActual);

            await _cuentaBancariaRepository.DeleteCuentaBancaria(cuentaBancariaActual);

            return cuentaBancariaResponse;
        }

        public async Task<CuentaBancariaResponse> ValidacionDeEntrada(CuentaBancariaRequest cuentaBancariaRequest, bool esModificacion)
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

            if (esModificacion)
            {
                CuentaBancaria? cuentaBancaria = await GetCuentaBancaria(cuentaBancariaRequest.IdCuentaBancaria, Estados.Todos);
                if (cuentaBancaria == null)
                {
                    cuentaBancariaResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "La CuentaBancaria con el id: " + cuentaBancariaRequest.IdCuentaBancaria + " no fue encontrada");
                    return cuentaBancariaResponse;
                }
            }

            Banco? banco = await _bancoRepository.GetBanco(cuentaBancariaRequest.IdBanco);

            if (banco == null)
            {
                cuentaBancariaResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El id del Banco no existe");
                return cuentaBancariaResponse;
            }

            TipoDeCuenta? tipoDeCuenta = await _tipoDeCuentaRepository.GetTipoDeCuenta(cuentaBancariaRequest.IdTipoDeCuenta);

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