//Console.WriteLine("Hello, World!");

using BoletasDownload.Modelo;
using BoletasDownload.Paginas;
using Microsoft.Extensions.Configuration;

public class Program
{
    private static void Main()
    {
        List<Pagina> paginas = CargarAppSettings();

        //Entel.EjecutarEntel(paginas.FirstOrDefault(x => x.IdPagina == "entel"));
        Movistar.EjecutarMovistar(paginas.FirstOrDefault(x => x.IdPagina == "movistar"));
    }

    private static List<Pagina> CargarAppSettings()
    {
        List<Pagina> paginas = [];

        IConfigurationRoot configuration = new ConfigurationBuilder().AddJsonFile("appsettingsPass.json").Build();

        var paginasSeccion = configuration.GetSection("paginas");

        paginas.Add(new Pagina()
        {
            IdPagina = "entel",
            Url = paginasSeccion["entel:url"],
            Telefono = paginasSeccion["entel:telefono"],
            Rut = paginasSeccion["entel:rut"],
            Clave = paginasSeccion["entel:clave"],
        });
        paginas.Add(new Pagina()
        {
            IdPagina = "movistar",
            Url = paginasSeccion["movistar:url"],
            Rut = paginasSeccion["entel:rut"],
            Clave = paginasSeccion["movistar:clave"],
        });

        return paginas;
    }
}