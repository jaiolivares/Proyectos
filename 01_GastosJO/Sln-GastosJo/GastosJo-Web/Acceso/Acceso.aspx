<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Acceso.aspx.cs" Inherits="GastosJo_Web.Acceso.Acceso" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Inicio de sesión</title>
    <link rel="stylesheet" type="text/css" media="screen" href="Acceso.css" />
</head>
<body>
    <form id="form1" runat="server">

        <header>
            <h1>HEADER</h1>
        </header>

        <div id="contenedorAcceso">
            
            <input type="text" name="usuario" placeholder="Usuario" autofocus="autofocus"/>

            <input type="password" name="password" placeholder="Contraseña" />

            <span id="mensajeError" class="mensajeError">E R R O R</span>

            <input type="button" title="Aceptar" name="Aceptar" value="Aceptar" />
        
        </div>
    </form>
</body>
</html>
