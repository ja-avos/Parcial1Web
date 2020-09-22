let productsOnCar = []
let categories = []
let products = []

const prodUrl = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

fetch(prodUrl).then(data => data.json().then(info => {
    categories = info;
    categories.forEach(element => {
        let cate = document.getElementById(element.name+"Deck");
        element.products.forEach(product => {
            addProduct(product, cate);
            products.push(product);
        })
    });
}));

function addProduct(product, section) {
    section.innerHTML += `<div class="card col-3 my-3" style="max-width: 18rem; min-width: 18rem;">
    <img class="card-img-top" src="${product.image}" alt="${product.name}">
    <div class="card-body">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text">${product.description}</p>
      <p class="card-text"><strong>$${product.price}</strong></p>
      <a href="#" class="btn btn-dark" onclick="addToCar('${product.name}');">Add to car</a>
    </div>
  </div>
</div>`;
}

function burguers() {
    hideSections();
    document.getElementById("Burgers").hidden = false;
}

function tacos() {
    hideSections();
    document.getElementById("Tacos").hidden = false;
}

function salads() {
    hideSections();
    document.getElementById("Salads").hidden = false;
}

function desserts() {
    hideSections();
    document.getElementById("Desserts").hidden = false;
}

function drinks() {
    hideSections();
    document.getElementById("Drinks and Sides").hidden = false;
}

function hideSections() {
    let sections = document.getElementsByTagName("main")[0].getElementsByTagName("section");
    for (const section of sections) {
        section.hidden = true;
    }
}