<%@ Page Title="" Language="C#" MasterPageFile="~/Layout/Layout.Master" AutoEventWireup="true" CodeBehind="Bancos.aspx.cs" Inherits="GastosJo_Web.Bancos.Bancos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" type="text/css" media="screen" href="/Paginas/Bancos/Bancos.css" />
    <script defer src="/Paginas/Bancos/Bancos.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <input id="btnNuevo" class="buttonNuevo" type="button" title="Nuevo Banco" name="Nuevo" value="Nuevo" />

    <h1 class="h1TituloPrincipal">Listado de bancos</h1>

    <div class="divSpaceBetween">
        <div>
            <label>Items por página: </label>
            <select id="">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
            </select>
        </div>

        <div class="divTextboxConIconoDer">
            <svg xmlns="http://www.w3.org/2000/svg" class="svgIcon" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path></svg>
            <input class="textbox" type="text" name="buscar" placeholder="Escribe para buscar" maxlength="20" />
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Activo</th>
                <th>Opciones</th>
            </tr>
        </thead>
        <tbody id="tbodyHbListaBanco">
        </tbody>
    </table>

    <div class="divSpaceBetween">
        <label id="paginador1">1 de 50</label>
        <label id="paginador2"><< 1 - 2 - 3 - 4 >></label>
    </div>

    <div id="modalNuevoBanco" class="modal">
        <div class="modalNuevo">
            <h1>Agregar Banco</h1>

            <div class="divTextboxNormal">
                <label>Código</label>
                <input class="textbox" type="text" name="buscar" placeholder="Código" maxlength="20" />
            </div>

            <div class="divTextboxNormal">
                <label>Nombre</label>
                <input class="textbox" type="text" name="buscar" placeholder="Nombre" maxlength="60" />
            </div>

            <div>
                <label>Activo</label>
                <label class="switchOn">
                    <input type="checkbox">
                    <span class="slider"></span>
                </label>
            </div>

            <span id="mensajeError" class="mensajeError">E R R O R</span>

            <div>
                <a href="#" rel="modal:close">Cancelar</a>
                <input id="btnAceptar" class="buttonAceptar" type="button" title="Guardar Banco" name="Aceptar" value="Aceptar" />
            </div>

        </div>
    </div>

    #region plantillaListadaBanco
    <script id="plantillaListadaBanco" type="text/x-handlebars-template">
        {{#if this.length}}
            {{#each this}}
                <tr>
                    <td>{{nombre}}<span>{{codigo}}</span></td>
                    <td>
                        <label class="switchOff">
                            <input type="checkbox" disabled {{#if activo}} checked {{/if}}>
                            <span class="slider"></span>
                        </label>
                    </td>
                    <td>{{activo}}</td>
                </tr>
            {{/each}}
        {{else}}
            <tr>
                <td>No hay data</td>
            </tr>
        {{/if}}
    </script>
    #endregion plantillaListadaBanco


</asp:Content>
