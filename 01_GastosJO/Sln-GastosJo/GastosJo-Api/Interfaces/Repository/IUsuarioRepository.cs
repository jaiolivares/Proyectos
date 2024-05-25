using GastosJo_Api.Models;

namespace GastosJo_Api.Interfaces.Repository
{
    public interface IUsuarioRepository
    {
        Task<Usuario> GetUsuarioPorEmailPassword(string codigoUsuario, string password);
    }
}