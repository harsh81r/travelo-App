import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Createtrip from './create-trip/index2';
import Header from './components/custom/Header';
// import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripId]/index2';


const router = createBrowserRouter([

{
path:"/",
element:<App/>

},

{
path:"/Create-Trip",
element:<Createtrip/>

},

{
path:"/view-trip/:tripId",
element:<Viewtrip/>
}

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}>
  <Header/>

     <RouterProvider router={router}>
      <App />
      </RouterProvider>
      </GoogleOAuthProvider>;

  </React.StrictMode> 

  
);

// If you want to start measuring performance in your app, pass a function

// to log results (for example: reportWebVitals(console.log))

// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
// import { GoogleOAuthProvider } from '@react-oauth/google';
