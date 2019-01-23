var procesos = [];

$(function(){
    $('#numero1').change(devolver(this.value));
    $('#numero2').change(devolver(this.value));
    $('#enviado').submit(function(event){
        event.preventDefault();
    })

});

function devolver(valorInputNumero){
        
    $.ajax({
        url:"servidor/numeros.php",
        method:'POST',
        data:{numero:valorInputNumero},
        type:"JSON",
        beforeSend:function(){
            $("#spinner").show();
            procesos.push(true);
        }
    })
      .done(function(respuesta){
          if(respuesta === '1'){
              alert('El numero es correcto');
          } else{
              alert('El numero incorrecto');
          }
          procesos.pop()
      })
      .fail(function(){
          alert("HA HABIDO UN ERROR EN LA PETICIÓN");
      })
      .always(function(){
          if(procesos.length===0){
          $("#spinner").hide();
        }
      })
}
