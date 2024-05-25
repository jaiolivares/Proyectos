using Microsoft.AspNetCore.Mvc;
using GastosJo_Api.Models;
using GastosJo_Api.Models.Login;
using GastosJo_Api.Interfaces.Service;

namespace GastosJo_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;

        public LoginController(ILoginService loginService)
        {
            _loginService = loginService;
        }

        [HttpGet]
        public async Task<ActionResult<LoginResponse>> GetLogin(LoginRequest loginRequest)
        {
            try
            {
                var login = await _loginService.Login(loginRequest);

                if (!login.EjecucionCorrecta)
                    return StatusCode(StatusCodes.Status400BadRequest, login);

                return StatusCode(StatusCodes.Status200OK, login);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error TryCatch: " + ex);
            }
        }
    }
}