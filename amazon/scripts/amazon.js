import { cart, addToCart} from './cart.js';
import { products } from './data.js';
import { formatCurrency } from './util/money.js';

document.addEventListener('DOMContentLoaded', () => {
  updateCartQuantity();
});



// Generating Products coming from data.js
let productsHTML = '';

products.forEach((product) => {
  productsHTML+= `
      <div class="product-container">
        <div class="image-container">
          <img src="${product.image}">
        </div>
        <div class="product-name limit-to-2-lines">
          ${product.name}
        </div>
        <div class="product-rating-container">
          <img class="stars"
          src="amazon/icons/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count">
            ${product.rating.count}
          </div>
        </div>
        <div class="product-price">
          ${formatCurrency(product.priceCents)}
        </div>
        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <div class="product-spacer"></div>

        <div class="added-to-cart-message">
          <img src="amazon/icons/checkmark.png">
          Added
        </div>
        <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
      `;  
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;




 function updateCartQuantity(){
  let cartQauntity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    
}







function displayAddedMessage(index){
  const messages = document.querySelectorAll('.added-to-cart-message');
  let messageIndex = messages[index];

  messages.forEach((message,) => {
   messageIndex.classList.add('js-added-message');

   setTimeout(() => {
     messageIndex.classList.remove('js-added-message');
   }, 2000);
  });
}





//params are each button and it's index -- used for message.
document.querySelectorAll('.add-to-cart-button').forEach((button, index) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    addToCart(productId);
    updateCartQuantity();
    displayAddedMessage(index);

    });
  });




