// Variables para mostrar elementos en pantalla
var botonEditar = document.getElementById("btnEditarDatos");
var botonGuardar = document.getElementById("btnGuardarDatos");
var datosGuardados = document.getElementById("datosGuardados");
var usuario = localStorage.getItem('usuarioName');
var avatarEnPantalla = document.getElementById ("avatarEnPantalla");
var usuarioEnPantalla = document.getElementById("usuarioNombreDatos");
var datosEnPantalla = document.getElementById("div-boton-editar");
var avatar = localStorage.getItem('avatarNum');

// Variables de datos
var datosStorage = localStorage.getItem('datosStorage');
var datosStorageParse = JSON.parse(datosStorage);



// Función que muestra los diferentes avatares
function mostrarAvatar(){
    let htmlContentToAppend = "";
    htmlContentToAppend += `
        <button class="avatar avatar-${avatar}" onclick="cambiarAvatar()"></button>
    `
    avatarEnPantalla.innerHTML = htmlContentToAppend;
}
function cambiarAvatar(){
    avatar=Math.floor(Math.random()*6+1);
    localStorage.setItem('avatarNum', avatar)
    mostrarAvatar();
}
// Función que muestra el nombre de usuario como h1

function mostrarNombreUsuario(){
    let htmlContentToAppend = "";
    htmlContentToAppend += `
    ${usuario}
    `
    usuarioEnPantalla.innerHTML = htmlContentToAppend;
};

// Función que guarda los datos de usuario
function guardarDatos(){
    var nombre = document.getElementById("firstname").value;
    var apellido = document.getElementById("lastname").value;
    var edad = document.getElementById("age").value;
    var email = document.getElementById("email").value;
    var prefix = document.getElementById("phonePrefix").value;
    var phone = document.getElementById("phoneNumber").value;
    var datosAlStorage =  {'nombre': nombre, 'apellido': apellido, 'edad': edad, 'email': email, 'telefono': prefix + phone};
    localStorage.setItem ('datosStorage',JSON.stringify(datosAlStorage));
    location.reload();
};

// Función que muestra los datos guardados

function mostrarDatos(){
    let htmlContentToAppend = "";
    if (datosStorageParse){
        htmlContentToAppend += `
        <p>Nombres: ${datosStorageParse.nombre}</p>
        <p>Apellidos: ${datosStorageParse.apellido}</p>
        <p>Edad: ${datosStorageParse.edad}</p>
        <p>E-mail: ${datosStorageParse.email}</p>
        <p>Teléfono: ${datosStorageParse.telefono}</p>
        <button id="btnEditarDatos"class="btn btn-primary" onclick="editarDatos()">Editar datos ✎</button><br>
        `}else{
    htmlContentToAppend += `
    <p>Nombres: ?</p>
    <p>Apellidos: ?</p>
    <p>Edad: ?</p>
    <p>E-mail: ?</p>
    <p>Teléfono: ?</p>
    <button id="btnEditarDatos"class="btn btn-primary" onclick="editarDatos()">Editar datos ✎</button><br>
    `}
    datosGuardados.innerHTML = htmlContentToAppend;
};

// Botón editar
function editarDatos(){
    
    // Agrega el formulario

    let htmlContentToAppend1 = "";
    htmlContentToAppend1 += `
    <input type="text" class="text-center" name="firstname" id="firstname" size="36" placeholder="Nombres"><br><br>
    <input type="text" class="text-center" name="lastname" id="lastname" size="36" placeholder="Apellidos"><br><br>
    <input type="number" class="text-center" name="age" id="age" min="16" max="130" placeholder="Edad"><br><br>
    <input type="email" class="text-center" name="email" id="email" size="36" placeholder="E-mail"><br><br>
    <input type="text" class="text-center" size="5" maxlength="4" id="phonePrefix" placeholder="Prefijo"><input type="text" class="text-center" id="phoneNumber" placeholder="Número de teléfono"><br><br><br>
    
    <button id="btnGuardarDatos"class="btn btn-primary" onclick="guardarDatos()">Guardar</button><br>
    `
    datosGuardados.innerHTML = htmlContentToAppend1;


}


document.addEventListener("DOMContentLoaded", function (e) {
    mostrarAvatar();
    mostrarNombreUsuario();
    mostrarDatos();

});