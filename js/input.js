var procesos = [];

$(function(){
    $('#numero1').change(devolver);
    $('#numero2').change(devolver);

});

function devolver(){
        
    $.ajax({
        url:"servidor/numeros.php",
        method:'POST',
        data:{numero:this.value},
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