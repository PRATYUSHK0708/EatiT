// Hamburger
const list = document.querySelector(".mobile-menu")

const hamburger = document.querySelector(".fa-bars")


hamburger.addEventListener('click', (e) => {
    e.preventDefault()

    hamburger.classList.toggle("fa-bars")
    hamburger.classList.toggle("fa-x")
    list.classList.toggle("mobile-menu-active")
})


// Cart

const carticon = document.querySelector(".cart-icon")
const cart = document.querySelector(".cart-tab")

carticon.addEventListener("click", (e) => {
    e.preventDefault();

    cart.classList.toggle("cart-tab-active")
})

// close buttton

const closebtn = document.querySelector(".close-btn")
const cartTab = document.querySelector(".cart-tab")


closebtn.addEventListener("click", () => {
    cartTab.classList.toggle("cart-tab-active")
})


let productList = [];
let cartProduct = [];

const cartTotal = document.querySelector('.cart-total');

// incremneting cart-icon value
const cartValue = document.querySelector(".cart-value");



// update Total Price

const updateTotals = () => {
    let totalPrice = 0;
    let TotalQuantity = 0;
    document.querySelectorAll('.item').forEach(item => {


        // incremneting cart-icon value
        let quantity = parseInt(item.querySelector('.quantity-value').textContent);
        const price = parseFloat(item.querySelector(".item-total").textContent.replace('$', ''))

        totalPrice += price;
        TotalQuantity += quantity;
    });
    cartTotal.textContent = `${totalPrice.toFixed(2)}`
    cartValue.textContent = TotalQuantity
}


// fetching item
const cardList = document.querySelector(".card-list")

const showcards = () => {
    productList.forEach(product => {


        const orderCard = document.createElement('div');
        orderCard.classList.add('order-card')

        orderCard.innerHTML = `
                            <div class="card-image">
                                <img src="${product.image}">
                            </div>
                            <h4>
                                ${product.name}
                            </h4>
                            <h4 class="price">${product.price}</h4>
                            <a href="#" class="btn card-btn">Add to cart</a>
                       `;

        cardList.appendChild(orderCard);

        const cardbtn = orderCard.querySelector(".card-btn")

        cardbtn.addEventListener("click", (e) => {

            e.preventDefault();
            // alert("Item Added to Cart")

            addTocart(product);
        })
    })
};

// add to cart functionality here

const cartList = document.querySelector(".cart-list")

const addTocart = (product) => {

    // Avoid same item
    const existingProduct = cartProduct.find(item => item.id === product.id);
    if (existingProduct) {
        alert('itemAlreadyAdded');
        return;
    }

    cartProduct.push(product);
    let quantity = 1;
    let price = parseFloat(product.price.replace('$', ''));


    const cartItem = document.createElement('div');
    cartItem.classList.add('item')

    cartItem.innerHTML = `
                            <div class="item-image">
                                <img src="${product.image}">
                            </div>
                            <div class="item-detail">
                                <h4>${product.name}</h4>
                                <h4 class="item-total">${product.price}</h4>
                            </div>
                            <div class="flex item-val">
                                <a href="" class="quantity-btn">
                                <i class="fa-solid fa-minus minus"></i>
                                </a>
                                <h4 class="quantity-value">${quantity}</h4>
                                <a href="" class="quantity-btn">
                                <i class="fa-solid fa-plus plus"></i>
                                </a>
                            </div>
                           `;

    cartList.appendChild(cartItem);
    updateTotals();

    // To increment item 
    const plus = cartItem.querySelector(".plus")
    const quantityValue = cartItem.querySelector('.quantity-value')


    // Price replace
    const itemtotal = cartItem.querySelector('.item-total')

    plus.addEventListener("click", (e) => {
        e.preventDefault();
        quantity++;
        quantityValue.textContent = quantity;
        itemtotal.textContent = `$${(price * quantity).toFixed(2)}`
        updateTotals();
    });

    // To Decrement item
    const minus = cartItem.querySelector(".minus")

    minus.addEventListener("click", (e) => {
        e.preventDefault();
        if (quantity > 1) {
            quantity--;
            quantityValue.textContent = quantity;
            itemtotal.textContent = ` $ ${(price * quantity).toFixed(2)}`
            updateTotals();
            
        }
        else {
            cartItem.classList.add("slide-out")
            setTimeout(() => {
                cartItem.remove()
                cartProduct = cartProduct.filter(item => item.id !== product.id);
                updateTotals();
            }, 300)
        }
    });

};









const initAp = () => {
    fetch('product.json').then
        (response => response.json()).then
        (data => {
            productList = data;
            showcards();
        })
}

initAp();

// swiper

var swiper = new Swiper(".mySwiper", {
    loop: true,
    navigation: {
        nextEl: "#prev",
        prevEl: "#next",
    },
});


