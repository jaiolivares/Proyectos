using AutoMapper;
using GastosJo_Api.Interfaces.Repository;
using GastosJo_Api.Interfaces.Service;
using GastosJo_Api.Models;
using GastosJo_Api.Models.Dto;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Services.Helpers;

namespace GastosJo_Api.Services
{
    public class EmpresaDeGastoService : IEmpresaDeGastoService
    {
        private readonly IEmpresaDeGastoRepository _empresaDeGastoRepository;
        private readonly IMapper _mapper;

        //TODO: implementar ILOGER private readonly ILogger _logger;
        public EmpresaDeGastoService(IEmpresaDeGastoRepository empresaDeGastoRepository, IMapper mapper)
        {
            _empresaDeGastoRepository = empresaDeGastoRepository;
            _mapper = mapper;
        }

        public async Task<EmpresaDeGasto?> GetEmpresaDeGasto(int id, Estados estado)
        {
            bool[] estados = EstadosQuery.EstadosBusquedaEnTabla(estado);

            return await _empresaDeGastoRepository.GetEmpresaDeGasto(id, estados);
        }

        public async Task<IQueryable<EmpresaDeGasto>> GetEmpresasDeGastos(Paginado paginado, Estados estado)
        {
            int elementosParaOmitir = PaginacionQuery.ElementosParaOmitir(paginado);

            bool[] estados = EstadosQuery.EstadosBusquedaEnTabla(estado);

            var empresaDeGastos = await _empresaDeGastoRepository.GetEmpresasDeGastos(paginado, elementosParaOmitir, estados);

            return empresaDeGastos.AsQueryable();
        }

        public async Task<EmpresaDeGastoResponse> AddEmpresaDeGasto(EmpresaDeGastoRequest empresaDeGastoRequest)
        {
            EmpresaDeGastoResponse empresaDeGastoResponse = await ValidacionDeEntrada(empresaDeGastoRequest, false);

            if (!empresaDeGastoResponse.Resultado.EjecucionCorrecta)
                return empresaDeGastoResponse;

            EmpresaDeGasto empresaDeGastoNuevo = _mapper.Map<EmpresaDeGasto>(empresaDeGastoRequest);

            empresaDeGastoNuevo = await _empresaDeGastoRepository.AddEmpresaDeGasto(empresaDeGastoNuevo);

            empresaDeGastoResponse = _mapper.Map<EmpresaDeGastoResponse>(empresaDeGastoNuevo);

            return empresaDeGastoResponse;
        }

        public async Task<EmpresaDeGastoResponse> UpdateEmpresaDeGasto(int id, EmpresaDeGastoRequest empresaDeGastoRequest)
        {
            empresaDeGastoRequest.IdEmpresaDeGasto = id;
            EmpresaDeGastoResponse empresaDeGastoResponse = await ValidacionDeEntrada(empresaDeGastoRequest, true);

            if (!empresaDeGastoResponse.Resultado.EjecucionCorrecta)
                return empresaDeGastoResponse;

            EmpresaDeGasto empresaDeGastoModificado = _mapper.Map<EmpresaDeGasto>(empresaDeGastoRequest);

            EmpresaDeGasto? empresaDeGastoActual = await GetEmpresaDeGasto(id, Estados.Todos);

            if (empresaDeGastoActual == null)
            {
                empresaDeGastoResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "La EmpresaDeGasto con el id: " + id + " no fue encontrada");
                return empresaDeGastoResponse;
            }

            empresaDeGastoActual = await _empresaDeGastoRepository.UpdateEmpresaDeGasto(empresaDeGastoActual, empresaDeGastoModificado);

            empresaDeGastoResponse = _mapper.Map<EmpresaDeGastoResponse>(empresaDeGastoActual);

            return empresaDeGastoResponse;
        }

        public async Task<EmpresaDeGastoResponse> DeleteEmpresaDeGasto(int id)
        {
            //TODO: Capturar error cuando se elimina con ForeignKey
            EmpresaDeGastoResponse empresaDeGastoResponse = new();

            var empresaDeGastoActual = await GetEmpresaDeGasto(id, Estados.Todos);

            if (empresaDeGastoActual == null)
            {
                empresaDeGastoResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "La EmpresaDeGasto con el id: " + id + " no fue encontrada");
                return empresaDeGastoResponse;
            }

            empresaDeGastoResponse = _mapper.Map<EmpresaDeGastoResponse>(empresaDeGastoActual);

            await _empresaDeGastoRepository.DeleteEmpresaDeGasto(empresaDeGastoActual);

            return empresaDeGastoResponse;
        }

        public async Task<EmpresaDeGastoResponse> ValidacionDeEntrada(EmpresaDeGastoRequest empresaDeGastoRequest, bool esModificacion)
        {
            EmpresaDeGastoResponse empresaDeGastoResponse = new();

            if (empresaDeGastoRequest == null)
            {
                empresaDeGastoResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El JSON EmpresaDeGasto es obligatorio");
                return empresaDeGastoResponse;
            }

            if (!Validaciones.ValidaCamposVacios(empresaDeGastoRequest.Codigo))
            {
                empresaDeGastoResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El Código es obligatorio");
                return empresaDeGastoResponse;
            }

            if (!Validaciones.ValidaCamposVacios(empresaDeGastoRequest.Nombre))
            {
                empresaDeGastoResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El Nombre es obligatorio");
                return empresaDeGastoResponse;
            }

            if (esModificacion)
            {
                EmpresaDeGasto? empresaDeGasto = await GetEmpresaDeGasto(empresaDeGastoRequest.IdEmpresaDeGasto, Estados.Todos);
                if (empresaDeGasto == null)
                {
                    empresaDeGastoResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "La EmpresaDeGasto con el id: " + empresaDeGastoRequest.IdEmpresaDeGasto + " no fue encontrada");
                    return empresaDeGastoResponse;
                }
            }

            List<EmpresaDeGasto> empresaDeGastos = await ListarEmpresaDeGastosPorCodigoNombre(empresaDeGastoRequest.IdEmpresaDeGasto, empresaDeGastoRequest.Codigo, empresaDeGastoRequest.Nombre);

            if (empresaDeGastos.Any())
            {
                empresaDeGastoResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "Los datos del EmpresaDeGasto ingresado ya existen");
                return empresaDeGastoResponse;
            }

            return empresaDeGastoResponse;
        }

        public async Task<List<EmpresaDeGasto>> ListarEmpresaDeGastosPorCodigoNombre(int id, string codigo, string nombre)
        {
            return await _empresaDeGastoRepository.ListarEmpresaDeGastosPorCodigoNombre(id, codigo, nombre);
        }

        //TODO: Count total para paginados
    }
}