using AutoMapper;
using GastosJo_Api.Interfaces;
using GastosJo_Api.Models;
using GastosJo_Api.Models.Dto;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Services.Helpers;

namespace GastosJo_Api.Services
{
    public class OrigenDeGastoService : IOrigenDeGastoService
    {
        private readonly IOrigenDeGastoRepository _origenDeGastoRepository;
        private readonly IMapper _mapper;

        //TODO: implementar ILOGER private readonly ILogger _logger;
        public OrigenDeGastoService(IOrigenDeGastoRepository origenDeGastoRepository, IMapper mapper)
        {
            _origenDeGastoRepository = origenDeGastoRepository;
            _mapper = mapper;
        }

        public async Task<OrigenDeGasto?> GetOrigenDeGasto(int id, Estados estado)
        {
            bool[] estados = EstadosQuery.EstadosBusquedaEnTabla(estado);

            return await _origenDeGastoRepository.GetOrigenDeGasto(id, estados);
        }

        public async Task<IQueryable<OrigenDeGasto>> GetOrigenesDeGastos(Paginado paginado, Estados estado)
        {
            int elementosParaOmitir = PaginacionQuery.ElementosParaOmitir(paginado);

            bool[] estados = EstadosQuery.EstadosBusquedaEnTabla(estado);

            var origenDeGastos = await _origenDeGastoRepository.GetOrigenesDeGastos(paginado, elementosParaOmitir, estados);

            return origenDeGastos.AsQueryable();
        }

        public async Task<OrigenDeGastoResponse> AddOrigenDeGasto(OrigenDeGastoRequest origenDeGastoRequest)
        {
            OrigenDeGastoResponse origenDeGastoResponse = await ValidacionDeEntrada(origenDeGastoRequest, false);

            if (!origenDeGastoResponse.Resultado.EjecucionCorrecta)
                return origenDeGastoResponse;

            OrigenDeGasto origenDeGastoNuevo = _mapper.Map<OrigenDeGasto>(origenDeGastoRequest);

            origenDeGastoNuevo = await _origenDeGastoRepository.AddOrigenDeGasto(origenDeGastoNuevo);

            origenDeGastoResponse = _mapper.Map<OrigenDeGastoResponse>(origenDeGastoNuevo);

            return origenDeGastoResponse;
        }

        public async Task<OrigenDeGastoResponse> UpdateOrigenDeGasto(int id, OrigenDeGastoRequest origenDeGastoRequest)
        {
            origenDeGastoRequest.IdOrigenDeGasto = id;
            OrigenDeGastoResponse origenDeGastoResponse = await ValidacionDeEntrada(origenDeGastoRequest, true);

            if (!origenDeGastoResponse.Resultado.EjecucionCorrecta)
                return origenDeGastoResponse;

            OrigenDeGasto origenDeGastoModificado = _mapper.Map<OrigenDeGasto>(origenDeGastoRequest);

            OrigenDeGasto? origenDeGastoActual = await GetOrigenDeGasto(id, Estados.Todos);

            if (origenDeGastoActual == null)
            {
                origenDeGastoResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El OrigenDeGasto con el id: " + id + " no fue encontrado");
                return origenDeGastoResponse;
            }

            origenDeGastoActual = await _origenDeGastoRepository.UpdateOrigenDeGasto(origenDeGastoActual, origenDeGastoModificado);

            origenDeGastoResponse = _mapper.Map<OrigenDeGastoResponse>(origenDeGastoActual);

            return origenDeGastoResponse;
        }

        public async Task<OrigenDeGastoResponse> DeleteOrigenDeGasto(int id)
        {
            //TODO: Capturar error cuando se elimina con ForeignKey
            OrigenDeGastoResponse origenDeGastoResponse = new();

            var origenDeGastoActual = await GetOrigenDeGasto(id, Estados.Todos);

            if (origenDeGastoActual == null)
            {
                origenDeGastoResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El OrigenDeGasto con el id: " + id + " no fue encontrado");
                return origenDeGastoResponse;
            }

            origenDeGastoResponse = _mapper.Map<OrigenDeGastoResponse>(origenDeGastoActual);

            await _origenDeGastoRepository.DeleteOrigenDeGasto(origenDeGastoActual);

            return origenDeGastoResponse;
        }

        public async Task<OrigenDeGastoResponse> ValidacionDeEntrada(OrigenDeGastoRequest origenDeGastoRequest, bool esModificacion)
        {
            OrigenDeGastoResponse origenDeGastoResponse = new();

            if (origenDeGastoRequest == null)
            {
                origenDeGastoResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El JSON OrigenDeGasto es obligatorio");
                return origenDeGastoResponse;
            }

            if (!Validaciones.ValidaCamposVacios(origenDeGastoRequest.Codigo))
            {
                origenDeGastoResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El Código es obligatorio");
                return origenDeGastoResponse;
            }

            if (!Validaciones.ValidaCamposVacios(origenDeGastoRequest.Nombre))
            {
                origenDeGastoResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El Nombre es obligatorio");
                return origenDeGastoResponse;
            }

            if (esModificacion)
            {
                OrigenDeGasto? origenDeGasto = await GetOrigenDeGasto(origenDeGastoRequest.IdOrigenDeGasto, Estados.Todos);
                if (origenDeGasto == null)
                {
                    origenDeGastoResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El OrigenDeGasto con el id: " + origenDeGastoRequest.IdOrigenDeGasto + " no fue encontrado");
                    return origenDeGastoResponse;
                }
            }

            List<OrigenDeGasto> origenDeGastos = await ListarOrigenDeGastosPorCodigoNombre(origenDeGastoRequest.IdOrigenDeGasto, origenDeGastoRequest.Codigo, origenDeGastoRequest.Nombre);

            if (origenDeGastos.Any())
            {
                origenDeGastoResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "Los datos del OrigenDeGasto ingresado ya existen");
                return origenDeGastoResponse;
            }

            return origenDeGastoResponse;
        }

        public async Task<List<OrigenDeGasto>> ListarOrigenDeGastosPorCodigoNombre(int id, string codigo, string nombre)
        {
            return await _origenDeGastoRepository.ListarOrigenDeGastosPorCodigoNombre(id, codigo, nombre);
        }

        //TODO: Count total para paginados
    }
}