var Apps, AppUtil;

$(function () {
    Apps = new funApps();
});

function funApps() {

    var _AjaxCall = function (Opciones) {

        Opciones = Opciones || {};
        var promise;
        if (Opciones.Url == undefined || Opciones.Url === "") {
            //console.error("Falta la [Url] de la llamada.");
            //$(Loader).hide();
            return promise;
        }
        var Headers = Opciones.Headers || {};
        Headers.Authorization = Opciones.Authorization ? Opciones.Authorization : "";

        var _BeforeSend = function () {
            //$(Loader).show();
        };

        var _Success = function (result) {
            console.log(result);
        };

        var _Error = function (excepcion) {
            if (excepcion.status === 0) return;
            console.log(excepcion);
        };

        var _Always = function () {
            //$(Loader).hide();
        };

        //$(Loader).show();
        promise = $.ajax({
            type: Opciones.Metodo || "GET",
            url: Opciones.Url || "",
            data: Opciones.ParametrosAjax || "{}",
            datatype: Opciones.TipoDatos || "json",
            contentType: Opciones.TipoContenido || "application/json; charset=utf-8",
            crossDomain: Opciones.CORS && Opciones.CORS === true ? true : false,
            cache: false,
            traditional: Opciones.Tradicional && Opciones.Tradicional === true ? true : false,
            headers: Headers,
            async: Opciones.Async && Opciones.Async === true ? true : false,
            beforeSend: _BeforeSend,
            success: Opciones.Callback || _Success,
            error: _Error,
            processData: Opciones.ProcessData ?? true
        });

        promise.always(_AjaxCall);

        return promise;
    };

    //var _AjaxCall = function (Opciones) {
    //    Opciones = Opciones || {};
    //    var promise;
    //    if (Opciones.Url == undefined || Opciones.Url === "") {
    //        //console.error("Falta la [Url] de la llamada.");
    //        $(Loader).hide();
    //        return promise;
    //    }
    //    var Headers = Opciones.Headers || {};
    //    Headers.Authorization = Opciones.Authorization ? Opciones.Authorization : "";

    //    var _BeforeSend = function () {
    //        $(Loader).show();
    //    };

    //    var _Success = function (result) {
    //        console.log(result);
    //    };

    //    var _Error = function (excepcion) {
    //        if (excepcion.status === 0) return;
    //        console.log(excepcion);
    //    };

    //    var _Always = function () {
    //        $(Loader).hide();
    //    };

    //    $(Loader).show();
    //    promise = $.ajax({
    //        async: Opciones.Async && Opciones.Async === true ? true : false,
    //        beforeSend: _BeforeSend,
    //        contentType: Opciones.TipoContenido || "application/json; charset=utf-8",
    //        crossDomain: Opciones.CORS && Opciones.CORS === true ? true : false,
    //        cache: false,
    //        data: Opciones.ParametrosAjax || "{}",
    //        datatype: Opciones.TipoDatos || "json",
    //        error: _Error,
    //        type: Opciones.Metodo || "GET",
    //        headers: Headers,
    //        processData: Opciones.ProcessData ?? true,
    //        success: Opciones.Callback || _Success,
    //        traditional: Opciones.Tradicional && Opciones.Tradicional === true ? true : false,
    //        url: Opciones.Url || ""
    //    });

    //    promise.always(_AjaxCall);

    //    return promise;
    //};

    this.AjaxCall = _AjaxCall;
}


AppUtil = new funApps();
//AppUtil.AjaxCall({ /* opciones para la llamada Ajax */ });



////#region funBusquedaRapidaHistorialRtm
//$(document).on("keyup", "#txtBusquedaRapidaHistorialRtm", function () {
//    var _texto = $(this).val().toLowerCase();
//    $("#dataTableHistorialRtm > tbody > tr").filter(function () {
//        $(this).toggle($(this).text().toLowerCase().indexOf(_texto) > -1);
//    });
//});
////#endregion funBusquedaRapidaHistorialRtm

