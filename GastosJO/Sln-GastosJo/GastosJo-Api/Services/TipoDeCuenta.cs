using AutoMapper;
using GastosJo_Api.Interfaces;
using GastosJo_Api.Models;
using GastosJo_Api.Models.Dto;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Services.Helpers;

namespace GastosJo_Api.Services
{
    public class TipoDeCuentaService : ITipoDeCuentaService
    {
        private readonly ITipoDeCuentaRepository _TipoDeCuentaRepository;
        private readonly IMapper _mapper;

        //TODO: implementar ILOGER private readonly ILogger _logger;
        public TipoDeCuentaService(ITipoDeCuentaRepository TipoDeCuentaRepository, IMapper mapper)
        {
            _TipoDeCuentaRepository = TipoDeCuentaRepository;
            _mapper = mapper;
        }

        public async Task<IQueryable<TipoDeCuenta>> GetTiposDeCuenta(Paginado paginado, Estados estado)
        {
            int elementosParaOmitir = PaginacionQuery.ElementosParaOmitir(paginado);

            bool[] estados = EstadosQuery.EstadosBusquedaEnTabla(estado);

            var tiposDeCuenta = await _TipoDeCuentaRepository.GetTiposDeCuenta(paginado, elementosParaOmitir, estados);

            return tiposDeCuenta.AsQueryable();
        }

        public async Task<TipoDeCuenta?> GetTipoDeCuenta(int id, Estados estado)
        {
            bool[] estados = EstadosQuery.EstadosBusquedaEnTabla(estado);

            return await _TipoDeCuentaRepository.GetTipoDeCuenta(id, estados);
        }

        public async Task<TipoDeCuentaResponse> AddTipoDeCuenta(TipoDeCuentaRequest tipoDeCuentaRequest)
        {
            TipoDeCuentaResponse tipoDeCuentaResponse = await ValidacionDeEntrada(tipoDeCuentaRequest);

            if (!tipoDeCuentaResponse.Resultado.EjecucionCorrecta)
                return tipoDeCuentaResponse;

            TipoDeCuenta tipoDeCuentaNuevo = _mapper.Map<TipoDeCuenta>(tipoDeCuentaRequest);

            tipoDeCuentaNuevo = await _TipoDeCuentaRepository.AddTipoDeCuenta(tipoDeCuentaNuevo);

            tipoDeCuentaResponse = _mapper.Map<TipoDeCuentaResponse>(tipoDeCuentaNuevo);

            return tipoDeCuentaResponse;
        }

        public async Task<TipoDeCuentaResponse> UpdateTipoDeCuenta(int id, TipoDeCuentaRequest tipoDeCuentaRequest)
        {
            tipoDeCuentaRequest.IdTipoDeCuenta = id;
            TipoDeCuentaResponse tipoDeCuentaResponse = await ValidacionDeEntrada(tipoDeCuentaRequest);

            if (!tipoDeCuentaResponse.Resultado.EjecucionCorrecta)
                return tipoDeCuentaResponse;

            TipoDeCuenta tipoDeCuentaModificado = _mapper.Map<TipoDeCuenta>(tipoDeCuentaRequest);

            TipoDeCuenta? tipoDeCuentaActual = await GetTipoDeCuenta(id, Estados.Todos);

            if (tipoDeCuentaActual == null)
            {
                tipoDeCuentaResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El TipoDeCuenta con el id: " + id + " no fue encontrado");
                return tipoDeCuentaResponse;
            }

            tipoDeCuentaActual = await _TipoDeCuentaRepository.UpdateTipoDeCuenta(tipoDeCuentaActual, tipoDeCuentaModificado);

            tipoDeCuentaResponse = _mapper.Map<TipoDeCuentaResponse>(tipoDeCuentaActual);

            return tipoDeCuentaResponse;
        }

        public async Task<TipoDeCuentaResponse> DeleteTipoDeCuenta(int id)
        {
            //TODO: Capturar error cuando se elimina con ForeignKey
            TipoDeCuentaResponse tipoDeCuentaResponse = new();

            var tipoDeCuentaActual = await GetTipoDeCuenta(id, Estados.Todos);

            if (tipoDeCuentaActual == null)
            {
                tipoDeCuentaResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El TipoDeCuenta con el id: " + id + " no fue encontrado");
                return tipoDeCuentaResponse;
            }

            tipoDeCuentaResponse = _mapper.Map<TipoDeCuentaResponse>(tipoDeCuentaActual);

            await _TipoDeCuentaRepository.DeleteTipoDeCuenta(tipoDeCuentaActual);

            return tipoDeCuentaResponse;
        }

        public async Task<TipoDeCuentaResponse> ValidacionDeEntrada(TipoDeCuentaRequest tipoDeCuentaRequest)
        {
            TipoDeCuentaResponse tipoDeCuentaResponse = new();

            if (tipoDeCuentaRequest == null)
            {
                tipoDeCuentaResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El JSON TipoDeCuenta es obligatorio");
                return tipoDeCuentaResponse;
            }

            if (!Validaciones.ValidaCamposVacios(tipoDeCuentaRequest.Codigo))
            {
                tipoDeCuentaResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El Código es obligatorio");
                return tipoDeCuentaResponse;
            }

            if (!Validaciones.ValidaCamposVacios(tipoDeCuentaRequest.Nombre))
            {
                tipoDeCuentaResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El Nombre es obligatorio");
                return tipoDeCuentaResponse;
            }

            List<TipoDeCuenta> TipoDeCuentas = await ListarTipoDeCuentasPorCodigoNombre(tipoDeCuentaRequest.IdTipoDeCuenta, tipoDeCuentaRequest.Codigo, tipoDeCuentaRequest.Nombre);

            if (TipoDeCuentas.Any())
            {
                tipoDeCuentaResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "Los datos del TipoDeCuenta ingresado ya existen");
                return tipoDeCuentaResponse;
            }

            return tipoDeCuentaResponse;
        }

        public async Task<List<TipoDeCuenta>> ListarTipoDeCuentasPorCodigoNombre(int id, string codigo, string nombre)
        {
            return await _TipoDeCuentaRepository.ListarTipoDeCuentasPorCodigoNombre(id, codigo, nombre);
        }

        //TODO: Count total para paginados
    }
}