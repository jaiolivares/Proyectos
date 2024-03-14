<%@ Page Title="" Language="C#" MasterPageFile="~/Layout/Layout.Master" AutoEventWireup="true" CodeBehind="Bancos.aspx.cs" Inherits="GastosJo_Web.Bancos.Bancos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" type="text/css" media="screen" href="Bancos.css" />



    <!-- Remember to include jQuery :) -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>

    <!-- jQuery Modal -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />


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
        <tbody>
            <tr>
                <td>Banco Security<span>Security</span></td>
                <td>
                    <label class="switchOff">
                        <input type="checkbox" disabled>
                        <span class="slider"></span>
                    </label>
                </td>
                <td>XXX</td>
            </tr>
            <tr>
                <td>Banco Itau<span>Itau</span></td>
                <td>
                    <label class="switchOff">
                        <input type="checkbox" disabled>
                        <span class="slider"></span>
                    </label>
                </td>
                <td>XXX</td>
            </tr>
            <tr>
                <td>Banco Ripley<span>Ripley</span></td>
                <td>
                    <label class="switchOff">
                        <input type="checkbox" disabled>
                        <span class="slider"></span>
                    </label>
                </td>
                <td>XXX</td>
            </tr>
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


    <%--<p><a href="#ex1" rel="modal:open">Open Modal</a></p>--%>


    <%--<a href="#login-form" rel="modal:open">Login</a>--%>

    <%--    
    <a href="#login-form">Login</a>


<div id="login-form" class="modal">
  ...
</div>--%>


    <%--<a href="#ex5" data-modal>Open a DOM element</a>
<a href="ajax.html" data-modal>Open an AJAX modal</a>--%>


    <%--</div>--%>



    <script src="Bancos.js"></script>



</asp:Content>
