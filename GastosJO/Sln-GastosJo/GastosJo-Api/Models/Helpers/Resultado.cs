namespace GastosJo_Api.Models.Helpers
{
    public class Resultado
    {
        public Resultado ResultadoEjecucion { get; set; }
    }

    public class Resultado
    {
        public bool EjecucionCorrecta { get; set; } = true;
        public string MensajeEjecucion { get; set; } = string.Empty;
    }
}