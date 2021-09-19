const JSON_URL = "json/products.json";
var currentId = sessionStorage.getItem('currentId');
let commentsArray = [];



// Función que en base al id guardado al clickearlo en productos muestra en pantalla la información del producto
function showProductInfo(array, id){
    
    currentProductsArray = array;
    let htmlContentToName = "";
    let htmlContentToDescription = "";
    let htmlContentToCount = "";
    let htmlContentToCost = "";  
    let htmlContentToCriteria = "";
    let htmlContentToImagesGallery = "";
    let htmlContentToComments = "";
    let htmlOneStar= `<div class="fa fa-star yellow"></div>`;


    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];
        // Compara todos los elementos con el id guardado, si se cumple agrega al html la información
        if (id == product.id){
            let productRelated1 = product.relatedProducts[0];
            let productRelated2 = product.relatedProducts[1];
            productRelated11 = productRelated1-1;
            productRelated21 = productRelated2-1;
            commentsArray = product.comments;
                        
            htmlContentToName += `${product.name}`
            htmlContentToDescription += `<p>${product.descriptionExt}</p>`
            htmlContentToCount += `<p>${product.soldCount}</p>`
            htmlContentToCost += `<p>${product.cost}</p>`
            htmlContentToCriteria += `
                                        <div class="row">
                                            <div class="list-group prod-img related-prod-img">
                                                <button class="list-group-item list-group-item-action" onclick="goToInfo(${productRelated1})">
                                                    <p>${currentProductsArray[productRelated11].name}</p>
                                                    <img src="img/prod${productRelated1}.jpg" alt="${currentProductsArray[productRelated11].name}" class="img-thumbnail">
                                                </button>
                                            </div>
                                            <div class="list-group prod-img related-prod-img">
                                                <button class="list-group-item list-group-item-action" onclick="goToInfo(${productRelated2})">
                                                    <p>${currentProductsArray[productRelated21].name}</p>
                                                    <img src="img/prod${productRelated2}.jpg" alt="${currentProductsArray[productRelated21].name}" class="img-thumbnail">
                                                </button>
                                                </div>
                                        </div>
            `

            // En este caso es con 4 imágenes por eso itera 4 veces, lo ideal sería crear una variable para la cantidad de imágenes y que itere esa cantidad de veces
            
            for (let i = 1; i <= 4; i++){
                htmlContentToImagesGallery +=`
                        <div>
                            <div class="prod-img">
                                <img src="img/prod${product.id}_${i}.jpg" alt="${product.name}" class="img-thumbnail">
                            </div>
                        </div>
                `};
            for (let i = 0; i < commentsArray.length; i++){
                let comment = commentsArray[i];
                let htmlStars = "";
                for (let i = 0; i < comment.score; i++){
                    htmlStars += htmlOneStar;
                }
                htmlContentToComments += `
                                            <div class="comment-container">
                                                <p class="user">
                                                    ${comment.user}<div class = "stars-container">${htmlStars}</div>
                                                </p>
                                                
                                                <p class= "desc">
                                                    ${comment.description}
                                                </p>
                                                <p class= "date">
                                                    ${comment.dateTime}
                                                </p>
                                            </div> 
                `                
            }
        }
        document.getElementById("categoryName").innerHTML = htmlContentToName;
        document.getElementById("categoryDescription").innerHTML = htmlContentToDescription;
        document.getElementById("productCount").innerHTML = htmlContentToCount;
        document.getElementById("productCost").innerHTML = htmlContentToCost;
        document.getElementById("productCriteria").innerHTML = htmlContentToCriteria;
        document.getElementById("productImagesGallery").innerHTML = htmlContentToImagesGallery;
        document.getElementById("commentsContainer").innerHTML = htmlContentToComments;
        
    }
    
};

function addComment(){
    let htmlNewComment = "";
    newComment = document.getElementById("new-comment").value;
    user = sessionStorage.getItem('usuarioName');
    let date = new Date().toISOString().slice(0, 10);
    let hours = new Date().toISOString().slice(11, 19);
    
    htmlNewComment += `
    <div class="comment-container">
        <p class="user">
            ${user} <div class = "stars-container"></div>
        </p>
        
        <p class= "desc">
            ${newComment}
        </p>
        <p class= "date">
         ${date} ${hours}
        </p>
    </div> 
`     
    document.getElementById("newComment").innerHTML = htmlNewComment;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    
    getJSONData(JSON_URL).then(function(resultObj){
        if (resultObj.status === "ok"){ 
            showProductInfo(resultObj.data, currentId);
        }

    });
    
});