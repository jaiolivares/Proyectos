using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace GastosJo_Web.Pages
{
    public class AccesoModel : PageModel
    {
        private readonly ILogger<AccesoModel> _logger;

        public AccesoModel(ILogger<AccesoModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}