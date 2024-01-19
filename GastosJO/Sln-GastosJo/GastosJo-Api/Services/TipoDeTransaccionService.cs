using AutoMapper;
using GastosJo_Api.Interfaces;
using GastosJo_Api.Models;
using GastosJo_Api.Models.Dto;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Services.Helpers;

namespace GastosJo_Api.Services
{
    public class TipoDeTransaccionService : ITipoDeTransaccionService
    {
        private readonly ITipoDeTransaccionRepository _tipoDeTransaccionRepository;
        private readonly IMapper _mapper;

        //TODO: implementar ILOGER private readonly ILogger _logger;
        public TipoDeTransaccionService(ITipoDeTransaccionRepository tipoDeTransaccionRepository, IMapper mapper)
        {
            _tipoDeTransaccionRepository = tipoDeTransaccionRepository;
            _mapper = mapper;
        }

        public async Task<TipoDeTransaccion?> GetTipoDeTransaccion(int id, Estados estado)
        {
            bool[] estados = EstadosQuery.EstadosBusquedaEnTabla(estado);

            return await _tipoDeTransaccionRepository.GetTipoDeTransaccion(id, estados);
        }

        public async Task<IQueryable<TipoDeTransaccion>> GetTiposDeTransaccion(Paginado paginado, Estados estado)
        {
            int elementosParaOmitir = PaginacionQuery.ElementosParaOmitir(paginado);

            bool[] estados = EstadosQuery.EstadosBusquedaEnTabla(estado);

            var tipoDeTransaccions = await _tipoDeTransaccionRepository.GetTiposDeTransaccion(paginado, elementosParaOmitir, estados);

            return tipoDeTransaccions.AsQueryable();
        }

        public async Task<TipoDeTransaccionResponse> AddTipoDeTransaccion(TipoDeTransaccionRequest tipoDeTransaccionRequest)
        {
            TipoDeTransaccionResponse tipoDeTransaccionResponse = await ValidacionDeEntrada(tipoDeTransaccionRequest);

            if (!tipoDeTransaccionResponse.Resultado.EjecucionCorrecta)
                return tipoDeTransaccionResponse;

            TipoDeTransaccion tipoDeTransaccionNuevo = _mapper.Map<TipoDeTransaccion>(tipoDeTransaccionRequest);

            tipoDeTransaccionNuevo = await _tipoDeTransaccionRepository.AddTipoDeTransaccion(tipoDeTransaccionNuevo);

            tipoDeTransaccionResponse = _mapper.Map<TipoDeTransaccionResponse>(tipoDeTransaccionNuevo);

            return tipoDeTransaccionResponse;
        }

        public async Task<TipoDeTransaccionResponse> UpdateTipoDeTransaccion(int id, TipoDeTransaccionRequest tipoDeTransaccionRequest)
        {
            tipoDeTransaccionRequest.IdTipoDeTransaccion = id;
            TipoDeTransaccionResponse tipoDeTransaccionResponse = await ValidacionDeEntrada(tipoDeTransaccionRequest);

            if (!tipoDeTransaccionResponse.Resultado.EjecucionCorrecta)
                return tipoDeTransaccionResponse;

            TipoDeTransaccion tipoDeTransaccionModificado = _mapper.Map<TipoDeTransaccion>(tipoDeTransaccionRequest);

            TipoDeTransaccion? tipoDeTransaccionActual = await GetTipoDeTransaccion(id, Estados.Todos);

            if (tipoDeTransaccionActual == null)
            {
                tipoDeTransaccionResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El TipoDeTransaccion con el id: " + id + " no fue encontrado");
                return tipoDeTransaccionResponse;
            }

            tipoDeTransaccionActual = await _tipoDeTransaccionRepository.UpdateTipoDeTransaccion(tipoDeTransaccionActual, tipoDeTransaccionModificado);

            tipoDeTransaccionResponse = _mapper.Map<TipoDeTransaccionResponse>(tipoDeTransaccionActual);

            return tipoDeTransaccionResponse;
        }

        public async Task<TipoDeTransaccionResponse> DeleteTipoDeTransaccion(int id)
        {
            //TODO: Capturar error cuando se elimina con ForeignKey
            TipoDeTransaccionResponse tipoDeTransaccionResponse = new();

            var tipoDeTransaccionActual = await GetTipoDeTransaccion(id, Estados.Todos);

            if (tipoDeTransaccionActual == null)
            {
                tipoDeTransaccionResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El TipoDeTransaccion con el id: " + id + " no fue encontrado");
                return tipoDeTransaccionResponse;
            }

            tipoDeTransaccionResponse = _mapper.Map<TipoDeTransaccionResponse>(tipoDeTransaccionActual);

            await _tipoDeTransaccionRepository.DeleteTipoDeTransaccion(tipoDeTransaccionActual);

            return tipoDeTransaccionResponse;
        }

        public async Task<TipoDeTransaccionResponse> ValidacionDeEntrada(TipoDeTransaccionRequest tipoDeTransaccionRequest)
        {
            TipoDeTransaccionResponse tipoDeTransaccionResponse = new();

            if (tipoDeTransaccionRequest == null)
            {
                tipoDeTransaccionResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El JSON TipoDeTransaccion es obligatorio");
                return tipoDeTransaccionResponse;
            }

            if (!Validaciones.ValidaCamposVacios(tipoDeTransaccionRequest.Codigo))
            {
                tipoDeTransaccionResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El Código es obligatorio");
                return tipoDeTransaccionResponse;
            }

            if (!Validaciones.ValidaCamposVacios(tipoDeTransaccionRequest.Nombre))
            {
                tipoDeTransaccionResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El Nombre es obligatorio");
                return tipoDeTransaccionResponse;
            }

            List<TipoDeTransaccion> tipoDeTransaccions = await ListarTipoDeTransaccionsPorCodigoNombre(tipoDeTransaccionRequest.IdTipoDeTransaccion, tipoDeTransaccionRequest.Codigo, tipoDeTransaccionRequest.Nombre);

            if (tipoDeTransaccions.Any())
            {
                tipoDeTransaccionResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "Los datos del TipoDeTransaccion ingresado ya existen");
                return tipoDeTransaccionResponse;
            }

            return tipoDeTransaccionResponse;
        }

        public async Task<List<TipoDeTransaccion>> ListarTipoDeTransaccionsPorCodigoNombre(int id, string codigo, string nombre)
        {
            return await _tipoDeTransaccionRepository.ListarTipoDeTransaccionPorCodigoNombre(id, codigo, nombre);
        }

        //TODO: Count total para paginados
    }
}