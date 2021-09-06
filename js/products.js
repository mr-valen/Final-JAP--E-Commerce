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
var CONTAINER = document.getElementById("products-container")
const JSON_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
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
function showProductsList(){
    let htmlContentToAppend = "";
    SEARCHER = document.getElementById("searcherInput").value;
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];
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
                    ) 
                ) ||
                (
                    (SEARCHER.value != "") && (SEARCHER.value != undefined)
                )
            ){
            htmlContentToAppend += `
            <div class="list-group-item">
                <div class="row">
                    <div class="col-3 prod-img">
                        <img src="${product.imgSrc}" alt=" ${product.name} " class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name}</h4>
                            <small class="text-muted">✔${product.soldCount} se han vendido</small>
                        </div>
                        <p class="mb-1 prod-desc">${product.description}</p>
                        <h4 class="mb-1 prod-price">${product.cost} ${product.currency}</h4>
                        <div class ="add-to-cart">
                            <p><button><img src="${CART_ICON}"></button></p>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
        document.getElementById("products-container").innerHTML = htmlContentToAppend;
    }  
}
function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined){
        currentProductsArray = productsArray;
    }
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    showProductsList();
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(JSON_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts (ORDER_ASC_BY_REL, resultObj.data);
        }
    })
    
    document.getElementById("sortByRel").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_REL);
    });
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });
    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar el precio por productos
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

    document.getElementById("searcherInput").addEventListener("input", function(){
        showProductsList();
    })

});