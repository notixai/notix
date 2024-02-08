import React from "react";
 
import UploadPage from './components/UploadPage/UploadPage.jsx'
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
//import Navbar from "./components/navbar";
//import RecordList from "./components/recordList";
//import Edit from "./components/edit";
//import Create from "./components/create";
 
const App = () => {
 return (
   <div>
      <UploadPage />
   </div>
 );
};
 
export default App;
