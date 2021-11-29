var cart;
var totalOk;
// Funciones que suman o restan productos a comprar

function minusOne(product){
    cart[product].count -= 1;
    if (cart[product].count === 0){
        cart[product].count = 1;
    }
    showCart(cart);
}
function plusOne(product){
    cart[product].count += 1;
    showCart(cart);
}

function calcTotal(cartArray){
    let htmlContentToAppendSubTotal = "";
    let htmlContentToAppendShippingCost = "";
    let shippingCost = document.getElementById("shipping-method").value;
    let subTotal = 0;
    let total = 0;
    for(let i = 0; i < cartArray.length; i++){
        let product = cartArray [i];
        let priceUYU;
        if (product.currency === "USD"){
            priceUYU = product.unitCost * 40
        }
        if (product.currency === "UYU"){
            priceUYU = product.unitCost
        }
        subTotal += priceUYU*product.count;
        
        total = subTotal+subTotal*shippingCost;
    }
    htmlContentToAppendSubTotal += `
        <p class="text-center">SubTotal = $ ${Intl.NumberFormat().format(subTotal)} <small>(UYU)</small> </p>
    `
    htmlContentToAppendShippingCost += `
        <p class="text-center">Costo de envío = $ ${Intl.NumberFormat().format(subTotal*shippingCost)} <small>(UYU)</small> </p>
        <hr>
        <div class="row">
                
            <p class="h1 text-center mt-2 col-9">Total = $ ${Intl.NumberFormat().format(total)}</p>
            <small class="col-3 mt-3">
                <select class="custom-select" id="currencyTotal">
                    <option value="0" selected>UYU</option>
                </select>
            </small>
        </div>
    `
    console.log(total);
    sessionStorage.setItem ('purchaseCost', total);
    document.getElementById("products-total").innerHTML = htmlContentToAppendSubTotal;
    document.getElementById("products-shippingcost").innerHTML = htmlContentToAppendShippingCost;
};


// Función para eliminar un producto de cart

function deleteArticle(article){
    cart.splice(article, 1);
    showCart(cart);
}

// Función que muestra al carrito en pantalla

function showCart(cartArray){
    let htmlContentToAppendProd = "";
    for(let i = 0; i < cartArray.length; i++){
        let product = cartArray [i];
        htmlContentToAppendProd += `
        <div class="list-group-item list-group-item-action each-product" id="${product.id}">
            <div class="list-group-item">
                <div class="row">
                    <div class="col-3 d-none d-md-block">
                        <div class="cart-img">
                            <img src="${product.src}" alt="${product.name}">
                        </div>
                    </div>
                    <div class="col-6 h-auto">
                        <div class="d-flex flex-column text-center">
                            <p class="h2 mb-5">${product.name}</p>
                            <p class="text-muted">Estás comprando ${product.count} de este producto.</p>
                            <small class="mt-1">Precio unitario: $ ${product.unitCost} (${product.currency.toLowerCase()})</small>
                        </div>
                    </div>     
                    <div class="col-6 col-md-3 h-auto text-right">
                            <div>
                                <button class="btn btn-secondary" onclick="minusOne(${i})"><p class="h1">-</p></button>
                                <button class="btn btn-secondary" onclick="plusOne(${i})"><p class="h1">+</p></button>
                                <p class="h3 mt-1">${product.unitCost*product.count} ${product.currency}</p>
                                <button class="btn btn-danger" onclick="deleteArticle(${i})">
                                    <div class="fas fa-trash"></div>
                                </button> 
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
            
        `
        
    }
    
    document.getElementById("products-container").innerHTML = htmlContentToAppendProd;
    calcTotal(cartArray);
}

// Vuelve a mostrar la página si se cambia el método de pago

document.getElementById("shipping-method").addEventListener("change", function(e){
  showCart(cart);  
});


document.addEventListener("DOMContentLoaded",function(e){
    

    // Traigo al JSON y guardo sus articulos en cart []


    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){ 
            cart = resultObj.data.articles;
        }
        showCart(cart)
    })
});