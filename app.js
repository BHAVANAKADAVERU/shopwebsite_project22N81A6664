let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let listCards = [];

// Rest of your shopping cart JavaScript code goes here
openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    {
        id: 1,
        name: 'EARPODS',
        image: 'earpods.png',
        price: 3000
    },
    {
        id: 2,
        name: 'BAGPACK',
        image: 'bagpack.png',
        price: 1000
    },
    {
        id: 3,
        name: 'SHIRT',
        image: 'shirt.png',
        price: 4000
    },
    {
        id: 4,
        name: 'HANDBAG',
        image: 'handbag.jpg',
        price: 5000
    },
    {
        id: 5,
        name: 'KURTI',
        image: 'kurti.png',
        price: 4000
    },
    {
        id: 6,
        name: 'PHONE',
        image: 'phone.png',
        price: 120000
    }
];

document.addEventListener('DOMContentLoaded', initApp);
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="images/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">$${value.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    });
}

function getUserId() {
    const userId = localStorage.getItem("name");
    if (userId) {
        return userId;
    } else {
        console.error('User ID not found in local storage');
        return null;
    }
}

function addToCart(key) {
    const userId = getUserId();
    if (userId) {
        if (!listCards[userId]) {
            listCards[userId] = [];
        }

        const existingProductIndex = listCards[userId].findIndex((item) => item.id === products[key].id);

        if (existingProductIndex !== -1) {
            listCards[userId][existingProductIndex].quantity++;
        } else {
            listCards[userId].push({ ...products[key], quantity: 1 });
        }

        reloadCard();
    }
}

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
                    <div><img src="images/${value.image}"/></div>
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
