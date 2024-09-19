import { products } from "./data.js";
import {cart, removeFromCart} from "./cart.js";
import { formatCurrency } from "./util/money.js";

document.addEventListener('DOMContentLoaded', () => {


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
  
   
  
    cartSummaryHTML+= `
  <div class="cart-summary-container js-cart-summary-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery Date: Thursday, July 11
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
          <span class="update-quantity js-update-link">Update</span>
          <span class="delete-quantity js-delete-link" data-product-id="${matchingProduct.id}">Delete</span>
        </div>
      </div>
      <div class="delivery-options">
        <div class="delivery-title">
          Choose a delivery option:
        </div>
        <div class="delivery-options-grid">
          <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-options-date">
              Thursday, July 11
            </div>
            <div class="delivery-options-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-options-grid">
          <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-options-date">
              Friday, July 5
            </div>
            <div class="delivery-options-price">
              $4.99 Shipping
            </div>
          </div>
        </div>
        <div class="delivery-options-grid">
          <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-options-date">
              Wednesday, July 3
            </div>
            <div class="delivery-options-price">
              $9.99 Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  
    subTotal += matchingProduct.priceCents * cartItem.quantity;
  });
  
    orderSummaryHTML = `
  
   
           
              <div class="payment-info">
                <div class="payment-summary-title">
                  Order Summary
                </div>
                <div class="payment-summary-row">
                  <div class="items">Items (${totalItems}):</div>
                  <div class="payment-summary-money">
                   $ ${formatCurrency(subTotal)}
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
                    $31.85
                  </div>
                </div>
                <div class="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div class="payment-summary-money">
                    $3.19
                  </div>
                </div>
                <div class="payment-summary-row total-row">
                  <div>Order Total:</div>
                  <div class="payment-summary-money">
                    $35.04
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
  
  document.querySelector('.payment-summary').innerHTML = orderSummaryHTML;
  
  
  
  document.querySelector('.js-cart-summary').innerHTML = cartSummaryHTML;
  
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
  
     const container = document
     .querySelector(`.js-cart-summary-container-${productId}`);
     container.remove();
      
    });
  });
  

  
  
  
  
  
  
  
  
  




})
