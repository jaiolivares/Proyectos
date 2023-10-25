namespace GastosJo_Api.Models.Helpers
{
    public class Resultado
    {
        public ResultadoEjecucion ResultadoEjecucion { get; set; }
    }

    public class ResultadoEjecucion
    {
        public ResultadoModels ResultadoModels { get; set; }
    }

    public class ResultadoModels
    {
        public bool EjecucionCorrecta { get; set; } = true;
        public string MensajeEjecucion { get; set; } = string.Empty;
    }
}