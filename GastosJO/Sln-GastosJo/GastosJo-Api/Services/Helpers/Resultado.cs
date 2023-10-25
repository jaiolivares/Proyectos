namespace GastosJo_Api.Services.Helpers
{
    public class Resultado
    {
        public static Models.Helpers.ResultadoEjecucion InsertarErrorEjecucion(bool ejecucionCorrecta, string mensajeEjecucion)
        {
            Models.Helpers.ResultadoEjecucion resultadoEjecucion = new();

            var resultadoModels = new Models.Helpers.ResultadoModels
            {
                EjecucionCorrecta = ejecucionCorrecta,
                MensajeEjecucion = mensajeEjecucion
            };

            resultadoEjecucion.ResultadoModels = resultadoModels;

            return resultadoEjecucion;
        }
    }
}