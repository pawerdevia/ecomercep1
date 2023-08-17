import { products } from '../components/api.js'

let contenedorCards = document.querySelector('.products__container')
function crearProductos() {
    for (const product of products) {
        let templateProduct = `
    <article class="product" >
        <div class="product__container-card">
            <div class="background__card-change"></div>
            <div class="product__image">
                <img src="${product.image}"
                    alt="${product.name}" class="img__product" />
            </div>
            <div class="product__actions">
                <button type="button" class="product__actions-btn add--to--cart"  data-id="${product.id}">
                    <i class="bx bx-cart-download"></i>
                    Agregar
                </button>
                <button type="button" class="product__actions-btn product--view" data-id="${product.id}">
                    <i class="bx bxs-detail" ></i>
                    Detalles
                </button>
            </div>
            <div class="product__content">
                <div class="product__content-info">
                    <h3 class="product__title">
                    ${product.name}
                    </h3>
                    <span class="product__price">$${product.price}</span>
                    <span class="product__category">${product.category}</span>
                    <span class="product__stock">
                        Disponibles:
                        <span class="product__stock-quantity">${product.quantity}</span>
                    </span>
                </div>
                <div class="product__content-detail">
                    <h4 class="detail__text">Medidas</h4>
                    <span class="sizes">XS, S, M, L, XL, XXL</span>
                    <h4 class="detail__text">Colores</h4>
                    <div class="colors">
                        <span class="colors__color color--black"></span>
                        <span class="colors__color color--blue"></span>
                        <span class="colors__color color--red"></span>
                        <span class="colors__color color--grey"></span>
                        <p class="description-product" style="visibility: hidden; display:none;">Esta camiseta básica presenta un corte regular y un cuello redondo clásico. Es ideal para el uso diario y se puede combinar con una amplia variedad de looks.</p>
                    </div>
                </div>
            </div>
        </div>
    </article>
    `
    contenedorCards.innerHTML += templateProduct
    }
    document.querySelector('.products__container').addEventListener('click', (e)=>{
        if (e.target.classList.contains('product--view')) {
            let id = +e.target.dataset.id
            createModalDetail(id)
        }
    })
}

let modalDetail = document.querySelector('#modal_details')
function createModalDetail(id) {
    let itemFinded = products.find(i => i.id === id)
    let templateModal = ''
    if (itemFinded) {
        modalDetail.style.display = 'flex'
        templateModal = `
            <div class="modal_details__background"></div>
            <div class="modal_details__container">
            <div class="modal_details__image">
                <img id="image__details" src="${itemFinded.image}"
                alt="${itemFinded.name}" />
                <button type="button" class="modal__btn modal--close" id="close_modal">
                <i class="bx bx-x"></i>
                </button>
                <button type="button" class="modal__btn modal--add--cart" id="btnmodal${itemFinded.id}">
                <i class="bx bx-cart-download"> </i>
                Agregar al carrito
                </button>
            </div>
            <div class="modal_details__content">
                <div class="modal__head">
                <h2 class="modal__title" id="title-details">
                    ${itemFinded.name}
                </h2>
                <span class="modal__sku" id="sku-details">SKU: SUDAMLOU231</span>
                <span class="modal__price" id="price-details">$${itemFinded.price}</span>
                </div>
                <div class="content__details">
                <p class="modal__description" id="description-details">
                    ${itemFinded.description}
                </p>
                <span class="modal__category" id="category-details">${itemFinded.category}</span>
                <span class="modal__stock" id="stock-details">Disponibles:${itemFinded.quantity}</span>
                </div>
            </div>
            </div>
        `
        modalDetail.innerHTML += templateModal
    }
    document.querySelector('#close_modal').addEventListener('click', () =>{
        modalDetail.style.display = 'none'
        modalDetail.innerHTML = ''
    })
}


export { crearProductos }