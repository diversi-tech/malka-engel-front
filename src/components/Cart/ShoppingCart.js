import React, { useState, useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';
import { useTranslation } from 'react-i18next';

// Initialize BehaviorSubject with an empty array
const itemsSubject = new BehaviorSubject([]);

const ShoppingCart= () => {
  const { t, i18n } = useTranslation();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const subscription = itemsSubject.subscribe((cartItems) => {
      setItems(cartItems);
      calculateTotal(cartItems);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const calculateTotal = (cartItems) => {
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalAmount);
  };

  const addItem = (item) => {
    const currentItems = itemsSubject.value;
    itemsSubject.next([...currentItems, item]);
  };

  const removeItem = (item) => {
    const updatedItems = itemsSubject.value.filter(i => i.id !== item.id);
    itemsSubject.next(updatedItems);
  };

  const clearBasket = () => {
    itemsSubject.next([]);
  };

  return (
    <div className="shopping-cart">
<h1>{t('shoppingCartPage.title')}</h1>
            
                  {items.length === 0 ? (
        <p>{t('shoppingCartPage.p1')}</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>{t('shoppingCartPage.thItem')}</th>
                <th>{t('shoppingCartPage.thQuantity')}</th>
                <th>{t('shoppingCartPage.thPrice')}</th>
                <th>{t('shoppingCartPage.thTotal')}</th>
                {/* <th>{t('shoppingCartPage.thActions')}</th> */}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeItem(item)}>{t('shoppingCartPage.removeButton')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total">
            <h3>{t('shoppingCartPage.h3Total')}: ${total.toFixed(2)}</h3>
          </div>
          <button onClick={clearBasket}>{t('shoppingCartPage.clearButton')}</button>
        </>
      )}
      {/* For testing purpose: Add item button */}
      <button onClick={() => addItem({ id: new Date().getTime(), name: 'New Item', price: 9.99, quantity: 1 })}>{t('shoppingCartPage.addButton')}</button>
    </div>
  );
};

export default ShoppingCart;
