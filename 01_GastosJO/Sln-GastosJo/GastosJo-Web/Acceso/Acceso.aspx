<%@ Page Title="" Language="C#" MasterPageFile="~/Layout.Master" AutoEventWireup="true" CodeBehind="Acceso.aspx.cs" Inherits="GastosJo_Web.Acceso.Acceso" %>
<%--<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>--%>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div>
        <h1>Acceso a la APP</h1>

        <label>Usuario</label>
        <input type="text" name="usuario" placeholder="Usuario"/>

        <label>Contraseña</label>
        <input type="password" name="password" placeholder="Contraseña" />

        <span id="mensajeError" class="mensajeError"></span>

        <input type="button" title="Aceptar" name="Aceptar" />

    </div>

</asp:Content>
