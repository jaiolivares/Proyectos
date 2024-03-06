<%@ Page Title="" Language="C#" MasterPageFile="~/Layout/Layout.Master" AutoEventWireup="true" CodeBehind="Bancos.aspx.cs" Inherits="GastosJo_Web.Bancos.Bancos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" type="text/css" media="screen" href="Bancos.css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <%--<div>--%>

        <input id="btnNuevo" class="buttonNuevo" type="button" title="Nuevo Banco" name="Nuevo" value="Nuevo" />
        
        <h1>Listado de bancos</h1>


        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Activo</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Banco Security<span>Security</span></td>
                    <td>
<div class="flipswitch">
	<input type="checkbox" name="flipswitch" class="flipswitch-cb" id="fs" checked />
	<label class="flipswitch-label" for="fs">
		<div class="flipswitch-inner"></div>
		<div class="flipswitch-switch"></div>
	</label>
</div>
                    </td>
                    <td>XXX</td>
                </tr>
                <tr>
                    <td>Banco Itau<span>Itau</span></td>
                    <td>Si | NO</td>
                    <td>XXX</td>
                </tr>
                <tr>
                    <td>Banco Ripley<span>Ripley</span></td>
                    <td>Si | NO</td>
                    <td>XXX</td>
                </tr>
            </tbody>
        </table>
        <label>Items por hoja</label>
        <select id="">
            <option value="valor1">valor1</option>
            <option value="valor2">valor2</option>
        </select>
        <label id="paginador"></label>

    <%--</div>--%>
    
</asp:Content>
