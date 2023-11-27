using AutoMapper;
using GastosJo_Api.Data;
using GastosJo_Api.Interfaces;
using GastosJo_Api.Models;
using GastosJo_Api.Models.Data;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Services.Helpers;
using Microsoft.EntityFrameworkCore;

namespace GastosJo_Api.Services
{
    public class BancoService : IBancoService
    {
        private readonly GastosJo_ApiContext _context;
        private readonly IMapper _mapper;

        public BancoService(IMapper mapper, GastosJo_ApiContext context)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IQueryable<Banco>> GetBancos(Paginado paginado, Estados estado)
        {
            int elementosParaOmitir = PaginacionQuery.ElementosParaOmitir(paginado);

            bool[] estados = EstadosQuery.EstadosBusquedaEnTabla(estado);

            var bancos = await _context.Bancos
                .Where(x => estados.Contains(x.Activo))
                .Skip(elementosParaOmitir)
                .Take(paginado.RegistrosPorPagina)
                .OrderBy(x => x.Nombre)
                .ToListAsync();

            return bancos.AsQueryable();
        }

        public async Task<Banco> GetBanco(int id)
        {
            return await _context.Bancos.FindAsync(id);
        }

        public async Task<BancoResponse> AddBanco(BancoRequest bancoRequest)
        {
            BancoResponse bancoResponse = new();

            if (string.IsNullOrEmpty(bancoRequest.Banco.Codigo) || bancoRequest.Banco.Codigo.Trim() == "string")
            {
                bancoResponse.Resultado = Helpers.Resultado.InsertarEjecucionIncorrecta(false, "El Código es obligatorio");
                return bancoResponse;
            }

            if (string.IsNullOrEmpty(bancoRequest.Banco.Nombre) || bancoRequest.Banco.Nombre.Trim() == "string")
            {
                bancoResponse.Resultado = Helpers.Resultado.InsertarEjecucionIncorrecta(false, "El Nombre es obligatorio");
                return bancoResponse;
            }

            Banco bancoNuevo = _mapper.Map<Banco>(bancoRequest.Banco);

            bancoNuevo.IdBanco = 0;

            _context.Bancos.Add(bancoNuevo);
            await _context.SaveChangesAsync();

            bancoResponse.Banco = bancoNuevo;

            return bancoResponse;
        }

        public async Task<BancoResponse> UpdateBanco(int id, BancoRequest bancoRequest)
        {
            BancoResponse bancoResponse = new();

            Banco bancoModificado = _mapper.Map<Banco>(bancoRequest.Banco);

            Banco bancoActual = await GetBanco(id);

            if (bancoActual == null)
            {
                bancoResponse.Resultado = Helpers.Resultado.InsertarEjecucionIncorrecta(false, "El Banco con el id: " + id + " no fue encontrado");
                return bancoResponse;
            }

            bancoActual.Codigo = bancoModificado.Codigo;
            bancoActual.Nombre = bancoModificado.Nombre;
            bancoActual.Activo = bancoModificado.Activo;

            await _context.SaveChangesAsync();

            bancoResponse.Banco = bancoActual;

            return bancoResponse;
        }

        public async Task<BancoResponse> DeleteBanco(int id)
        {
            BancoResponse bancoResponse = new();

            var bancoActual = await GetBanco(id);

            if (bancoActual == null)
            {
                bancoResponse.Resultado = Helpers.Resultado.InsertarEjecucionIncorrecta(false, "El Banco con el id: " + id + " no fue encontrado");
                return bancoResponse;
            }

            bancoResponse.Banco = bancoActual;

            _context.Bancos.Remove(bancoActual);
            await _context.SaveChangesAsync();

            return bancoResponse;
        }
    }
}