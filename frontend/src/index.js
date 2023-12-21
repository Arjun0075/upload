import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Uploads from "./components/upload.js"
import Test from './components/test.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
     {/* <Test/> */}
     <Uploads/>
  </div>
   
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
