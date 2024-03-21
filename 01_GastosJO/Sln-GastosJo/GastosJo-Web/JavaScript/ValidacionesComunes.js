
function ValidarDigitoVerificador(rut) {
    var M = 0, S = 1;
    for (; rut; rut = Math.floor(rut / 10))
        S = (S + rut % 10 * (9 - M++ % 6)) % 11;

    return S ? S - 1 : 'k';
}

function ValidacionRut(rutCompleto) {
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
        return false;

    var tmp = rutCompleto.split('-');
    var digv = tmp[1];
    var rut = tmp[0];
    if (digv === 'K') digv = 'k';

    return (ValidarDigitoVerificador(rut) == digv);
}

function ValidarSoloLetras(texto) {
    if (!/^[ a-záéíóúüñ]*$/i.test(texto)) {
        texto = texto.replace(/[^ a-záéíóúüñ]+/ig, "");
    }
    return texto;
}

function ValidarLetrasYNumeros(texto) {
    if (!/^[A-ZÁÉÍÓÚÑa-záéíóúüñ0-9\s]*$/i.test(texto)) {
        texto = texto.replace(/[^A-ZÁÉÍÓÚÑa-záéíóúüñ0-9\s]+/ig, "");
    }
    return texto;
}

function EsFormatoCorrectoFono(fono) {
    if (!/^([+])+([0-9]{2})+([-])+([0-9]{1,2})+([-])+([0-9]{6,8})+/i.test(fono)) {
        return false;
    }
    return true;
}

function ValidarNumerosYGuion(texto) {
    if (!/^[0-9\+\-]*$/i.test(texto)) {
        texto = texto.replace(/[^0-9\+\-]+/ig, "");
    }
    return texto;
}

function EsFormatoCorrectoEmail(campoEmail) {
    var strEmail = campoEmail.trim();
    if (strEmail !== "") {
        //if (/^[a-zA-Z0-9\.\-\_]+@[a-zA-Z0-9\.\-\_]+\.[a-zA-Z0-9]*[a-zA-Z0-9]$/.test(strEmail)) {
        if (/^[-\w.%+]{2,63}@(?:[A-Z0-9-]{2,63}\.){1,125}[A-Z]{2,63}$/i.test(strEmail)) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

function ValidarSoloNumeros(texto) {
    if (!/^[0-9]*$/i.test(texto)) {
        texto = texto.replace(/[^0-9]+/ig, "");
    }
    return texto;
}

//#region funValidaTextVaciosLargos
function funValidaTextVaciosLargos(nombreTxt, lblError = "", largoMinimo = 0, largoMaximo = 0) {
    var esValido = true;

    valorTxt = $("#" + nombreTxt).val().trim();

    if (esValido) {
        if (valorTxt === "") {
            esValido = false;
            if (lblError !== "") {
                $("#" + lblError).removeClass("hidden");
            }
        } else {
            if (lblError !== "") {
                $("#" + lblError).addClass("hidden");
            }
        }
    }

    if (esValido) {
        if (largoMinimo > 0) {
            if (valorTxt.length < largoMinimo) {
                esValido = false;
                if (lblError !== "") {
                    $("#" + lblError).removeClass("hidden");
                }
            } else {
                if (lblError !== "") {
                    $("#" + lblError).addClass("hidden");
                }
            }
        }
    }

    if (esValido) {
        if (largoMaximo > 0) {
            if (valorTxt.length > largoMaximo) {
                esValido = false;
                if (lblError !== "") {
                    $("#" + lblError).removeClass("hidden");
                }
            } else {
                if (lblError !== "") {
                    $("#" + lblError).addClass("hidden");
                }
            }
        }
    }

    return esValido;
}
//#endregion funValidaTextVaciosLargos

//#region funValidaSoloLetrasNumeros
function funValidaSoloLetrasNumeros(e) {
    var regex = new RegExp("^[A-ZÁÉÍÓÚÑa-záéíóúüñ0-9\s]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str) || str === " ") {
        return true;
    }
    e.preventDefault();
    return false;
}
//#endregion funValidaSoloLetrasNumeros