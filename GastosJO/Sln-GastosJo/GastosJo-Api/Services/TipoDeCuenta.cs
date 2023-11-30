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
    public class TipoDeCuentaService : ITipoDeCuentaService
    {
        private readonly GastosJo_ApiContext _context;
        private readonly IMapper _mapper;

        public TipoDeCuentaService(IMapper mapper, GastosJo_ApiContext context)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IQueryable<TipoDeCuenta>> GetTiposDeCuenta(Paginado paginado, Estados estado)
        {
            int elementosParaOmitir = PaginacionQuery.ElementosParaOmitir(paginado);

            bool[] estados = EstadosQuery.EstadosBusquedaEnTabla(estado);

            var bancos = await _context.TiposDeCuenta
                .Where(x => estados.Contains(x.Activo))
                .Skip(elementosParaOmitir)
                .Take(paginado.RegistrosPorPagina)
                .OrderBy(x => x.Nombre)
                .ToListAsync();

            return bancos.AsQueryable();
        }

        public async Task<TipoDeCuenta> GetTipoDeCuenta(int id)
        {
            return await _context.TiposDeCuenta.FindAsync(id);
        }

        public async Task<TipoDeCuentaResponse> AddTipoDeCuenta(TipoDeCuentaRequest bancoRequest)
        {
            TipoDeCuentaResponse bancoResponse = new();

            if (string.IsNullOrEmpty(bancoRequest.TipoDeCuenta.Codigo) || bancoRequest.TipoDeCuenta.Codigo.Trim() == "string")
            {
                bancoResponse.Resultado = Helpers.Resultado.InsertarEjecucionIncorrecta(false, "El Código es obligatorio");
                return bancoResponse;
            }

            if (string.IsNullOrEmpty(bancoRequest.TipoDeCuenta.Nombre) || bancoRequest.TipoDeCuenta.Nombre.Trim() == "string")
            {
                bancoResponse.Resultado = Helpers.Resultado.InsertarEjecucionIncorrecta(false, "El Nombre es obligatorio");
                return bancoResponse;
            }

            TipoDeCuenta bancoNuevo = _mapper.Map<TipoDeCuenta>(bancoRequest.TipoDeCuenta);

            bancoNuevo.IdTipoDeCuenta = 0;

            _context.TiposDeCuenta.Add(bancoNuevo);
            await _context.SaveChangesAsync();

            bancoResponse.TipoDeCuenta = bancoNuevo;

            return bancoResponse;
        }

        public async Task<TipoDeCuentaResponse> UpdateTipoDeCuenta(int id, TipoDeCuentaRequest bancoRequest)
        {
            TipoDeCuentaResponse bancoResponse = new();

            TipoDeCuenta bancoModificado = _mapper.Map<TipoDeCuenta>(bancoRequest.TipoDeCuenta);

            TipoDeCuenta bancoActual = await GetTipoDeCuenta(id);

            if (bancoActual == null)
            {
                bancoResponse.Resultado = Helpers.Resultado.InsertarEjecucionIncorrecta(false, "El TipoDeCuenta con el id: " + id + " no fue encontrado");
                return bancoResponse;
            }

            bancoActual.Codigo = bancoModificado.Codigo;
            bancoActual.Nombre = bancoModificado.Nombre;
            bancoActual.Activo = bancoModificado.Activo;

            await _context.SaveChangesAsync();

            bancoResponse.TipoDeCuenta = bancoActual;

            return bancoResponse;
        }

        public async Task<TipoDeCuentaResponse> DeleteTipoDeCuenta(int id)
        {
            TipoDeCuentaResponse bancoResponse = new();

            var bancoActual = await GetTipoDeCuenta(id);

            if (bancoActual == null)
            {
                bancoResponse.Resultado = Helpers.Resultado.InsertarEjecucionIncorrecta(false, "El TipoDeCuenta con el id: " + id + " no fue encontrado");
                return bancoResponse;
            }

            bancoResponse.TipoDeCuenta = bancoActual;

            _context.TiposDeCuenta.Remove(bancoActual);
            await _context.SaveChangesAsync();

            return bancoResponse;
        }
    }
}