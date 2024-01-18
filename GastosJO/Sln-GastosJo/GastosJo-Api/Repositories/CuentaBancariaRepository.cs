using GastosJo_Api.Data;
using GastosJo_Api.Interfaces;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models;
using Microsoft.EntityFrameworkCore;
using GastosJo_Api.Models.Dto;

namespace GastosJo_Api.Repositories
{
    public class CuentaBancariaRepository : ICuentaBancariaRepository
    {
        private readonly GastosJo_ApiContext _context;

        public CuentaBancariaRepository(GastosJo_ApiContext context)
        {
            _context = context;
        }

        public async Task<List<CuentaBancariaDto>?> GetCuentasBancaria(Paginado paginado, int elementosParaOmitir, bool[] estados)
        {
            var queryCuentasBancaria = await (from cb in _context.CuentasBancaria
                                              join b in _context.Bancos on cb.IdBanco equals b.IdBanco
                                              join tc in _context.TiposDeCuenta on cb.IdTipoDeCuenta equals tc.IdTipoDeCuenta
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
                                              }).Where(x => estados.Contains(x.Activo))
                                             .Skip(elementosParaOmitir)
                                             .Take(paginado.RegistrosPorPagina)
                                             .OrderBy(x => x.Nombre)
                                             .ToListAsync();

            if (queryCuentasBancaria == null)
                return null;

            List<CuentaBancariaDto> lstCuentasBancariaDto = new();

            foreach (var item in queryCuentasBancaria)
            {
                CuentaBancariaDto cuentaBancariaDto = new()
                {
                    IdCuentaBancaria = item.IdCuentaBancaria,
                    IdBanco = item.IdBanco,
                    CodigoBanco = item.CodigoBanco,
                    NombreBanco = item.NombreBanco,
                    IdTipoDeCuenta = item.IdTipoDeCuenta,
                    CodigoTipoDeCuenta = item.CodigoTipoDeCuenta,
                    NombreTipoDeCuenta = item.NombreTipoDeCuenta,
                    Codigo = item.Codigo,
                    Nombre = item.Nombre,
                    Activo = item.Activo,
                    VerCuentasPorPagar = item.VerCuentasPorPagar
                };
                lstCuentasBancariaDto.Add(cuentaBancariaDto);
            }

            return lstCuentasBancariaDto;
        }

        public async Task<CuentaBancaria?> GetCuentaBancaria(int id)
        {
            return await _context.CuentasBancaria.FindAsync(id);
        }

        public async Task<CuentaBancariaDto?> GetCuentaBancaria(int id, bool[] estados)
        {
            var queryCuentaBancaria = await (from cb in _context.CuentasBancaria
                                             join b in _context.Bancos on cb.IdBanco equals b.IdBanco
                                             join tc in _context.TiposDeCuenta on cb.IdTipoDeCuenta equals tc.IdTipoDeCuenta
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
                                             }).Where(x => x.IdCuentaBancaria == id && estados.Contains(x.Activo))
                                             .FirstOrDefaultAsync();

            if (queryCuentaBancaria == null)
                return null;

            return new CuentaBancariaDto()
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

        public async Task<CuentaBancaria> AddCuentaBancaria(CuentaBancaria CuentaBancariaNuevo)
        {
            CuentaBancariaNuevo.IdCuentaBancaria = 0;
            CuentaBancariaNuevo.Nombre = CuentaBancariaNuevo.Nombre.Trim();
            CuentaBancariaNuevo.Codigo = CuentaBancariaNuevo.Codigo.Trim();

            _context.CuentasBancaria.Add(CuentaBancariaNuevo);
            await _context.SaveChangesAsync();

            return CuentaBancariaNuevo;
        }

        public async Task<CuentaBancaria> UpdateCuentaBancaria(CuentaBancaria CuentaBancariaActual, CuentaBancaria CuentaBancariaModificado)
        {
            CuentaBancariaActual.Codigo = CuentaBancariaModificado.Codigo.Trim();
            CuentaBancariaActual.Nombre = CuentaBancariaModificado.Nombre.Trim();
            CuentaBancariaActual.Activo = CuentaBancariaModificado.Activo;

            await _context.SaveChangesAsync();
            return CuentaBancariaModificado;
        }

        public async Task DeleteCuentaBancaria(CuentaBancaria CuentaBancariaActual)
        {
            _context.CuentasBancaria.Remove(CuentaBancariaActual);
            await _context.SaveChangesAsync();
        }

        public async Task<List<CuentaBancaria>> ListarCuentasBancariaPorCodigoNombre(int id, string codigo, string nombre)
        {
            return await _context.CuentasBancaria.Where(x => x.IdCuentaBancaria != id && (x.Codigo == codigo || x.Nombre == nombre)).ToListAsync();
        }
    }
}