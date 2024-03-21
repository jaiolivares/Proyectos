
$("#btnNuevo").on("click", function () {
    $("#modalNuevoBanco").modal({
        fadeDuration: 300,
        fadeDelay: 1,
        escapeClose: false,
        clickClose: false,
        showClose: true
    });
});

funCargarListadoBancos();

function funCargarListadoBancos() {

    var plantillaListadaBanco = document.getElementById("plantillaListadaBanco").innerHTML;
    var plantillaCompiladaListadaBanco = Handlebars.compile(plantillaListadaBanco);

    var promise = AppUtil.AjaxCall({
        Metodo: "GET",
        Url: "http://localhost:809/api/Banco/Listar?PaginaActual=1&RegistrosPorPagina=22&estados=2",
        Callback: function (result) {
            debugger;

            var newListadaBanco = plantillaCompiladaListadaBanco(result);
            $("#tbodyHbListaBanco").html(newListadaBanco);
        }

    });
    return promise;
}





//var list = [{ title: "My New Post", body: "This is my first post!", Codigo: "111", Nombre: "nombre uno", Activo: "1" }, { title: "My New Post", body: "This is my first post!", Codigo: "111", Nombre: "nombre uno", Activo: "1" }];


//var context = { title: "My New Post", body: "This is my first post!", Codigo: "111", Nombre: "nombre uno", Activo: "1" };
//var html = template(list);

//$("#trHbListaBanco").html(html);

// const settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://open-weather-map27.p.rapidapi.com/weather",
// 	"method": "GET",
// 	"headers": {
// 		"X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
// 		"X-RapidAPI-Host": "open-weather-map27.p.rapidapi.com"
// 	}
// };

// const settings = {
// 	"async": true,
// 	"url": "https://apis.digital.gob.cl/fl/feriados	",
// 	"method": "GET"
// };

// data: "{'idsEncriptado': '" + this.id.split('_')[1] + "'}",
//$.ajax({
//    type: "GET",
//    url: "https://randomuser.me/api/",
//    contentType: "application/json; charset=utf-8",
//    dataType: "json",
//    async: false,
//    beforeSend: () => {
//        $("#cargando").html("Loading...");
//    },
//    success: function (data) {
//        console.log(data);
//    },
//    error: function (xhr, ajaxOptions, thrownError) {
//        console.log(xhr.status);
//        console.log(thrownError);
//    },
//});