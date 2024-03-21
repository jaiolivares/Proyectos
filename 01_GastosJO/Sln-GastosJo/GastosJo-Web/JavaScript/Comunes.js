//JOlivares: Proyecto - ConfiguracionOneClick

var varCantidadPorFilas = parseInt(25);
var varPaginaActual = parseInt(1);
var varPaginaActualHistorial = parseInt(1);
var varTotalRegistros = parseInt(0);
var varTotalRegistrosHistorial = parseInt(0);

//#region ::::: Paginado :::::

//#region funPaginadorCoc
function funPaginadorCoc() {
    if (varTotalRegistros === 0) {
        $("#lblPaginado").text("0 - 0 de 0");
        funOcultaBtnAvanzarPaginaCoc(true);
        funOcultaBtnRetrocederPaginaCoc(true);
    } else {
        var paginadoHasta = varPaginaActual * varCantidadPorFilas;
        var paginadoDesde = paginadoHasta - varCantidadPorFilas + 1;

        if (paginadoHasta > varTotalRegistros)
            paginadoHasta = varTotalRegistros;

        $("#lblPaginado").text(paginadoDesde + " - " + paginadoHasta + " de " + varTotalRegistros);

        var cantidadTotalHojas = Math.ceil(varTotalRegistros / varCantidadPorFilas);

        if (varPaginaActual === cantidadTotalHojas)
            funOcultaBtnAvanzarPaginaCoc(true);
        else
            funOcultaBtnAvanzarPaginaCoc(false);

        if (varPaginaActual > 1)
            funOcultaBtnRetrocederPaginaCoc(false);

        if (varPaginaActual === 1)
            funOcultaBtnRetrocederPaginaCoc(true);
    }
}
//#endregion

//#region funOcultaBtnAvanzarPaginaCoc
function funOcultaBtnAvanzarPaginaCoc(bolOculta) {
    if (bolOculta)
        $("#cajabtnAvanzarPagina").addClass("disabled");
    else
        $("#cajabtnAvanzarPagina").removeClass("disabled");
}
//#endregion

//#region funOcultaBtnRetrocederPaginaCoc
function funOcultaBtnRetrocederPaginaCoc(bolOculta) {
    if (bolOculta)
        $("#cajabtnRetrocederPagina").addClass("disabled");
    else
        $("#cajabtnRetrocederPagina").removeClass("disabled");
}
//#endregion

//#region funRetrocederPaginaCoc
function funRetrocederPaginaCoc(strFuncionalidad) {
    if (varPaginaActual > 1) {
        varPaginaActual = varPaginaActual - 1;
        var funcion = strFuncionalidad + "()";
        eval(funcion);
    }
}
//#endregion

//#region funAvanzarPaginaCoc
function funAvanzarPaginaCoc(strFuncionalidad) {
    var cantidadTotalHojas = Math.ceil(varTotalRegistros / varCantidadPorFilas);
    if (varPaginaActual < cantidadTotalHojas) {
        varPaginaActual = varPaginaActual + 1;
        var funcion = strFuncionalidad + "()";
        eval(funcion);
    }
}
//#endregion

//#endregion

//#region ::::: PaginadorHistorial :::::

//#region funPaginadorHistorialCoc
function funPaginadorHistorialCoc() {
    if (varTotalRegistrosHistorial === 0) {
        $("#lblPaginadoHistorial").text("0 - 0 de 0");
        funOcultaBtnAvanzarPaginaHistorialCoc(true);
        funOcultaBtnRetrocederPaginaHistorialCoc(true);
    } else {
        var paginadoHistorialHasta = varPaginaActualHistorial * varCantidadPorFilas;
        var paginadoHistorialDesde = paginadoHistorialHasta - varCantidadPorFilas + 1;

        if (paginadoHistorialHasta > varTotalRegistrosHistorial)
            paginadoHistorialHasta = varTotalRegistrosHistorial;

        $("#lblPaginadoHistorial").text(paginadoHistorialDesde + " - " + paginadoHistorialHasta + " de " + varTotalRegistrosHistorial);

        var cantidadTotalHojas = Math.ceil(varTotalRegistrosHistorial / varCantidadPorFilas);

        if (varPaginaActualHistorial === cantidadTotalHojas)
            funOcultaBtnAvanzarPaginaHistorialCoc(true);
        else
            funOcultaBtnAvanzarPaginaHistorialCoc(false);

        if (varPaginaActualHistorial > 1)
            funOcultaBtnRetrocederPaginaHistorialCoc(false);

        if (varPaginaActualHistorial === 1)
            funOcultaBtnRetrocederPaginaHistorialCoc(true);
    }
}
//#endregion

//#region funOcultaBtnAvanzarPaginaHistorialCoc
function funOcultaBtnAvanzarPaginaHistorialCoc(bolOculta) {
    if (bolOculta)
        $("#cajabtnAvanzarPaginaHistorial").addClass("disabled");
    else
        $("#cajabtnAvanzarPaginaHistorial").removeClass("disabled");
}
//#endregion

//#region funOcultaBtnRetrocederPaginaHistorialCoc
function funOcultaBtnRetrocederPaginaHistorialCoc(bolOculta) {
    if (bolOculta)
        $("#cajabtnRetrocederPaginaHistorial").addClass("disabled");
    else
        $("#cajabtnRetrocederPaginaHistorial").removeClass("disabled");
}
//#endregion

//#region funRetrocederPaginaHistorialCoc
function funRetrocederPaginaHistorialCoc(strFuncionalidad) {
    if (varPaginaActualHistorial > 1) {
        varPaginaActualHistorial = varPaginaActualHistorial - 1;
        var funcion = strFuncionalidad + "()";
        eval(funcion);
    }
}
//#endregion

//#region funAvanzarPaginaHistorialCoc
function funAvanzarPaginaHistorialCoc(strFuncionalidad) {
    var cantidadTotalHojas = Math.ceil(varTotalRegistrosHistorial / varCantidadPorFilas);
    if (varPaginaActualHistorial < cantidadTotalHojas) {
        varPaginaActualHistorial = varPaginaActualHistorial + 1;
        var funcion = strFuncionalidad + "()";
        eval(funcion);
    }
}
//#endregion

//#endregion

//#region funModalMensajeSistemaCoc
function funModalMensajeSistemaCoc(strMensaje, strTitulo = "") {
    if (strTitulo === "") {
        $("#lblTituloMensajeModal").html("Mensaje de Sistema");
    } else {
        $("#lblTituloMensajeModal").html(strTitulo);
    }
    $("#lblMensajeModal").html(strMensaje);
    $("#divMensajeSistema").modal({ show: true });
}
//#endregion funModalMensajeSistemaCoc

//#region funNotificacionLateralCoc
function funNotificacionLateralCoc(titulo, mensaje) {
    $.notify({
        title: '<h2>' + titulo + '</h2>',
        message: mensaje
    },
        {
            template: '<div data-notify="container" class="col-xs-11 col-sm-4 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>',
            type: "notification",
            animate: {
                enter: 'animated fadeInRight',
                exit: 'animated fadeOutRight'
            }
        });
}
//#endregion funNotificacionLateralCoc

//#region funAlertasAutoOcultasCoc
function funAlertasAutoOcultasCoc(titulo, mensaje, divAlerta) {
    $("#" + divAlerta).removeClass("hidden");

    $("#" + divAlerta).animate({
        height: '+=120px'
    }, 300);

    $('<div class="alert alert-warning m20bottom">' +
        '<button type="button" class="close" data-dismiss="alert">' +
        '&times;</button>' + '<div class="row">' +
        '<div class="col-xs-1 text-center m20top">' +
        '<i class="fal fa-exclamation-circle fa-3x"></i>' +
        '</div>' +
        '<div class="col-xs-11 m0top">' +
        '<p class="f24"><strong>' + titulo + '</strong></p>' +
        '<p class="f16">' + mensaje + '</p>' +
        '</div>' +
        '</div>' + '</div>').hide().appendTo('#' + divAlerta).fadeIn(1000);

    $(".alert").delay(5000).fadeOut(
        "normal",
        function () {
            $(this).remove();
            $("#" + divAlerta).addClass("hidden");
        });

    $("#" + divAlerta).delay(6000).animate({
        height: '-=120px'
    }, 300);
}
//#endregion funAlertasAutoOcultasCoc

//#region funLimpiarSessionStorage
function funLimpiarSessionStorage() {
    //#region COPIAR USUARIO EXISTENTE
    if (sessionStorage.getItem("COC_ListaUsuariosCopiasNuevos"))
        sessionStorage.removeItem("COC_ListaUsuariosCopiasNuevos");

    if (sessionStorage.getItem("COC_CentrosDeGestionSeleccionados"))
        sessionStorage.removeItem("COC_CentrosDeGestionSeleccionados");

    if (sessionStorage.getItem("COC_InfoUsuarioOrigen"))
        sessionStorage.removeItem("COC_InfoUsuarioOrigen");
    //#endregion

    //#region REEMPLAZO DEFINITIVO USUARIO EXISTENTE
    if (sessionStorage.getItem("COC_InfoUsuarioReemplazoNuevo"))
        sessionStorage.removeItem("COC_InfoUsuarioReemplazoNuevo");

    if (sessionStorage.getItem("COC_InfoUsuarioReemplazado"))
        sessionStorage.removeItem("COC_InfoUsuarioReemplazado");

    if (sessionStorage.getItem("COC_Reemplazo_TodosCentrosDeGestion"))
        sessionStorage.removeItem("COC_Reemplazo_TodosCentrosDeGestion");
    //#endregion

    //#region REEMPLAZO TEMPORAL USUARIO EXISTENTE
    if (sessionStorage.getItem("COC_InfoUsuarioReemplazoTemporal"))
        sessionStorage.removeItem("COC_InfoUsuarioReemplazoTemporal");
    //#endregion
}
//#endregion