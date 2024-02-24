<%@ Page Title="" Language="C#" MasterPageFile="~/Layout/Layout.Master" AutoEventWireup="true" CodeBehind="Bancos.aspx.cs" Inherits="GastosJo_Web.Bancos.Bancos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div>

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
                    <td>aaa</td>
                    <td>bbb</td>
                    <td>ccc</td>
                </tr>
                <tr>
                    <td>aaa</td>
                    <td>bbb</td>
                    <td>ccc</td>
                </tr>
            </tbody>
        </table>
        <label>Filas por hoja</label>
        <select id="">
            <option value="valor1"></option>
            <option value="valor2"></option>
        </select>
        <label id="paginador"></label>

    </div>
    
</asp:Content>
