using GastosJo_Api.Data;
using GastosJo_Api.Interfaces.Repository;
using GastosJo_Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GastosJo_Api.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly GastosJo_ApiContext _context;

        public UsuarioRepository(GastosJo_ApiContext context)
        {
            _context = context;
        }

        public async Task<Usuario> GetUsuarioPorEmailPassword(string codigoUsuario, string password)
        {
            return await _context.Usuarios.Where(x => x.CodigoUsuario == codigoUsuario && x.Password == password && x.Activo).FirstOrDefaultAsync();
        }
    }
}