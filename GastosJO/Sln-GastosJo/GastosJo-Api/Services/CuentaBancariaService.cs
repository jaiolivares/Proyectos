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
    public class CuentaBancariaService : ICuentaBancariaService
    {
        private readonly GastosJo_ApiContext _context;
        private readonly IMapper _mapper;

        //TODO: implementar ILOGER private readonly ILogger _logger;

        public CuentaBancariaService(IMapper mapper, GastosJo_ApiContext context)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IQueryable<CuentaBancaria>> GetCuentasBancaria(Paginado paginado, Estados estado)
        {
            //TODO: devolver nombre de PK FOREING KEYS
            int elementosParaOmitir = PaginacionQuery.ElementosParaOmitir(paginado);

            bool[] estados = EstadosQuery.EstadosBusquedaEnTabla(estado);

            var cuentasBancaria = await _context.CuentasBancaria
                .Where(x => estados.Contains(x.Activo))
                .Skip(elementosParaOmitir)
                .Take(paginado.RegistrosPorPagina)
                .OrderBy(x => x.Nombre)
                .ToListAsync();

            return cuentasBancaria.AsQueryable();
        }

        public async Task<CuentaBancaria> GetCuentaBancaria(int id)
        {
            var queryCuentaBancaria = await (from cb in _context.CuentasBancaria
                                             join b in _context.Bancos on cb.IdBanco equals b.IdBanco
                                             join tc in _context.TiposDeCuenta on cb.IdTipoDeCuenta equals tc.IdTipoDeCuenta
                                             where cb.IdCuentaBancaria == id
                                             select new
                                             {
                                                 cb.IdCuentaBancaria,
                                                 cb.IdBanco,
                                                 CodigoBanco = b.Codigo,
                                                 NombreBanco = b.Nombre,
                                                 cb.IdTipoDeCuenta,
                                                 CodigoTipoDeCuenta = tc.Codigo,
                                                 NombreTipoDeCuenta = tc.Nombre,
                                                 cb.Codigo,
                                                 cb.Nombre,
                                                 cb.Activo,
                                                 cb.VerCuentasPorPagar
                                             }).FirstOrDefaultAsync();

            if (queryCuentaBancaria == null)
                return null;

            return new CuentaBancaria()
            {
                IdCuentaBancaria = queryCuentaBancaria.IdCuentaBancaria,
                IdBanco = queryCuentaBancaria.IdBanco,
                CodigoBanco = queryCuentaBancaria.CodigoBanco,
                NombreBanco = queryCuentaBancaria.NombreBanco,
                IdTipoDeCuenta = queryCuentaBancaria.IdTipoDeCuenta,
                CodigoTipoDeCuenta = queryCuentaBancaria.CodigoTipoDeCuenta,
                NombreTipoDeCuenta = queryCuentaBancaria.NombreTipoDeCuenta,
                Codigo = queryCuentaBancaria.Codigo,
                Nombre = queryCuentaBancaria.Nombre,
                Activo = queryCuentaBancaria.Activo,
                VerCuentasPorPagar = queryCuentaBancaria.VerCuentasPorPagar
            };
        }

        public async Task<CuentaBancariaResponse> AddCuentaBancaria(CuentaBancariaRequest cuentaBancariaRequest)
        {
            CuentaBancariaResponse cuentaBancariaResponse = new();

            if (string.IsNullOrEmpty(cuentaBancariaRequest.CuentaBancaria.Codigo) || cuentaBancariaRequest.CuentaBancaria.Codigo.Trim() == "string")
            {
                cuentaBancariaResponse.Resultado = Helpers.Resultados.InsertarEjecucionIncorrecta(false, "El Código es obligatorio");
                return cuentaBancariaResponse;
            }

            if (string.IsNullOrEmpty(cuentaBancariaRequest.CuentaBancaria.Nombre) || cuentaBancariaRequest.CuentaBancaria.Nombre.Trim() == "string")
            {
                cuentaBancariaResponse.Resultado = Helpers.Resultados.InsertarEjecucionIncorrecta(false, "El Nombre es obligatorio");
                return cuentaBancariaResponse;
            }

            CuentaBancaria cuentaBancariaNueva = _mapper.Map<CuentaBancaria>(cuentaBancariaRequest.CuentaBancaria);

            cuentaBancariaNueva.IdCuentaBancaria = 0;

            _context.CuentasBancaria.Add(cuentaBancariaNueva);
            await _context.SaveChangesAsync();

            cuentaBancariaResponse.CuentaBancaria = cuentaBancariaNueva;

            return cuentaBancariaResponse;
        }

        public async Task<CuentaBancariaResponse> UpdateCuentaBancaria(int id, CuentaBancariaRequest cuentaBancariaRequest)
        {
            CuentaBancariaResponse cuentaBancariaResponse = new();

            CuentaBancaria cuentaBancariaModificada = _mapper.Map<CuentaBancaria>(cuentaBancariaRequest.CuentaBancaria);

            CuentaBancaria cuentaBancariaActual = await GetCuentaBancaria(id);

            if (cuentaBancariaActual == null)
            {
                cuentaBancariaResponse.Resultado = Helpers.Resultados.InsertarEjecucionIncorrecta(false, "La CuentaBancaria con el id: " + id + " no fue encontrada");
                return cuentaBancariaResponse;
            }

            cuentaBancariaActual.Codigo = cuentaBancariaModificada.Codigo;
            cuentaBancariaActual.Nombre = cuentaBancariaModificada.Nombre;
            cuentaBancariaActual.Activo = cuentaBancariaModificada.Activo;
            cuentaBancariaActual.VerCuentasPorPagar = cuentaBancariaModificada.VerCuentasPorPagar;

            await _context.SaveChangesAsync();

            cuentaBancariaResponse.CuentaBancaria = cuentaBancariaActual;

            return cuentaBancariaResponse;
        }

        public async Task<CuentaBancariaResponse> DeleteCuentaBancaria(int id)
        {
            CuentaBancariaResponse cuentaBancariaResponse = new();

            var cuentaBancariaActual = await GetCuentaBancaria(id);

            if (cuentaBancariaActual == null)
            {
                cuentaBancariaResponse.Resultado = Helpers.Resultados.InsertarEjecucionIncorrecta(false, "La CuentaBancaria con el id: " + id + " no fue encontrada");
                return cuentaBancariaResponse;
            }

            cuentaBancariaResponse.CuentaBancaria = cuentaBancariaActual;

            _context.CuentasBancaria.Remove(cuentaBancariaActual);
            await _context.SaveChangesAsync();

            return cuentaBancariaResponse;
        }
    }
}