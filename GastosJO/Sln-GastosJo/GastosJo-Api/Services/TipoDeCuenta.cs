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

            var tiposDeCuenta = await _context.TiposDeCuenta
                .Where(x => estados.Contains(x.Activo))
                .Skip(elementosParaOmitir)
                .Take(paginado.RegistrosPorPagina)
                .OrderBy(x => x.Nombre)
                .ToListAsync();

            return tiposDeCuenta.AsQueryable();
        }

        public async Task<TipoDeCuenta> GetTipoDeCuenta(int id)
        {
            return await _context.TiposDeCuenta.FindAsync(id);
        }

        public async Task<TipoDeCuentaResponse> AddTipoDeCuenta(TipoDeCuentaRequest tipoDeCuentaRequest)
        {
            TipoDeCuentaResponse tipoDeCuentaResponse = ValidacionDeEntrada(tipoDeCuentaRequest);

            if (!tipoDeCuentaResponse.Resultado.EjecucionCorrecta)
                return tipoDeCuentaResponse;

            TipoDeCuenta tipoDeCuentaNuevo = _mapper.Map<TipoDeCuenta>(tipoDeCuentaRequest.TipoDeCuenta);

            tipoDeCuentaNuevo.IdTipoDeCuenta = 0;

            _context.TiposDeCuenta.Add(tipoDeCuentaNuevo);
            await _context.SaveChangesAsync();

            tipoDeCuentaResponse.TipoDeCuenta = tipoDeCuentaNuevo;

            return tipoDeCuentaResponse;
        }

        public async Task<TipoDeCuentaResponse> UpdateTipoDeCuenta(int id, TipoDeCuentaRequest tipoDeCuentaRequest)
        {
            TipoDeCuentaResponse tipoDeCuentaResponse = ValidacionDeEntrada(tipoDeCuentaRequest);

            if (!tipoDeCuentaResponse.Resultado.EjecucionCorrecta)
                return tipoDeCuentaResponse;

            TipoDeCuenta tipoDeCuentaModificado = _mapper.Map<TipoDeCuenta>(tipoDeCuentaRequest.TipoDeCuenta);

            TipoDeCuenta tipoDeCuentaActual = await GetTipoDeCuenta(id);

            if (tipoDeCuentaActual == null)
            {
                tipoDeCuentaResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El TipoDeCuenta con el id: " + id + " no fue encontrado");
                return tipoDeCuentaResponse;
            }

            tipoDeCuentaActual.Codigo = tipoDeCuentaModificado.Codigo;
            tipoDeCuentaActual.Nombre = tipoDeCuentaModificado.Nombre;
            tipoDeCuentaActual.Activo = tipoDeCuentaModificado.Activo;

            await _context.SaveChangesAsync();

            tipoDeCuentaResponse.TipoDeCuenta = tipoDeCuentaActual;

            return tipoDeCuentaResponse;
        }

        public async Task<TipoDeCuentaResponse> DeleteTipoDeCuenta(int id)
        {
            TipoDeCuentaResponse tipoDeCuentaResponse = new();

            var tipoDeCuentaActual = await GetTipoDeCuenta(id);

            if (tipoDeCuentaActual == null)
            {
                tipoDeCuentaResponse.Resultado = Resultados.InsertarEjecucionIncorrecta(false, "El TipoDeCuenta con el id: " + id + " no fue encontrado");
                return tipoDeCuentaResponse;
            }

            tipoDeCuentaResponse.TipoDeCuenta = tipoDeCuentaActual;

            _context.TiposDeCuenta.Remove(tipoDeCuentaActual);
            await _context.SaveChangesAsync();

            return tipoDeCuentaResponse;
        }

        public TipoDeCuentaResponse ValidacionDeEntrada(TipoDeCuentaRequest tipoDeCuentaRequest)
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

            return tipoDeCuentaResponse;
        }
    }
}