let currentSlide = 0;

let slides = document.querySelectorAll(".slide");

let dots = document.querySelectorAll(".dot");


function showSlide(index) {

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    slides[index].classList.add("active");

    dots[index].classList.add("active");

}


function changeSlide(direction) {

    currentSlide += direction;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);

}


function goToSlide(index) {

    currentSlide = index;

    showSlide(currentSlide);

}



let cart = JSON.parse(localStorage.getItem("homelyzeCart")) || [];



document.querySelectorAll(".add_cart").forEach(button => {

    button.addEventListener("click", function() {

        const product = this.closest(".product_card, .product_card");

        const name = product.dataset.name;

        const price = Number(product.dataset.price);

        const image = product.querySelector("img").getAttribute("src");


        // CHECK IF PRODUCT ALREADY EXISTS

        const existingProduct = cart.find(item => item.name === name);


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({

                name: name,
                price: price,
                image: image,
                quantity: 1

            });

        }



        localStorage.setItem("homelyzeCart", JSON.stringify(cart));


        alert(name + " added to cart!");

    });

});

function updateCartCounter() {

    let cart = JSON.parse(
        localStorage.getItem("homelyzeCart")
    ) || [];

    let count = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    let counter = document.getElementById("cart_counter");

    if (counter) {
        counter.textContent = count;
    }
}

updateCartCounter();