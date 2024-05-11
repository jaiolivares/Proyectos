$(".iconEye").on("click", function () {
    if ($("#txtPassword").prop("type") === "password") {
        $("#iconEyeMostrar").addClass("displayNone");
        $("#iconEyeOcultar").removeClass("displayNone");
        $("#txtPassword").attr("type", "text");
    } else {
        $("#iconEyeMostrar").removeClass("displayNone");
        $("#iconEyeOcultar").addClass("displayNone");
        $("#txtPassword").attr("type", "password");
    }
});

$("#btnAceptar").on("click", function () {
    location.href = "/Index";
});