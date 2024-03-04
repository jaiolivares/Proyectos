<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Acceso.aspx.cs" Inherits="GastosJo_Web.Acceso.Acceso" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv:"Program" content="no-cache" />
    <meta http-equiv:"Expires" content="-1" />
    <title>Inicio de sesión</title>
    <link rel="stylesheet" type="text/css" media="screen" href="Acceso.css" />
</head>
<body>
    <form id="form1" runat="server">


        <div id="contenedor">
            
            <header>
                <p>HEADER</p>
            </header>
            
            <main>

                <div id="contenido">

                    <h1>Acceso a la APP</h1>

                    <div class="divTextbox">
                        <svg xmlns="http://www.w3.org/2000/svg" class="svg_icon" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                        </svg>
                        <input class="textbox" type="text" name="usuario" placeholder="Usuario" maxlength="20" autofocus="autofocus"/>
                    </div>

                    <div class="divTextbox">
                        <svg xmlns="http://www.w3.org/2000/svg" class="svg_icon bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
                        </svg>
                        <input class="textbox" type="password" name="password" placeholder="Contraseña" maxlength="20"/>
                    </div>
            
                    <span id="mensajeError" class="mensajeError">E R R O R</span>

                    <input type="button" title="Aceptar" name="Aceptar" value="Aceptar" />
                
                </div>
            
            </main>

            <footer>
                <h3>FOOTER</h3>
            </footer>

        </div>
    </form>
</body>
</html>

<%--<link rel="stylesheet" type="text/css" media="screen" href="Acceso.css?v=<%=VersionCache%>" />--%>