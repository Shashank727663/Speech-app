import React, { Component } from "react";
import { createRoot } from 'react-dom/client';
import App from './App';

// import i18n (needs to be bundled ;)) 


const root = createRoot(document.getElementById('root'));
root.render(
  <App />
);