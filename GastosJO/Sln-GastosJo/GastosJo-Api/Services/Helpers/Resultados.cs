﻿namespace GastosJo_Api.Services.Helpers
{
    public class Resultados
    {
        public static Models.Helpers.Resultado InsertarEjecucionIncorrecta(bool ejecucionCorrecta, string mensajeEjecucion)
        {
            return new Models.Helpers.Resultado
            {
                EjecucionCorrecta = ejecucionCorrecta,
                MensajeEjecucion = mensajeEjecucion
            };
        }
    }
}