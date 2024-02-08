import React from "react";
 
// We use Route in order to define the different routes of our application
import {createBrowserRouter, RouterProvider } from "react-router-dom";
 
// We import all the components we need in our app
//import Navbar from "./components/navbar";
//import RecordList from "./components/recordList";
//import Edit from "./components/edit";
//import Create from "./components/create";

import UploadPage from './components/UploadPage/UploadPage.jsx'
import UserScreen from './components/General/UserScreen.jsx'
import Home from './components/General/Home.jsx'

/**
 * 
 * @todo fallback url
 * @todo create proper routing system
 */
const App = () => {
  const router = createBrowserRouter([
    {
      path:"/classroom",
      element:<UserScreen />,
      children: [
        {
          path:"",
          element: <Home />
        },
        {
          path:"upload-audio",
          element: <UploadPage />
        },
      ]
    }
  ])
 return (
    <RouterProvider router={router} />
 );
};
 
export default App;
