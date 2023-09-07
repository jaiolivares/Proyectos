namespace GastosJo_Api.Models.Helpers
{
    public class Paginado
    {
        private int _paginaActual;

        public int PaginaActual
        {
            get
            {
                return _paginaActual;
            }
            set
            {
                _paginaActual = value == 0 ? 1 : value < 0 ? value * -1 : value;
            }
        }

        private int _registrosPorPagina;

        public int RegistrosPorPagina
        {
            get
            {
                return _registrosPorPagina;
            }
            set
            {
                _registrosPorPagina = value < 0 ? value * -1 : value;
            }
        }
    }
}