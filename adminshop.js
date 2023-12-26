// shop.js
// admin.js

// Assuming products is defined in the admin.js file
document.addEventListener("DOMContentLoaded", displayProducts);

function displayProducts() {
    // Retrieve products from localStorage
    const products = JSON.parse(localStorage.getItem("products")) || [];

    // Get the productList element
    const productList = document.getElementById("shopList");

    // Clear existing list items
    productList.innerHTML = '';

    // Populate the productList with products
    products.forEach((product, index) => {
        const listItem = document.createElement("div");
        listItem.classList.add("item");
        listItem.innerHTML = `
            <img src="${product.image}">
            <div class="title">${product.name}</div>
            <div class="price">$${product.price.toLocaleString()}</div>
          `;
        productList.appendChild(listItem);
    });
}

let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let listCards = [];

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

function getUserId() {
    const userId = localStorage.getItem("name");
    if (userId) {
        return userId;
    } else {
        console.error('User ID not found in local storage');
        return null;
    }
}

// Assuming products is defined in the admin.js file
function addToCart(index) {
    const userId = getUserId();
    const products = JSON.parse(localStorage.getItem("products")) || [];

    if (userId) {
        if (!listCards[userId]) {
            listCards[userId] = [];
        }

        const existingProductIndex = listCards[userId].findIndex((item) => item.id === products[index].id);

        if (existingProductIndex !== -1) {
            listCards[userId][existingProductIndex].quantity++;
        } else {
            listCards[userId].push({ ...products[index], quantity: 1 });
        }

        reloadCard();
    }
}

// Rest of your code...


function changeQuantity(userId, key, quantity) {
    if (quantity === 0) {
        listCards[userId].splice(key, 1);
    } else {
        listCards[userId][key].quantity = quantity;
    }

    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    const userId = getUserId();
    if (userId) {
        if (listCards[userId]) {
            listCards[userId].forEach((value, key) => {
                totalPrice += value.quantity * value.price;
                count += value.quantity;

                let newDiv = document.createElement('li');
                newDiv.innerHTML = `
                    <div><img src="c:/${value.image}"/></div>
                    <div>${value.name}</div>
                    <div>${(value.quantity * value.price).toLocaleString()}</div>
                    <div>
                        <button onclick="changeQuantity('${userId}', ${key}, ${value.quantity - 1})">-</button>
                        <div class="count">${value.quantity}</div>
                        <button onclick="changeQuantity('${userId}', ${key}, ${value.quantity + 1})">+</button>
                    </div>`;
                listCard.appendChild(newDiv);
            });
        }
    }

    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;

    saveCartToLocalStorage();
}

document.addEventListener('DOMContentLoaded', () => {
    const userId = getUserId();
    if (userId) {
        const savedCart = localStorage.getItem(`shoppingCart_${userId}`);
        if (savedCart) {
            listCards[userId] = JSON.parse(savedCart);
            reloadCard();
        }
    }
});

function saveCartToLocalStorage() {
    const userId = getUserId();
    if (userId) {
        localStorage.setItem(`shoppingCart_${userId}`, JSON.stringify(listCards[userId]));
    }
}
