//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
});


function nombreUsuario(){
var usuario = document.getElementById('username').value;
localStorage.setItem ('usuarioName', usuario);
};