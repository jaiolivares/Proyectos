using GastosJo_Api.Models.Helpers;

namespace GastosJo_Api.Services.Helpers
{
    public class ResultadoEjecucion
    {
        public static Resultado InsertarErrorEjecucion(bool ejecucionCorrecta, string mensajeEjecucion)
        {
            var resultado = new Resultado();
            resultado.ResultadoEjecucion = new ResultadoEjecucion ResultadoEjecucion()
            {
                EjecucionCorrecta = ejecucionCorrecta,
                MensajeEjecucion = mensajeEjecucion
            }

            return new Resultado()
            {
                //EjecucionCorrecta = ejecucionCorrecta,
                //MensajeEjecucion = mensajeEjecucion
            };
        }
    }
}