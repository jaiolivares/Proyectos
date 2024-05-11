//JOlivares: Proyecto - ConfiguraciónOneClick

//#region Helpers
var HelperLinea = function (varThis) {
    var retorno = "";

    if (varThis === 0)
        retorno = "b0top";

    return retorno;
};

var HelperFormatoFecha = function (fecha, opciones) {
    if (typeof fecha !== "string")
        fecha = fecha.toString();

    var format = "DD/MM/YYYY";

    var parseFormat = undefined;

    if (opciones.hash) {
        format = opciones.hash.format || "DD-MM-YYYY";
        parseFormat = opciones.hash.parseFormat;
    }

    if (typeof parseFormat !== "undefined")
        fecha = moment(fecha, parseFormat);
    else
        fecha = moment(fecha);

    var year = fecha.format("YYYY");
    if (year === "0000" || year === "1900" || year === "1752" || year === "1753" || year === "0001" || year === "1899")
        return "-";

    return fecha.format(format);
};

var HelperFormatoRut = function (rut) {
    var rutSinDv = rut.split("-")[0];
    return $.Rut.formatear(rutSinDv) + "-" + $.Rut.getDigito(new String(rutSinDv));
};

var HelperFuncionMatematica = function (tipoFuncion, objCantidad) {
    var decTotal = 0;

    var arrayCantidades = [];
    $.map(objCantidad.hash,
        function (value, index) {
            arrayCantidades.push([index, value]);
        });

    arrayCantidades.sort();

    $.each(arrayCantidades,
        function (key, value) {
            if (decTotal === 0) {
                decTotal = value[1];
                if (tipoFuncion === "%") {
                    if (arrayCantidades[0][1] === 0) {
                        decTotal = 0;
                    }
                }
            } else {
                switch (tipoFuncion) {
                    case "-":
                        decTotal = decTotal - value[1];
                        break;
                    case "+":
                        decTotal = decTotal + value[1];
                        break;
                    case "*":
                        decTotal = decTotal * value[1];
                        break;
                    case "/":
                        decTotal = decTotal / value[1];
                        break;
                    case "%":
                        if (value[1] === 0) {
                            decTotal = 0;
                        } else {
                            decTotal = decTotal / value[1] * 100;
                        }
                        break;
                }
            }
        });
    return decTotal;
};

var HelperRetornaNombreMes = function (idMes) {
    return arrayMeses[idMes - 1][1];
};

var HelperEstiloEstadoMantenedorUsuario = function (idEstadoUsuario) {
    var estilo = "";

    switch (idEstadoUsuario) {
        case 1:
            estilo = "label-info1";
            break;
        case 2:
            estilo = "label-warning";
            break;
        case 3:
            estilo = "label-default";
            break;
        case 4:
            estilo = "label-danger";
            break;
        case 5:
            estilo = "label-primary-conf";
            break;
    }

    return estilo;
};

var HelperEstadoMantenedorUsuario = function (idEstadoUsuario) {
    var estado = "";

    switch (idEstadoUsuario) {
        case 1:
            estado = "Pendiente";
            break;
        case 2:
            estado = "En proceso";
            break;
        case 3:
            estado = "Inactivo";
            break;
        case 4:
            estado = "Error";
            break;
        case 5:
            estado = "Con observaciones";
            break;
    }

    return estado;
};

var HelperFontAwesomeEstadoUsuario = function (idEstadoUsuario) {
    var tipoClaseFontAwesome = "";

    switch (idEstadoUsuario) {
        case 1:
            tipoClaseFontAwesome = "fal fa-hourglass-half";
            break;
        case 2:
            tipoClaseFontAwesome = "far fa-sync-alt fa-spin";
            break;
        case 3:
            tipoClaseFontAwesome = "far fa-user-slash";
            break;
        case 4:
            tipoClaseFontAwesome = "far fa-times";
            break;
        case 5:
            tipoClaseFontAwesome = "far fa-exclamation-triangle";
            break;
    }

    return tipoClaseFontAwesome;
};

var HelperSubstring = function (texto1, texto2, cantidadCaracteres) {
    var retorno;

    var puntos = (parseInt(texto1.length) + parseInt(texto2.length) > cantidadCaracteres);

    if (puntos) {
        retorno = texto1.substring(0, cantidadCaracteres) + "...";
    } else {
        retorno = texto1.substring(0, cantidadCaracteres);
    }

    return retorno;
};

var HelperTipoReplica = function (tipoReplica) {
    var nombreReplica = "";
    switch (tipoReplica) {
        case 1:
            nombreReplica = "Exacta";
            break;
        case 2:
            nombreReplica = "Personalizada";
            break;
    }
    return nombreReplica;
};

var HelperEliminarEspacios = function (variable) {
    return variable.replace(' ', '');
};

var HelperZeroIzquierda = function (numero, ancho) {
    var numberOutput = Math.abs(numero); /* Valor absoluto del número */
    var length = numero.toString().length; /* Largo del número */
    var zero = "0"; /* String de cero */

    if (ancho <= length) {
        if (numero < 0) {
            return ("-" + numberOutput.toString());
        } else {
            return numberOutput.toString();
        }
    } else {
        if (numero < 0) {
            return ("-" + (zero.repeat(ancho - length)) + numberOutput.toString());
        } else {
            return ((zero.repeat(ancho - length)) + numberOutput.toString());
        }
    }
};

var HelperSumarUno = function (index) {
    return index + 1;
};

var HelperEncriptacion = function (valor) {
    var valorEncriptado = btoa(valor);
    return valorEncriptado;
};

var HelperCheckInputs = function (booleano) {
    var retorno = "";

    if (booleano) {
        retorno = "Checked";
    }

    return retorno;
};

var HelperReemplazarLetraÑ = function (valor) {
    return valor.split("ñ").join("-n-").split("Ñ").join("-N-");
};

var HelperReemplazarTildes = function (valor) {
    var valorSinTilde = valor.split("á").join("-a-").split("é").join("-e-").split("í").join("-i-").split("ó").join("-o-").split("ú").join("-u-");
    valorSinTilde = valorSinTilde.split("Á").join("-A-").split("É").join("-E-").split("Í").join("-I-").split("Ó").join("-O-").split("Ú").join("-U-");
    return valorSinTilde;
};

var HelperEliminaTildes = function (valor) {
    var valorSinTilde = valor.split("á").join("a").split("é").join("e").split("í").join("i").split("ó").join("o").split("ú").join("u");
    valorSinTilde = valorSinTilde.split("Á").join("A").split("É").join("E").split("Í").join("I").split("Ó").join("O").split("Ú").join("U");
    return valorSinTilde;
};

var HelperFormatoNumeroATiempo = function (valor) {
    if (valor < 10) {
        return valor + " hr.";
    } else {
        return valor + " hrs.";
    }
}

var HelperFormatoMonedaChile = function (valor) {
    var n = new Number(valor);
    var myObj = {
        style: "currency",
        currency: "CLP"
    }

    return n.toLocaleString("es-CL", myObj);
}

var HelperFormatoRespuestaCorta = function (valor) {
    if (valor) {
        return "SI";
    } else {
        return "NO";
    }
}

var HelperRestaUno = function (varThis) {
    return varThis - 1;
};

var HelperSwitch = function (name, value, options) {
    this['_switch_value_' + name] = value;
    this['_switch_break_' + name] = false;
    var html = options.fn(this);
    delete this['_switch_break_' + name];
    delete this['_switch_value_' + name];
    return html;
};

var HelperCase = function (name, value, option) {
    var args = Array.prototype.slice.call(arguments);
    var options = args.pop();
    var caseValues = args;

    if (this['_switch_break_' + name] || caseValues.indexOf(this['_switch_value_' + name]) === -1) {
        return '';
    } else {
        this['_switch_break_' + name] = true;
        return options.fn(this);
    }
};

var HelperDefault = function (name, options) {
    if (!this['_switch_break_' + name]) {
        return options.fn(this);
    }
};

//#endregion