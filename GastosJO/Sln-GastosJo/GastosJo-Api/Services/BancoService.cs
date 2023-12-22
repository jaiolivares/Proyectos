using AutoMapper;
using GastosJo_Api.Interfaces;
using GastosJo_Api.Models;
using GastosJo_Api.Models.Data;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Services.Helpers;

namespace GastosJo_Api.Services
{
    public class BancoService : IBancoService
    {
        private readonly IMapper _mapper;
        private readonly IBancoRepository _bancoRepository;

        public BancoService(IMapper mapper, IBancoRepository bancoRepository)
        {
            _mapper = mapper;
            _bancoRepository = bancoRepository;
        }

        public async Task<IQueryable<Banco>> GetBancos(Paginado paginado, Estados estado)
        {
            int elementosParaOmitir = PaginacionQuery.ElementosParaOmitir(paginado);

            bool[] estados = EstadosQuery.EstadosBusquedaEnTabla(estado);

            var bancos = await _bancoRepository.GetBancos(paginado, elementosParaOmitir, estados);

            return bancos.AsQueryable();
        }

        public async Task<Banco?> GetBanco(int id)
        {
            return await _bancoRepository.GetBanco(id);
        }

        public async Task<BancoResponse> AddBanco(BancoRequest bancoRequest)
        {
            BancoResponse bancoResponse = await ValidacionDeEntrada(bancoRequest);

            if (!bancoResponse.Resultado.EjecucionCorrecta)
                return bancoResponse;

            Banco bancoNuevo = _mapper.Map<Banco>(bancoRequest.Banco);

            bancoNuevo = await _bancoRepository.AddBanco(bancoNuevo);

            bancoResponse.Banco = bancoNuevo;

            return bancoResponse;
        }

        public async Task<BancoResponse> UpdateBanco(int id, BancoRequest bancoRequest)
        {
            bancoRequest.Banco.IdBanco = id;
            BancoResponse bancoResponse = await ValidacionDeEntrada(bancoRequest);

            if (!bancoResponse.Resultado.EjecucionCorrecta)
                return bancoResponse;

            Banco bancoModificado = _mapper.Map<Banco>(bancoRequest.Banco);

            Banco? bancoActual = await GetBanco(id);

            if (bancoActual == null)
            {
                bancoResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El Banco con el id: " + id + " no fue encontrado");
                return bancoResponse;
            }

            bancoActual = await _bancoRepository.UpdateBanco(bancoActual, bancoModificado);

            bancoResponse.Banco = bancoActual;

            return bancoResponse;
        }

        public async Task<BancoResponse> DeleteBanco(int id)
        {
            BancoResponse bancoResponse = new();

            var bancoActual = await GetBanco(id);

            if (bancoActual == null)
            {
                bancoResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El Banco con el id: " + id + " no fue encontrado");
                return bancoResponse;
            }

            bancoResponse.Banco = bancoActual;

            await _bancoRepository.DeleteBanco(bancoActual);

            return bancoResponse;
        }

        public async Task<BancoResponse> ValidacionDeEntrada(BancoRequest bancoRequest)
        {
            BancoResponse bancoResponse = new();

            if (!Validaciones.ValidaCamposVacios(bancoRequest.Banco.Codigo))
            {
                bancoResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El Código es obligatorio");
                return bancoResponse;
            }

            if (!Validaciones.ValidaCamposVacios(bancoRequest.Banco.Nombre))
            {
                bancoResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El Nombre es obligatorio");
                return bancoResponse;
            }

            List<Banco> bancos = await ListarBancosPorCodigoNombre(bancoRequest.Banco.IdBanco, bancoRequest.Banco.Codigo, bancoRequest.Banco.Nombre);

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
    }
}