$(function(){
    $('#botonEjemplo').click(function(){
        
        $.ajax({
            url:"servidor/datosJSON.php",
            method:'GET',
            type:"JSON",
            beforeSend:function(){
                $("#spinner").show();
            }
        })
          .done(function(datosRespuesta){
              for (const objeto of datosRespuesta) {
                  $('#resultado').append(
                      `<div>${objeto.nombre}        |       ${objeto.genero}</div>`
                  )
              }
          })
          .fail(function(){
              alert("HA HABIDO UN ERROR EN LA PETICIÓN");
          })
          .always(function(){
              $("#spinner").hide();
          })
          
    })

});