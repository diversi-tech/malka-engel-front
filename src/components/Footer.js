import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom"
import React from 'react';
import { useTranslation } from 'react-i18next';

//Footer page


export const Footer = () => {
  const { t, i18n } = useTranslation();
  return (
    // <footer className="footer">
    //   <h1>{t('footerpage.title')}</h1>
    //   <div className="footer-content">
    //     <div className="footer-section about">
    //       <h2>{t('footerpage.h2About')}</h2>
    //       <p>{t('footerpage.p1')}</p>
    //     </div>
    //     <div className="footer-section links">
    //       <h2>{t('footerpage.h2QuickLinks')}</h2>
    //       <ul>
    //         <li><a href="/myHome">{t('footerpage.linkHome')}</a></li>
    //         <li><a href="/products">{t('footerpage.linkProducts')}</a></li>
    //         <li><a href="/cart">{t('footerpage.linkCart')}</a></li>
    //         <li><a href="/myContact">{t('footerpage.linkContact')}</a></li>
    //       </ul>
    //     </div>
    //     <div className="footer-section contact-form">
    //       <h2>{t('footerpage.contact')}</h2>
    //       <form>
    //         <label>{t('footerpage.lableMessage')}</label>
    //         <input type="email" name="email" className="text-input contact-input" />
    //         <label>{t('footerpage.lableMessage')}</label>
    //         <textarea rows="4" name="message" className="text-input contact-input" ></textarea>
    //         <button type="submit" className="btn btn-primary">{t('footerpage.buttonSend')}</button>
    //       </form>
    //     </div>
    //   </div>
    // </footer>
 

      <footer className="footer" style={{
        left: 0,
        bottom: 0,
        width: "100%",
        backgroundColor: "lightgray",
        textAlign: "center",
        padding: "10px"
      }}>
        
        <Link  to="./CommonQuestions">CommonQuestions</Link>
        <Link  to="./MyAccount">myAccount</Link>
        <Link  to="./Contact">Contact</Link>
       

      </footer>
  );
}

