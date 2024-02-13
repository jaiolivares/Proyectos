using AutoMapper;
using GastosJo_Api.Interfaces;
using GastosJo_Api.Models;
using GastosJo_Api.Models.Dto;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Services.Helpers;

namespace GastosJo_Api.Services
{
    public class BancoService : IBancoService
    {
        private readonly IBancoRepository _bancoRepository;
        private readonly IMapper _mapper;

        //TODO: implementar ILOGER private readonly ILogger _logger;
        public BancoService(IBancoRepository bancoRepository, IMapper mapper)
        {
            _bancoRepository = bancoRepository;
            _mapper = mapper;
        }

        public async Task<Banco?> GetBanco(int id, Estados estado)
        {
            bool[] estados = EstadosQuery.EstadosBusquedaEnTabla(estado);

            return await _bancoRepository.GetBanco(id, estados);
        }

        public async Task<IQueryable<Banco>> GetBancos(Paginado paginado, Estados estado)
        {
            int elementosParaOmitir = PaginacionQuery.ElementosParaOmitir(paginado);

            bool[] estados = EstadosQuery.EstadosBusquedaEnTabla(estado);

            var bancos = await _bancoRepository.GetBancos(paginado, elementosParaOmitir, estados);

            return bancos.AsQueryable();
        }

        public async Task<BancoResponse> AddBanco(BancoRequest bancoRequest)
        {
            BancoResponse bancoResponse = await ValidacionDeEntrada(bancoRequest, false);

            if (!bancoResponse.Resultado.EjecucionCorrecta)
                return bancoResponse;

            Banco bancoNuevo = _mapper.Map<Banco>(bancoRequest);

            bancoNuevo = await _bancoRepository.AddBanco(bancoNuevo);

            bancoResponse = _mapper.Map<BancoResponse>(bancoNuevo);

            return bancoResponse;
        }

        public async Task<BancoResponse> UpdateBanco(int id, BancoRequest bancoRequest)
        {
            bancoRequest.IdBanco = id;
            BancoResponse bancoResponse = await ValidacionDeEntrada(bancoRequest, true);

            if (!bancoResponse.Resultado.EjecucionCorrecta)
                return bancoResponse;

            Banco bancoModificado = _mapper.Map<Banco>(bancoRequest);

            Banco? bancoActual = await GetBanco(id, Estados.Todos);

            if (bancoActual == null)
            {
                bancoResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El Banco con el id: " + id + " no fue encontrado");
                return bancoResponse;
            }

            bancoActual = await _bancoRepository.UpdateBanco(bancoActual, bancoModificado);

            bancoResponse = _mapper.Map<BancoResponse>(bancoActual);

            return bancoResponse;
        }

        public async Task<BancoResponse> DeleteBanco(int id)
        {
            //TODO: Capturar error cuando se elimina con ForeignKey
            BancoResponse bancoResponse = new();

            var bancoActual = await GetBanco(id, Estados.Todos);

            if (bancoActual == null)
            {
                bancoResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El Banco con el id: " + id + " no fue encontrado");
                return bancoResponse;
            }

            bancoResponse = _mapper.Map<BancoResponse>(bancoActual);

            await _bancoRepository.DeleteBanco(bancoActual);

            return bancoResponse;
        }

        public async Task<BancoResponse> ValidacionDeEntrada(BancoRequest bancoRequest, bool esModificacion)
        {
            BancoResponse bancoResponse = new();

            if (bancoRequest == null)
            {
                bancoResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El JSON Banco es obligatorio");
                return bancoResponse;
            }

            if (!Validaciones.ValidaCamposVacios(bancoRequest.Codigo))
            {
                bancoResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El Código es obligatorio");
                return bancoResponse;
            }

            if (!Validaciones.ValidaCamposVacios(bancoRequest.Nombre))
            {
                bancoResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El Nombre es obligatorio");
                return bancoResponse;
            }

            if (esModificacion)
            {
                Banco? banco = await GetBanco(bancoRequest.IdBanco, Estados.Todos);
                if (banco == null)
                {
                    bancoResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El Banco con el id: " + bancoRequest.IdBanco + " no fue encontrado");
                    return bancoResponse;
                }
            }

            List<Banco> bancos = await ListarBancosPorCodigoNombre(bancoRequest.IdBanco, bancoRequest.Codigo, bancoRequest.Nombre);

            if (bancos.Any())
            {
                bancoResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "Los datos del Banco ingresado ya existen");
                return bancoResponse;
            }

            return bancoResponse;
        }

        public async Task<List<Banco>> ListarBancosPorCodigoNombre(int id, string codigo, string nombre)
        {
            return await _bancoRepository.ListarBancosPorCodigoNombre(id, codigo, nombre);
        }

        //TODO: Count total para paginados
    }
}