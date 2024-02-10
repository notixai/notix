import React from "react";
 
// We use Route in order to define the different routes of our application
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css"
// We import all the components we need in our app
//import Navbar from "./components/navbar";
//import RecordList from "./components/recordList";
//import Edit from "./components/edit";
//import Create from "./components/create";

import AudioForm from './components/UploadPage/AudioForm.jsx'
import UserScreen from './components/General/UserScreen.jsx'
import Home from './components/General/Home.jsx'
import ResultScreen from './components/General/ResultScreen.jsx'

/**
 * 
 * @todo fallback url
 * @todo create proper routing system
 */
const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<UserScreen />,
      children: [
        {
          path:"",
          element: <Home />
        },
        {
          path:"upload-audio",
          element: <AudioForm />
        },
        {
          path:"success",
          element: <ResultScreen status="success" title="Success" message="Successfully Submitted"/>
        },
        {
          path:"failure",
          element: <ResultScreen status="failure" title="Error" message="Something Happened to Your Submission"/>
        }
      ]
    }
  ])
  return (
    <RouterProvider router={router} />
  );
};

export default App;
