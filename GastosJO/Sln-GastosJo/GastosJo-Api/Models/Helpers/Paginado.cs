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
                _paginaActual = value == 0 ? 1 : Math.Abs(value);
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
                _registrosPorPagina = Math.Abs(value);
            }
        }
    }
}