<<<<<<< HEAD
import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom"
=======
import React from 'react';
import { useTranslation } from 'react-i18next';

>>>>>>> e0060c6f7c9708a26de1d60e6fc49b8d5b97f96d
//Footer page


export const Footer = () => {
  const { t, i18n } = useTranslation();
  return (
 

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

