<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.Master" AutoEventWireup="true" CodeBehind="ErrorSitio.aspx.cs" Inherits="ICCorp.Configuracion.Web.ConfiguracionOneClick.Comunes.ErrorSitio.ErrorSitio" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="panel panel-default m20top col-xs-4">
        <div class="panel-body">
            <h3>Error no controlado</h3>
            <p>Se ha producido un error en el sistema, favor vuelva a intentar y/o comuníquese con Soporte al +562 2486 1111</p>
            <p>configuraciononeclick@iconstruye.com</p>
            <a onclick="funVolverErr();" class="btn btn-link btn-previous">Volver</a>
        </div>
    </div>

    <script src="js/ErrorSitio.js"></script>
</asp:Content>