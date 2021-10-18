// Función que muestra todos los productos en mi carrito, recorriendo el array del JSON
function showCart(cartArray) {
    let htmlContentToAppend = "";
    let subTotal = 0;   
    let total = 0;
    if (cartArray != undefined){
        currentCartArray = cartArray.articles;
        console.log(currentCartArray[0].count)
    }
    for(let i = 0; i < currentCartArray.length; i++){
        let product = currentCartArray [i];
        let priceUYU;
        let countProducts = product.count;
        if (product.currency === "USD"){
            priceUYU = product.unitCost * 40
        }
        if (product.currency === "UYU"){
            priceUYU = product.unitCost
        }
        subTotal = priceUYU * countProducts;
        total += subTotal;
        htmlContentToAppend += `
            <div class="list-group-item list-group-item-action each-product" id="${product.id}">
                <div class="list-group-item">
                    <div class="row">
                        <div class="col-3 prod-img">
                            <img src="${product.src}" alt="${product.name}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${product.name}</h4>
                                <small class="text-muted">Estás comprando ${countProducts} de este producto.</small>
                            </div>
                            <h4 class="mb-1 prod-price">
                                ${subTotal} UYU
                                <button class="btn btn-light" onclick="plusOne()"> - </button>
                                <button class="btn btn-light" onclick="minusOne()"> + </button>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        `;
        htmlTotal = `
        <div class="list-group-item">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">subtotal ( ${total} UYU ) + envío ( 100 UYU ) = </h4>
                        <h4 class="mb-1">TOTAL: ${total+100} UYU</h4>
                        <button class="btn btn-light" >COMPRAR</button>
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("products-container").innerHTML = htmlContentToAppend;
        document.getElementById("total").innerHTML = htmlTotal;
    }
}

// Función que suma 1 a la cantidad a comprar

function plusOne(){
    countProducts += 1;
}

// Función que resta 1 a la cantidad a comprar

function minusOne(){
    countProducts -= 1;
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){ 
            showCart(resultObj.data);
        }

    });
});