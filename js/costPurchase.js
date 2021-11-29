function showPurchaseCost(){
    let htmlContentToAppend = "";
    let costHTML = document.getElementById("costPurchase");
    let costStorage = sessionStorage.getItem ('purchaseCost');
    console.log(costStorage);
    
    htmlContentToAppend += `
        $ ${Intl.NumberFormat().format(costStorage)} <small>(UYU)</small>
    `
    costHTML.innerHTML = htmlContentToAppend;
};

document.addEventListener("DOMContentLoaded",function(e){
    showPurchaseCost();
});