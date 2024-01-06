using AutoMapper;
using GastosJo_Api.Interfaces;
using GastosJo_Api.Models;
using GastosJo_Api.Models.Data;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Services.Helpers;

namespace GastosJo_Api.Services
{
    public class TipoDeCuentaService : ITipoDeCuentaService
    {
        private readonly ITipoDeCuentaRepository _TipoDeCuentaRepository;
        private readonly IMapper _mapper;

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

        public async Task<TipoDeCuenta?> GetTipoDeCuenta(int id)
        {
            return await _TipoDeCuentaRepository.GetTipoDeCuenta(id);
        }

        public async Task<TipoDeCuentaResponse> AddTipoDeCuenta(TipoDeCuentaRequest tipoDeCuentaRequest)
        {
            TipoDeCuentaResponse tipoDeCuentaResponse = await ValidacionDeEntrada(tipoDeCuentaRequest);

            if (!tipoDeCuentaResponse.Resultado.EjecucionCorrecta)
                return tipoDeCuentaResponse;

            TipoDeCuenta tipoDeCuentaNuevo = _mapper.Map<TipoDeCuenta>(tipoDeCuentaRequest.TipoDeCuenta);

            tipoDeCuentaNuevo = await _TipoDeCuentaRepository.AddTipoDeCuenta(tipoDeCuentaNuevo);

            tipoDeCuentaResponse.TipoDeCuenta = tipoDeCuentaNuevo;

            return tipoDeCuentaResponse;
        }

        public async Task<TipoDeCuentaResponse> UpdateTipoDeCuenta(int id, TipoDeCuentaRequest tipoDeCuentaRequest)
        {
            tipoDeCuentaRequest.TipoDeCuenta.IdTipoDeCuenta = id;
            TipoDeCuentaResponse tipoDeCuentaResponse = await ValidacionDeEntrada(tipoDeCuentaRequest);

            if (!tipoDeCuentaResponse.Resultado.EjecucionCorrecta)
                return tipoDeCuentaResponse;

            TipoDeCuenta tipoDeCuentaModificado = _mapper.Map<TipoDeCuenta>(tipoDeCuentaRequest.TipoDeCuenta);

            TipoDeCuenta? tipoDeCuentaActual = await GetTipoDeCuenta(id);

            if (tipoDeCuentaActual == null)
            {
                tipoDeCuentaResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El TipoDeCuenta con el id: " + id + " no fue encontrado");
                return tipoDeCuentaResponse;
            }

            tipoDeCuentaActual = await _TipoDeCuentaRepository.UpdateTipoDeCuenta(tipoDeCuentaActual, tipoDeCuentaModificado);

            tipoDeCuentaResponse.TipoDeCuenta = tipoDeCuentaActual;

            return tipoDeCuentaResponse;
        }

        public async Task<TipoDeCuentaResponse> DeleteTipoDeCuenta(int id)
        {
            //TODO: Capturar error cuando se elimina con ForeignKey
            TipoDeCuentaResponse tipoDeCuentaResponse = new();

            var tipoDeCuentaActual = await GetTipoDeCuenta(id);

            if (tipoDeCuentaActual == null)
            {
                tipoDeCuentaResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El TipoDeCuenta con el id: " + id + " no fue encontrado");
                return tipoDeCuentaResponse;
            }

            tipoDeCuentaResponse.TipoDeCuenta = tipoDeCuentaActual;

            await _TipoDeCuentaRepository.DeleteTipoDeCuenta(tipoDeCuentaActual);

            return tipoDeCuentaResponse;
        }

        public async Task<TipoDeCuentaResponse> ValidacionDeEntrada(TipoDeCuentaRequest tipoDeCuentaRequest)
        {
            TipoDeCuentaResponse tipoDeCuentaResponse = new();

            if (!Validaciones.ValidaCamposVacios(tipoDeCuentaRequest.TipoDeCuenta.Codigo))
            {
                tipoDeCuentaResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El Código es obligatorio");
                return tipoDeCuentaResponse;
            }

            if (!Validaciones.ValidaCamposVacios(tipoDeCuentaRequest.TipoDeCuenta.Nombre))
            {
                tipoDeCuentaResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El Nombre es obligatorio");
                return tipoDeCuentaResponse;
            }

            List<TipoDeCuenta> TipoDeCuentas = await ListarTipoDeCuentasPorCodigoNombre(tipoDeCuentaRequest.TipoDeCuenta.IdTipoDeCuenta, tipoDeCuentaRequest.TipoDeCuenta.Codigo, tipoDeCuentaRequest.TipoDeCuenta.Nombre);

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