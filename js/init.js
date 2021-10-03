const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var usuario = localStorage.getItem('usuarioName');

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

// LOGIN
let isLogged = (usuario === "null") ? false : true;


// Función que cuando no se está loggeado manda al login

function goToLogin() {
  if (!isLogged && window.location.pathname !== '/login.html') {
    window.location.replace("/login.html");
  }
  if (isLogged && window.location.pathname === '/login.html') {
    window.location.replace("/index.html");
  }
}

// Función que asigna null a la variable usuario
function logOut(){
  localStorage.setItem ('usuarioName', null);
  window.location.replace("/login.html");
}

// Función que guarda el id del producto clickeado y redirecciona a product-info

function goToInfo(id){
  sessionStorage.setItem ('currentId', id);
  window.location.assign("product-info.html");
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes. Busca el id del contenedor del usuario y le agrega la variable usuario guardada en el storage

document.addEventListener("DOMContentLoaded", function(e){
  goToLogin();
  if (window.location.pathname !== "/login.html"){
    document.getElementById('usuarioNombre').innerHTML += usuario;
  }
});