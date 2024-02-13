namespace GastosJo_Api.Services.Helpers
{
    public class Validaciones
    {
        public static bool ValidaCamposVacios(string valorCampo)
        {
            try
            {
                var numero = Convert.ToInt64(valorCampo);

                if (numero == 0)
                    return false;
            }
            catch (Exception)
            {
                if (string.IsNullOrEmpty(valorCampo) || valorCampo.Trim() == "string")
                    return false;
            }

            return true;
        }
    }
}