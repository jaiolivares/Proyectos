using GastosJo_Api.Models.Enums;

namespace GastosJo_Api.Services.Helpers
{
    public class EstadosQuery
    {
        public static bool[] EstadosBusquedaEnTabla(Estados estado)
        {
            bool[] estados;

            switch (estado)
            {
                case Estados.Inactivo:
                    estados = new bool[] { false };
                    break;

                case Estados.Activo:
                    estados = new bool[] { true };
                    break;

                case Estados.Todos:
                    estados = new bool[] { false, true };
                    break;

                default:
                    estados = new bool[] { };
                    break;
            }

            return estados;
        }
    }
}