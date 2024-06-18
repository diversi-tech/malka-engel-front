import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom"
//Footer page


export const Footer = () => {
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

