// GET CART FROM LOCAL STORAGE

let cart = JSON.parse(localStorage.getItem("homelyzeCart")) || [];


// DISPLAY CART ITEMS

function displayCart() {

    const cartItems = document.getElementById("cart-items");

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <h2>Your cart is empty!</h2>

                <p>You haven't added any products yet.</p>

                <a href="index.html">Continue Shopping</a>

            </div>
        `;

        document.getElementById("subtotal").textContent = "₦0";
        document.getElementById("total").textContent = "₦0";

        return;
    }


    let subtotal = 0;


    cart.forEach((item, index) => {

        subtotal += item.price * item.quantity;


        cartItems.innerHTML += `

            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-item-details">

                    <h3>${item.name}</h3>

                    <p>₦${item.price.toLocaleString()}</p>

                    <div class="quantity-control">

                        <button onclick="changeQuantity(${index}, -1)">-</button>

                        <span>${item.quantity}</span>

                        <button onclick="changeQuantity(${index}, 1)">+</button>

                    </div>

                    <button class="remove-item"
                    onclick="removeItem(${index})">

                        Remove

                    </button>

                </div>

            </div>

        `;

    });


    document.getElementById("subtotal").textContent =
        "₦" + subtotal.toLocaleString();

    document.getElementById("total").textContent =
        "₦" + subtotal.toLocaleString();

}


// CHANGE QUANTITY

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    saveCart();

}


// REMOVE PRODUCT

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

}


// SAVE CART

function saveCart() {

    localStorage.setItem("homelyzeCart", JSON.stringify(cart));

    displayCart();

}


// WHATSAPP CHECKOUT

document.getElementById("checkout-btn").addEventListener("click", function() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    let message = "Hello Homelyze! I would like to place an order.\n\n";

    let total = 0;


    cart.forEach(item => {

        let itemTotal = item.price * item.quantity;

        total += itemTotal;

        message +=
            `${item.name}\n` +
            `Quantity: ${item.quantity}\n` +
            `Price: ₦${item.price.toLocaleString()}\n` +
            `Subtotal: ₦${itemTotal.toLocaleString()}\n\n`;

    });


    message += `Total: ₦${total.toLocaleString()}\n\n`;

    message += "Please confirm availability and delivery details. Thank you!";


    // REPLACE WITH VENDOR'S WHATSAPP NUMBER

    let phoneNumber = "2348120835512";

    let whatsappURL =
        "https://wa.me/" + phoneNumber +
        "?text=" + encodeURIComponent(message);


    window.open(whatsappURL, "_blank");

});


// DISPLAY CART WHEN PAGE LOADS

displayCart();