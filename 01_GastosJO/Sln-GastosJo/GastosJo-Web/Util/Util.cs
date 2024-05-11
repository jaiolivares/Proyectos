using System;
using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;

namespace ICCorp.Configuracion.Clases.Negocio.Utiles
{
    public class Util
    {
        #region EncriptarDesencriptar

        public static string EncriptarCoc(string strCodificar)
        {
            try
            {
                byte[] data = Encoding.ASCII.GetBytes(strCodificar);
                string base64Encoded = Convert.ToBase64String(data);

                return base64Encoded;
            }
            catch
            {
                return "";
            }
        }

        public static string EncriptarIc(string strCodificar)
        {
            try
            {
                var strCodificarIc = IConstruye.MarketPlace.Base.Codificacion.Codificar(strCodificar);
                return strCodificarIc;
            }
            catch
            {
                return "";
            }
        }

        public static string DesencriptarCoc(string strDecodificar)
        {
            try
            {
                byte[] data = Convert.FromBase64String(strDecodificar);
                var base64Decoded = Encoding.ASCII.GetString(data);
                return base64Decoded;
            }
            catch
            {
                return "";
            }
        }

        public static string DesencriptarIc(string strDecodificar)
        {
            try
            {
                var strDecodificarIc = IConstruye.MarketPlace.Base.Codificacion.DeCodificar(strDecodificar);
                return strDecodificarIc;
            }
            catch
            {
                return "";
            }
        }

        #endregion EncriptarDesencriptar

        public static bool EsEmailValido(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;

            try
            {
                return Regex.IsMatch(email.Trim(),
                @"^(?("")("".+?(?<!\\)""@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))" +
                @"(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-0-9a-z]*[0-9a-z]*\.)+[a-z0-9][\-a-z0-9]{0,22}[a-z0-9]))$",
                RegexOptions.IgnoreCase);
            }
            catch (Exception)
            {
                return false;
            }
        }

        public static string ObtenerLetraParaCrearIdusuario(string palabra, int inicioIndice)
        {
            if (string.IsNullOrWhiteSpace(palabra))
                return string.Empty;

            if (inicioIndice >= palabra.Length)
                return string.Empty;

            return palabra.Substring(inicioIndice, 1);
        }

        public static string ObtenerLetraAleatoriaParaCrearIdusuario()
        {
            var letras = "abcdefghijklmnopqrstuvwxyz";
            var random = new Random();
            var num = random.Next(0, letras.Length - 1);

            return letras[num].ToString();
        }

        public static string EliminarTildes(string s)
        {
            var normalizedString = s.Normalize(NormalizationForm.FormD);
            var stringBuilder = new StringBuilder();

            foreach (var item in normalizedString)
            {
                var c = item;
                if (CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
                    stringBuilder.Append(c);
            }

            return stringBuilder.ToString();
        }
    }
}