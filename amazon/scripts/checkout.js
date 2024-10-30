import { products } from "./data.js";
import {cart, removeFromCart, updateCartQuantity} from "./cart.js";
import { formatCurrency } from "./util/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { deliveryOptions } from "../scripts/deliveryOptions.js"
 

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
});


  function renderProducts(){
  let cartSummaryHTML = '';
  let orderSummaryHTML = '';
  let subTotal = 0;
  let totalItems = 0;
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
  
    let matchingProduct;
    totalItems += cartItem.quantity;
    
    products.forEach((product) => {
      if (product.id === productId){
        matchingProduct = product;
      }
    });
  

  // same thing as above : loop through each option in deliveryOptions
  // and compare and if they are equal, set deliveryOption to option
   const deliveryOptionId = cartItem.deliveryOptionId;

   let deliveryOption;

   deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId){
        deliveryOption = option;
      }
   });

   const today = dayjs();
   const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
   const dateString = deliveryDate.format("dddd, MMMM D");
  
    cartSummaryHTML+= `
  <div class="cart-summary-container js-cart-summary-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery Date: ${dateString}
    </div>
    <div class="order-summary-grid">
      <div class="image-container">
        <img src="${matchingProduct.image}">
      </div>
      <div class="order-items">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          ${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="quantity-container">
          <div class="quantity">
            Qauntity: 
          </div>
          <span class="quantity-label">${cartItem.quantity}</span>
          <span class="update-quantity js-update-link" data-product-id="${matchingProduct.id}">Add</span>
          <span class="delete-quantity js-delete-link" data-product-id="${matchingProduct.id}">Delete</span>
        </div>
      </div>
      <div class="delivery-options">
        <div class="delivery-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct, cartItem)}
      </div>
    </div>
  </div>
  `; 
    subTotal += matchingProduct.priceCents * cartItem.quantity;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem){

    let HTML = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format("dddd, MMMM D");
      const priceString = deliveryOption.priceCents === 0 ? "FREE" : `$${formatCurrency(deliveryOption.priceCents)} - `;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    HTML +=  `   
        <div class="delivery-options-grid">
            <input type="radio"
             ${isChecked ? 'checked': ''}
             class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-options-date">
              ${dateString}
            </div>
            <div class="delivery-options-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
        
      `
    });
    return HTML;
  }
  
    orderSummaryHTML = `
  
   
           
              <div class="payment-info">
                <div class="payment-summary-title">
                  Order Summary
                </div>
                <div class="payment-summary-row">
                  <div class="items">Items (${totalItems}):</div>
                  <div class="payment-summary-money">
                    $${formatCurrency(subTotal)}
                  </div>
                </div>
                <div class="payment-summary-row">
                  <div>Shipping & handling:</div>
                  <div class="payment-summary-money">
                    $0.00
                  </div>
                </div>
                <div class="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div class="payment-summary-money">
                   $${formatCurrency(subTotal)}
                  </div>
                </div>
                <div class="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div class="payment-summary-money">
                     $${formatCurrency(subTotal *.10)}
                  </div>
                </div>
                <div class="payment-summary-row total-row">
                  <div>Order Total:</div>
                  <div class="payment-summary-money">
                    $${formatCurrency(subTotal + (subTotal * .10))}
                  </div>
                </div>
                <div class="paypal-toggle">
                  Use Paypal
                  <input class="paypal-input-toggle"type="checkbox">
                </div>
                <div class="payment-button-container">
                  <button class="place-order-button button-primary">Place your order</button>
                </div>
              </div>
            </div>
  `
  
  const headerCartTotal = document.querySelector('.cart-quantity');
  headerCartTotal.innerHTML = totalItems;
  
  document.querySelector('.payment-summary').innerHTML = orderSummaryHTML;
   
  document.querySelector('.js-cart-summary').innerHTML = cartSummaryHTML;
  
  addToSummary();
  deletFromSummary();

}


function deletFromSummary(){
document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {

    const productId = link.dataset.productId;
    removeFromCart(productId);
    renderProducts();
    

   const container = document
   .querySelector(`.js-cart-summary-container-${productId}`);
   container.remove();
    
  });
});
}




function addToSummary(){
  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      updateCartQuantity(productId);
      renderProducts();
    })
  })
}



// External Library daysjs
const today = dayjs();
const deliveryDate = today.add(7, 'days');
deliveryDate.format('dddd, MMMM D');


