// import { useTranslation } from "react-i18next";
// import { getCart } from "../product/cookies/SetCart";
// export const CartDisplay = () => {
//     debugger
//     // get all the products from cookies memory
//     const cart = getCart();
//     const { t, i18n } = useTranslation();
//     const currentLanguage = i18n.language == "en" ? "En" : "He"    


//     return (
//         <div>
//             <h2>Cart</h2>
//             <ul>
//                 {cart.map((product, index) => (
//                     <li key={index}>{ product[`name${currentLanguage}`]}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { getCart } from "../product/cookies/SetCart";
import { setCookie } from "../product/cookies/CookieUtils";

export const CartDisplay = () => {
  // קבלת כל המוצרים מה-Cookies
  const [cart, setCart] = useState(getCart());
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language === "en" ? "En" : "He";

  const handleRemove = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    setCookie("cart", JSON.stringify(newCart), 7); // עדכון ה-Cookie
  };

  const handleQuantityChange = (index, quantity) => {
    const newCart = [...cart];
    newCart[index].quantity = quantity;
    setCart(newCart);
    setCookie("cart", JSON.stringify(newCart), 7); // עדכון ה-Cookie
  };

  return (
    <div className="container mt-4">
      <h2>{t("Cart")}</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>{t("Product Name")}</th>
            <th>{t("Quantity")}</th>
            <th>{t("Price")}</th>
            <th>{t("Total")}</th>
            <th>{t("Actions")}</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product, index) => (
            <tr key={index}>
              <td>{product[`name${currentLanguage}`]}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  className="form-control"
                  value={product.quantity || 1}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                />
              </td>
              <td>{product.price}</td>
              <td>{(product.price * (product.quantity || 1)).toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemove(index)}
                >
                  {t("Remove")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right">
        <button className="btn btn-primary">{t("Proceed to Checkout")}</button>
      </div>
    </div>
  );
};