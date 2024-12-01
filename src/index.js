import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Createtrip from './create-trip/index2';
import Header from './components/custom/Header';
// import { GoogleGenerativeAI } from '@google/generative-ai';


const router = createBrowserRouter([

{
path:"/",
element:<App/>

},
{
path:"/Create-Trip",
element:<Createtrip/>

}

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Header/>

     <RouterProvider router={router}>

      <App />
      
      </RouterProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
