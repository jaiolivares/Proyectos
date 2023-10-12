using GastosJo_Api.Data;
using GastosJo_Api.Interfaces;
using GastosJo_Api.Models;
using GastosJo_Api.Models.Enums;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Services.Helpers;
using Microsoft.EntityFrameworkCore;

namespace GastosJo_Api.Services
{
    public class BancoService : IBancoService
    {
        private readonly GastosJo_ApiContext _context;

        public BancoService(GastosJo_ApiContext context)
        {
            _context = context;
        }

        public async Task<IQueryable<Banco>> GetBancos(Paginado paginado, Estados estado)
        {
            int elementosParaOmitir = PaginacionQuery.ElementosParaOmitir(paginado);

            int estadoInactivo = estado == Estados.Todos ? 0 : 1;
            int estadoActivo = estado == Estados.Todos ? 1 : 0;

            bool[] estados = EstadosQuery.EstadosBusquedaEnTabla(estado);

            var bancos = await _context.Bancos
                .Where(x => estados.Contains(x.Activo))
                .Skip(elementosParaOmitir)
                .Take(paginado.RegistrosPorPagina)
                .OrderBy(x => x.Nombre)
                .ToListAsync();

            return bancos.AsQueryable();
        }

        public async Task<Banco?> GetBanco(int id)
        {
            Banco? banco = await _context.Bancos.FindAsync(id);

            return banco;
        }
    }
}