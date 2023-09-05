using GastosJo_Api.Data;
using GastosJo_Api.Interfaces;
using GastosJo_Api.Models;
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

        public async Task<List<Banco>> GetBancos()
        {
            //if (_context.Bancos == null)
            //{
            //    return NotFound();
            //}
            return await _context.Bancos.ToListAsync();

            //return await new List<Banco>();
        }
    }
}