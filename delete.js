// ... (your existing code)

// Assuming products is defined in the admin.js file
function addToCart(index) {
    // ... (your existing code for addToCart function)
}

// ... (your existing code for changeQuantity, reloadCard, saveCartToLocalStorage functions)

// Add the following code for deleting a product
function deleteProduct(index) {
    const products = JSON.parse(localStorage.getItem("products")) || [];

    // Remove the product from the products array
    const deletedProduct = products.splice(index, 1)[0];

    // Update the localStorage with the modified products array
    localStorage.setItem("products", JSON.stringify(products));

    // Update the displayed products
    displayProducts();

    // If the deleted product was in the cart, remove it from the cart as well
    const userId = getUserId();
    if (userId) {
        if (listCards[userId]) {
            const deletedProductIndex = listCards[userId].findIndex(item => item.id === deletedProduct.id);
            if (deletedProductIndex !== -1) {
                listCards[userId].splice(deletedProductIndex, 1);
                reloadCard();
            }
        }
    }
}

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
            <button onclick="deleteProduct(${index})">Delete</button>
          `;
        productList.appendChild(listItem);
    });
}

// ... (your existing code for openShopping, closeShopping, getUserId, etc.)

// ... (your existing code for changeQuantity, reloadCard, saveCartToLocalStorage functions)

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

// ... (your existing code)
