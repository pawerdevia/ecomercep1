
//VARIABLES DE MODALES 
import { products } from '../components/api.js'
const closeCart = document.getElementById('btn--close--cart');
const modalCart = document.getElementById('cart');
const openCart = document.getElementById('btn--open--cart');
const returnModal = document.getElementById('cart--return');
const bodyCart = document.querySelector('#cart__body');

//Variables de suma resta y descuentos
let empyCart = document.querySelector('#car__empy')
let notifyItem = document.querySelector('#notify')
let subtotal = document.querySelector('#subtotal')
let ivaTotal = document.querySelector('#iva-total')
let cartTotal = document.querySelector('#cart-total')
let inputDiscount = document.querySelector('.discount__form-input')
let btnFormDiscount = document.querySelector('.discount__btn-form')
let textDiscount = document.querySelector('#discount-cart')
let btnPay = document.querySelector('.cart--checkout')

let cart = []

document.querySelector('.products__container').addEventListener('click', (e) => {
    if (e.target.classList.contains('add--to--cart')) {
        let id = +e.target.dataset.id;
        const item = cart.find(i => i.id === id)
        if (!item) {
            createProductCart(id)
            printCart()
        } else {
            addCart(id)
        }
    }
})

document.querySelector('#cart__body').addEventListener('click', (e) => {
    if (e.target.classList.contains('bxs-trash')) {
        let id = +e.target.dataset.id
        deleteCart(id)
        printCart()
    }
})

function deleteCart(id) {
    cart = cart.filter(i => i.id !== id)
        bodyCart.innerHTML = ""
        for (const product of cart) {
            let id = product.id
            let itemFinded = products.find(p => p.id === id)
            let templateProductCart = '';
            if (itemFinded) {
                templateProductCart = `
                <article class="article--cart" >
                    <div class="article__image">
                            <img src="${itemFinded.image}"/>
                                alt="${itemFinded.name}" />
                            <span class="article__price">$${itemFinded.price}</span>
                        </div>
                        <div class="article__header-cart">
                        <h3 class="article__tittle-cart">
                            ${itemFinded.name}
                        </h3>
                        <button class="article__remove-cart" >
                            <i class="bx bxs-trash" data-id=${itemFinded.id}></i>
                        </button>
                    </div>
                    <div class="article__body-cart">
                        <span class="article__stock-cart" id="stock${itemFinded.id}">${itemFinded.quantity} Disponibles</span>
                        <div class="article__quanty-cart">
                            <button class="article__quantity-btn article--minus">
                                <i class="bx bx-minus"></i>
                            </button>
                        <span class="article__quantity-count" id="count${itemFinded.id}">1</span>
                        <button class="article__quantity-btn article--plus">
                            <i class="bx bx-plus"></i>
                        </button>
                        </div>
                        <span class="article__subtotal-cart" id="subtotal${itemFinded.id}">$${itemFinded.price}</span>
                    </div>
                </article>
                `
                bodyCart.innerHTML += templateProductCart
            }
        }
}

document.querySelector('#modal_details').addEventListener('click', (e) => {
    if (e.target.classList.contains('modal--add--cart')) {
        let extraer = e.target.id
        let id = parseInt(extraer.replace(/[^0-9]+/g, ""))
        const item = cart.find(i => i.id === id)
        if (!item) {
            createProductCart(id)
            printCart()
        } else {
            addCart(id)
        }
    }
})

document.querySelector('#cart__body').addEventListener('click', (e) => {
    if (e.target.classList.contains('bx-plus')) {
        let extraer = e.target.id
        let id = parseInt(extraer.replace(/[^0-9]+/g, ""))
        addCart(id)
    }
})

document.querySelector('#cart__body').addEventListener('click', (e) => {
    if (e.target.classList.contains('bx-minus')) {
        let extraer = e.target.id
        let id = parseInt(extraer.replace(/[^0-9]+/g, ""))
        decrementCart(id)
    }
})


function openCartModal() {
    //Abrir cart
    openCart.addEventListener('click', () => {
        modalCart.style.right = '0'
        printCart()
    });
    //Ocultar por close
    closeCart.addEventListener('click', () => {
        modalCart.style.right = '-100%'
    });
    //Ocultar por volver
    returnModal.addEventListener('click', () => {
        modalCart.style.right = '-100%'
    });
}

function printCart() {

    if (cart.length === 0) {
        empyCart.style.visibility = 'visible'
        notifyItem.classList.remove('show--notify')
    } else {
        empyCart.style.visibility = 'hidden'
        notifyItem.classList.add('show--notify')
    }
    notifyItem.innerHTML = showItemsCount();
    subtotal.innerHTML = `$${totalAcount()}.00`;
    ivaTotal.innerHTML = `$${ivaProducts()}`;
    cartTotal.innerHTML = `$${cartTotalSum()}`;
    discountCart()
}

function createProductCart(id, qty = 1) {
    let itemFinded = products.find(p => p.id === id)
    let templateProductCart = '';
    if (itemFinded) {
        templateProductCart = `
        <article class="article--cart" >
            <div class="article__image">
                    <img src="${itemFinded.image}"/>
                        alt="${itemFinded.name}" />
                    <span class="article__price">$${itemFinded.price}</span>
                </div>
                <div class="article__header-cart">
                <h3 class="article__tittle-cart">
                    ${itemFinded.name}
                </h3>
                <button class="article__remove-cart" >
                    <i class="bx bxs-trash" data-id=${itemFinded.id}></i>
                </button>
            </div>
            <div class="article__body-cart">
                <span class="article__stock-cart" id="stock${itemFinded.id}">${itemFinded.quantity - 1} Disponibles</span>
                <div class="article__quanty-cart">
                    <button class="article__quantity-btn article--minus">
                        <i class="bx bx-minus" id="minus${itemFinded.id}"></i>
                    </button>
                <span class="article__quantity-count" id="count${itemFinded.id}">1</span>
                <button class="article__quantity-btn article--plus">
                    <i class="bx bx-plus" id="plus${itemFinded.id}"></i>
                </button>
                </div>
                <span class="article__subtotal-cart" id="subtotal${itemFinded.id}">$${itemFinded.price}</span>
            </div>
    </article>
        `
        bodyCart.innerHTML += templateProductCart
        cart.push({ id, qty })
    }
}

function addCart(id, qty = 1) {
    const item = cart.find(i => i.id === id)
    const product = products.find(p => p.id === id)
    if (item.qty >= product.quantity) {
        document.getElementById(`stock${item.id}`).innerText = `0 Disponibles`
        window.alert('No hay mas stock de este producto')
    }else{
        item.qty += qty
        console.log(item.qty)
        document.getElementById(`count${item.id}`).innerText = `${item.qty}`
        document.getElementById(`subtotal${item.id}`).innerText = `$${product.price * item.qty}`
        printCart()
    }
}

function decrementCart(id, qty = 1) {
    const item = cart.find(i => i.id === id)
    const product = products.find(p => p.id === id)
    if (item.qty <= 1 ) {
        window.alert('Borraste el producto del carrito')
        deleteCart(id)
        printCart()
    } else {
        item.qty -= qty
    document.getElementById(`count${item.id}`).innerText = `${item.qty}`
    document.getElementById(`subtotal${item.id}`).innerText = `$${product.price * item.qty}`
    printCart()
    }
    
}
function showItemsCount() {
    let suma = 0
    for (const item of cart) {
        suma += item.qty
    }
    return suma
}

function totalAcount() {
    let values = []
    let total = 0
    let pricesProducts = document.querySelectorAll('.article__subtotal-cart')

    for (const product of pricesProducts) {
        let value1 = parseInt(product.textContent.replace(/[^0-9]+/g, ""))
        values.push(value1)
    }
    for (const value of values) {
        total += value
    }
    return total
}

function ivaProducts() {
    return totalAcount() * 0.16
}

let discountApli = false;
let result = 0
function discountCart() {
    btnFormDiscount.addEventListener('click', () => {
        if (inputDiscount.value == 'AGOSTO13' && discountApli == false) {
            discountApli = true
            let discountAproved = totalAcount() * 0.25
            console.log(discountAproved)
            textDiscount.innerHTML = `$${discountAproved}`
            result = discountAproved
        }
    })
    return result
}

function cartTotalSum() {
    return totalAcount() + ivaProducts()
}

btnPay.addEventListener('click', () => {
    let total = Math.round(cartTotalSum() - discountCart())
    window.alert(`El valor total con tu descuento es de ${total} dolares gracias por tu compra`)
    cart = []
    bodyCart.innerHTML = ''
    printCart()
    discountApli = false
    textDiscount.innerHTML = '$0'
    total = 0
    inputDiscount.value = ''
})


document.querySelector('.cart--empty').addEventListener('click', () => {
    cart = []
    bodyCart.innerHTML = ''
    printCart()
    inputDiscount.value = ''
    discountApli = false
    textDiscount.innerHTML = '$0'
})
export { openCartModal }
