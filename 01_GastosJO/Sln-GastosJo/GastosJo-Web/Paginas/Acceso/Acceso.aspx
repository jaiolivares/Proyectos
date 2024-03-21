<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Acceso.aspx.cs" Inherits="GastosJo_Web.Acceso.Acceso" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="Program" content="no-cache" />
    <meta http-equiv="Expires" content="-1" />
    <title>Inicio de sesión</title>
    <link rel="stylesheet" type="text/css" media="screen" href="/Paginas/Acceso/Acceso.css" />
</head>
<body>
    <form id="form1" runat="server">


        <div class="contenedor">

            <header>
                <p>HEADER</p>
            </header>

            <main>

                <h1 class="h1TituloPrincipal">Acceso a la APP</h1>

                <div class="divTextboxConIconoIzq">
                    <svg xmlns="http://www.w3.org/2000/svg" class="svgIcon" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                    </svg>
                    <input class="textbox" type="text" name="usuario" placeholder="Usuario" maxlength="20" autofocus="autofocus" />
                </div>

                <div class="divTextboxConIconoIzq">
                    <svg xmlns="http://www.w3.org/2000/svg" class="svgIcon" viewBox="0 0 16 16">
                        <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
                    </svg>
                    <input id="txtPassword" class="textbox" type="password" name="password" placeholder="Contraseña" maxlength="20" />
                    <svg id="iconEyeMostrar" xmlns="http://www.w3.org/2000/svg" class="svgIcon iconEye" viewBox="0 0 16 16">
                        <title>Mostrar contraseña</title>
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"></path>
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"></path>
                    </svg>
                    <svg id="iconEyeOcultar" xmlns="http://www.w3.org/2000/svg" class="svgIcon iconEye displayNone" viewBox="0 0 16 16">
                        <title>Ocultar contraseña</title>
                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"></path>
                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"></path>
                    </svg>
                </div>

                <span id="mensajeError" class="mensajeError">E R R O R</span>

                <input id="btnAceptar" class="buttonAceptar" type="button" title="Iniciar sesión" name="Aceptar" value="Aceptar" />

            </main>

            <footer>
                <p>FOOTER</p>
            </footer>

        </div>
    </form>
</body>
</html>

<p>&copy; <%: DateTime.Now.Year %> - Mi aplicación ASP.NET</p>

<script src="/JavaScript/jquery-4.0.0-beta.min.js"></script>
<script src="/Paginas/Acceso/Acceso.js"></script>