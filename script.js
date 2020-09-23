let car = {};
let categories = [];
let products = [];
let orders = [];

const prodUrl =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

fetch(prodUrl).then((data) =>
  data.json().then((info) => {
    categories = info;
    categories.forEach((element) => {
      let cate = document.getElementById(
        element.name.replaceAll(" ", "_", 2) + "Deck"
      );
      element.products.forEach((product) => {
        addProduct(product, cate);
        products.push(product);
      });
    });
    addEventListeners();
  })
);

function addProduct(product, section) {
  section.innerHTML += `<div class="card col-3 my-3">
    <img class="card-img-top img-responsive" src="${product.image}" alt="${product.name}">
    <div class="card-body">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text">${product.description}</p>
      <p class="card-text"><strong>$${product.price}</strong></p>
      <a href="#" class="btn btn-dark product-btn" id="${product.name}">Add to car</a>
    </div>
  </div>
</div>`;
}

function addToCar(name) {
  if (car[name] == undefined) {
    car[name] = 0;
  }
  car[name] += 1;
  let cant = 0;
  for (const n in car) {
    if (car[n] != undefined) {
      cant += car[n];
    }
  }
  document.getElementById("carQty").innerText = cant + " items";
}

function addEventListeners() {
  document
    .getElementById("placeOrderBtn")
    .addEventListener("click", placeOrder);
  document
    .getElementById("cancelOrderBtn")
    .addEventListener("click", clearOrders);
  document.getElementById("drinksBtn").addEventListener("click", drinks);
  document.getElementById("saladsBtn").addEventListener("click", salads);
  document.getElementById("tacosBtn").addEventListener("click", tacos);
  document.getElementById("burgersBtn").addEventListener("click", burgers);
  document.getElementById("dessertsBtn").addEventListener("click", desserts);
  document.getElementById("shoppingBtn").addEventListener("click", shopping);
  let productBtns = document.getElementsByClassName("product-btn");
  for (const btn of productBtns) {
    btn.addEventListener("click", () => {
      addToCar(btn.id);
    });
  }
}

function clearOrders() {
  document.getElementById("ordersBody").innerHTML = "";
  car = {};
  orders = [];
  document.getElementById("carQty").innerText = 0 + " items";
}

function placeOrder() {
  console.log(orders);
  clearOrders();
}

function fillOrders() {
  document.getElementById("ordersBody").innerHTML = "";
  let totSum = 0;
  for (const name in car) {
    if (car[name] != undefined) {
      let qty = car[name];
      let product = products.find((p) => name == p.name);
      let order = {
        id: orders.length + 1,
        qty: qty,
        desc: name,
        unitPrice: product.price,
      };
      totSum += qty * product.price;
      orders.push(order);
      addOrderRow(order);
    }
  }
  document.getElementById("totalSum").innerText = totSum;
}

function addOrderRow(order) {
  document.getElementById("ordersBody").innerHTML += `<tr>
    <th scope="row">${order.id}</th>
    <td>${order.qty}</td>
    <td>${order.desc}</td>
    <td>${order.unitPrice}</td>
    <td>${order.unitPrice * order.qty}</td>
  </tr>`;
}

function burgers() {
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
  document.getElementById("Drinks_and_Sides").hidden = false;
}

function shopping() {
  hideSections();
  document.getElementById("car").hidden = false;
  fillOrders();
}

function hideSections() {
  let sections = document
    .getElementsByTagName("main")[0]
    .getElementsByTagName("section");
  for (const section of sections) {
    section.hidden = true;
  }
}
