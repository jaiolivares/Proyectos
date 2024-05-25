using GastosJo_Api.Interfaces.Service;
using GastosJo_Api.Models;
using GastosJo_Api.Models.Helpers;
using GastosJo_Api.Models.Login;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;

namespace GastosJo_Api.Services
{
    public class LoginService : ILoginService
    {
        private readonly IUsuarioService _usuarioService;
        private readonly AppSettings _appSettings;

        //TODO: implementar ILOGER private readonly ILogger _logger;

        public LoginService(IOptions<AppSettings> appSettings, IUsuarioService usuarioService)
        {
            _appSettings = appSettings.Value;
            _usuarioService = usuarioService;
        }

        public async Task<LoginResponse> Login(LoginRequest loginRequest)
        {
            LoginResponse loginResponse = new();

            Usuario usuario = await _usuarioService.GetUsuarioPorEmailPassword(loginRequest.CodigoUsuario, loginRequest.Password);

            if (usuario == null)
            {
                loginResponse.EjecucionCorrecta = false;
                loginResponse.MensajeEjecucion = "Usuario y/o contraseña incorrectos";
            }
            else
            {
                loginResponse.EjecucionCorrecta = true;
                loginResponse.CodigoUsuario = usuario.CodigoUsuario;
                loginResponse.Token = GetToken(usuario);

                if (string.IsNullOrWhiteSpace(loginResponse.Token))
                {
                    loginResponse.EjecucionCorrecta = false;
                    loginResponse.MensajeEjecucion = "Error al generar el Token";
                }
            }

            return loginResponse;
        }

        private string GetToken(Usuario usuario)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();

                var llaveJwt = Encoding.ASCII.GetBytes(_appSettings.SecretoJwt);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(

                        new Claim[]
                        {
                        new(ClaimTypes.NameIdentifier, usuario.CodigoUsuario),
                        new(ClaimTypes.Email, usuario.Email)
                        }
                    ),
                    Expires = DateTime.UtcNow.AddHours(_appSettings.ExpiredJwt),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(llaveJwt), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            catch
            {
                return "";
            }
        }
    }
}