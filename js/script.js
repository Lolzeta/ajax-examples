function objetoXHR(){
    if (window.XMLHttpRequest){// El navegador implementa la interfaz XHR de forma nativa
        return new XMLHttpRequest();
    }else if (window.ActiveXObject){ // El navegador no implementa la interfaz XHR de forma nativa
                                     // Por ejemplo: Internet explorer.
        var versionesIE = new Array('MsXML2.XMLHTTP.5.0', 'MsXML2.XMLHTTP.4.0',
            'MsXML2.XMLHTTP.3.0', 'MsXML2.XMLHTTP', 'Microsoft.XMLHTTP');
        for (var i = 0; i < versionesIE.length; i++){
            try{
                /* Se intenta crear el objeto en Internet Explorer comenzando
                en la versión más moderna del objeto hasta la primera versión.
                En el momento que se consiga crear el objeto, saldrá del bucle
                devolviendo el nuevo objeto creado. */

                return new ActiveXObject(versionesIE[i]);
            } catch (errorControlado) {}//Capturamos el error,
        }
    }
    /* Si llegamos aquí es porque el navegador no posee ninguna forma de crear el objeto.
     Emitimos un mensaje de error usando el objeto Error.
     Más información sobre gestión de errores en:
     HTTP://www.javascriptkit.com/javatutors/trycatch2.sHTML
     */
    throw new Error("No se pudo crear el objeto XMLHTTPRequest");
}

document.addEventListener('DOMContentLoaded', function(){
    let boton = document.getElementById('botonSincrono');
    boton.addEventListener('click',function(){
        xhr = new objetoXHR();
        xhr.open('GET','servidor/datos2.php?edad=21', false);
        xhr.send(null);
        let respuesta = xhr.responseText;
        let div = document.getElementById('resultadoSincrono');
        div.appendChild(document.createTextNode(respuesta));
    });

    let botonAs = document.getElementById('botonAsincrono');
    botonAs.addEventListener('click',function(){
        xhr = new objetoXHR();
        xhr.open('GET','servidor/datos2.php?edad=2000',true);
        xhr.onreadystatechange = comprobarEstadoPeticion('resultadoAsincrono');
        xhr.send(null);
    });

    let botonAsPOST = document.getElementById('botonPOST');
    botonAsPOST.addEventListener('click',function(){
        xhr = new objetoXHR();
        xhr.open('POST', 'servidor/datosPOST2.php');
        xhr.onreadystatechange = comprobarEstadoPeticion('resultadoAsincronoPOST');
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send('edad=20');
    })

})

function ejecutarFuncionAjax(tipoRespuesta,funcion){
    return function() {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = "";
            switch(tipoRespuesta){
                case "XML":
                    respuesta = this.responseXML;
                    break;
                default :
                    respuesta = this.responseText;
                    break;
            }
            funcion(respuesta);

            alert("Termino la petición de AJAX");
            document.getElementById("spinner").style ="display:none";
        }
    }
}

function comprobarEstadoPeticion(div){
return function(){
    switch(this.readyState){
// Evaluamos el estado de la petición AJAX
// Vamos mostrando el valor actual de readyState en cada llamada.
        case 0: document.getElementById('estado').innerHTML += "0 - Sin iniciar.<br/>";
            break;
        case 1: document.getElementById('estado').innerHTML += "1 - Cargando.<br/>";
            break;
        case 2: document.getElementById('estado').innerHTML += "2 - Cargado.<br/>";
            break;
        case 3: document.getElementById('estado').innerHTML += "3 - Interactivo.<br/>";
            break;
        case 4:
            document.getElementById('estado').innerHTML += "4 - Completado.";
            if (this.status == 200){
            // Si el servidor ha devuelto un OK
            // Escribimos la respuesta recibida de la petición AJAX en el objeto DIV
            funcionCallback(div,this.responseText);  
            }
            break;
        }
    }
}

function funcionCallback(div,respuesta){
    let divisor = document.getElementById(div);
    divisor.appendChild(document.createTextNode(respuesta));
}