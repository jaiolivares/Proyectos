using GastosJo_Api.Models.Login;

namespace GastosJo_Api.Interfaces.Service
{
    public interface ILoginService
    {
        Task<LoginResponse> Login(LoginRequest loginRequest);
    }
}