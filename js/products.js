//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const ORDER_ASC_BY_REL = "★"
const ORDER_ASC_BY_PRICE = "⮝ $";
const ORDER_DESC_BY_PRICE = "⮟ $";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var SEARCHER = undefined;
var CONTAINER = document.getElementById("products-container");
const JSON_URL = "json/products.json";
const CART_ICON = "img/cart.png";

// FUNCIONES
// ORDENAR LISTA DE PRODUCTOS
function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_REL)
    {
        result=array.sort(function(a, b){
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);
            if (aCount > bCount){ return -1; }
            if (aCount < bCount){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);
            if (aCost < bCost){ return -1; }
            if (aCost > bCost){ return 1; }
            return 0;
        })
    }else if (criteria === ORDER_DESC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);
            if (aCost > bCost){ return -1; }
            if (aCost < bCost){ return 1; }
            return 0;
        })
    }
    return result;
}

// Agrega el contenido de la lista de productos al html

function showProductsList(){
    let htmlContentToAppend = "";

    SEARCHER = document.getElementById("searcherInput").value;
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        // Corrobora las condiciones (dentro de los filtros de búsqueda por nombre y mín-máx)

        if (
                (
                    (
                        (minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)
                    ) &&
                    (
                        (maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount)
                    )
                ) && 
                (
                    (
                        (product.name.toLowerCase().includes(SEARCHER.toLowerCase()))
                    ) || 
                    (
                        (product.description.toLowerCase().includes(SEARCHER.toLowerCase()))
                    )  || 
                    (
                        (product.category.toLowerCase().includes(SEARCHER.toLowerCase()))
                    ) 
                ) ||
                (
                    (SEARCHER.value != "") && (SEARCHER.value != undefined)
                )
            ){
            htmlContentToAppend += `
            <button class="list-group-item list-group-item-action each-product" onclick= "goToInfo(${product.id})" id="${product.id}">
                <div class="list-group-item">
                    <div class="row">
                        <div class="col-3 prod-img">
                            <img src="img/prod${product.id}.jpg" alt="${product.name}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${product.name}</h4>
                                <small class="text-muted">✔${product.soldCount} se han vendido</small>
                            </div>
                            <p class="mb-1 prod-desc">${product.description}</p>
                            <h4 class="mb-1 prod-price">${product.cost} ${product.currency}</h4>

                        </div>
                    </div>
                </div>
            </button>
            `
        }
        document.getElementById("products-container").innerHTML = htmlContentToAppend;
    }   
    
}

// Función que combina todas: Ordenar, Filtrar y Mostrar
function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined){
        currentProductsArray = productsArray;
    }
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    showProductsList();
}


// sessionStorage.setItem('currentProductId', "prod-"+product.id);

document.addEventListener("DOMContentLoaded", function (e) {

    // Trae Json mediante la función getJSONData del init

    getJSONData(JSON_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts (ORDER_ASC_BY_REL, resultObj.data);
        }

    })
    
    // Llama a las funciones al clickear los botones

    // Ordenamiento de objetos

    document.getElementById("sortByRel").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_REL);
    });
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });
    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    
    // Filtro de búsqueda entre mín y máx

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });

    // Limpiar filtro de búsqueda entre mín y máx

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    // Actualización del filtro de búsqueda cuando se modifica el input del filtro de búsqueda por nombre o contenido

    document.getElementById("searcherInput").addEventListener("input", function(){
        showProductsList();

    })

    // var currentProductsArray = document.querySelectorAll('label.each-product');
    // console.log(currentProductsArray)
    //  for(let i = 0; currentProductsArray.length; i++){
    //      let product = currentProductsArray[i];
    //      document.getElementById(product.id).addEventListener("click", function(){
    //         var tempProductId = product.id;
    //         console.log(tempProductId);
    //         sessionStorage.setItem ('tempProductId', tempProductId);
    //         alert("hola"+product.id);
    //      })
    // }

});