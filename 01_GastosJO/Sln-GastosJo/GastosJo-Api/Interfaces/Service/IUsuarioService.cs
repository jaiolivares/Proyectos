using GastosJo_Api.Models;

namespace GastosJo_Api.Interfaces.Service
{
    public interface IUsuarioService
    {
        Task<Usuario> GetUsuarioPorEmailPassword(string codigoUsuario, string password);
    }
}