// cartUtils.js
import { getCookie, setCookie } from './CookieUtils.js';

export const addToCart = (product) => {
    let cart = JSON.parse(getCookie('cart') || '[]');
    cart.push(product);
    setCookie('cart', JSON.stringify(cart), 7); // נשמור את העוגיה ל-7 ימים
};

export const clearCart = () => {
    setCookie('cart', '[]', 7);
};

  export const getCart = () => {
    const nameEQ = "cart=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return JSON.parse(c.substring(nameEQ.length, c.length));
    }
    return [];
  };