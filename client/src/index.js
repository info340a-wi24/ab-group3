import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';

import './style.css'
import App from './components/App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTGD8T1b4hMN5ZZNcmnvcqDrirbZGKRe0",
  authDomain: "nomnom-26a7e.firebaseapp.com",
  databaseURL: "https://nomnom-26a7e-default-rtdb.firebaseio.com",
  projectId: "nomnom-26a7e",
  storageBucket: "nomnom-26a7e.appspot.com",
  messagingSenderId: "902432489382",
  appId: "1:902432489382:web:a921baab33a20381999967"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
