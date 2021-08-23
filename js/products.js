//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const json_url = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const cart_icon = "img/cart.png";
document.addEventListener("DOMContentLoaded", function (e) {
    fetch (json_url)
        .then (respuesta => respuesta.json())

        .then (productos => {
            productos.forEach(producto => {
                let product = "";
                product = `
                            <div class=product-box>` +
                                `<div class=product-img>` +
                                    `<a href="` + producto.imgSrc + `"><img src="` + producto.imgSrc + `" alt="` + producto.name + `"></a>` +
                                `</div>` +
                                `<div class=product-container-txt>` +
                                    `<div class=product-title>` +
                                        `<h2>`+ producto.name + `</h2>` +
                                    `</div>` +
                                    `<div class=product-info-price>` +
                                        `<div class=product-info>` +
                                            `<p>`+ producto.description + `</p>` +
                                        `</div>` +
                                        `<div class=product-price>` +
                                            `<p>`+ producto.cost + `<span>`+ producto.currency + `</span></p>` +
                                        `</div>` +
                                    `</div>` +
                                    `<div class=product-sold-cart>` +
                                        `<div class=product-sold>` +
                                            `<p> ✔`+ producto.soldCount + ` personas ya han adquirido este producto` + `</p>` +
                                        `</div>` +
                                        `<div class=product-add-to-cart>` +
                                            `<p>` + `<button> AGREGAR <img src="` + cart_icon + `"></button>` + `</p>` +
                                        `</div>` +
                                    `</div>` +
                                `</div>` +
                            `</div>`
                            document.getElementById("products-container").innerHTML += product;
            })
        })
});