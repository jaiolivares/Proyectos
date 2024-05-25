using GastosJo_Api.Interfaces.Repository;
using GastosJo_Api.Interfaces.Service;
using GastosJo_Api.Models;

namespace GastosJo_Api.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;

        //TODO: implementar ILOGER private readonly ILogger _logger;

        public UsuarioService(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public async Task<Usuario> GetUsuarioPorEmailPassword(string codigoUsuario, string password)
        {
            return await _usuarioRepository.GetUsuarioPorEmailPassword(codigoUsuario, password);
        }
    }
}