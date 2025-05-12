import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../AllPages/Login/login";
import Signup from "../AllPages/Login/Signup";
 import PrivateRoute from "../Component/PrivateRoute";
import CreateCaseStudy from "../AllPages/CaseStudy/CreateCaseStudy";
import ViewCaseStudy from "../AllPages/CaseStudy/ViewCaseStudy";
import ListAllCaseStudy from "../AllPages/CaseStudy/ListAllCaseStudy";
   
export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />


      <Route path="/casestudy" element={  <PrivateRoute> <CreateCaseStudy /></PrivateRoute>} />
      <Route path="/viewcasestudy" element={  <PrivateRoute> <ViewCaseStudy /></PrivateRoute>} />
      <Route path="/list-casestudy" element={  <PrivateRoute> <ListAllCaseStudy /></PrivateRoute>} />

 
     {/* ViewCaseStudy  ListAllCaseStudy*/}
      {/* All Private Routes nested under Test Layout */}
      {/* <Route
        path="/dashboard"
        element={
         
            <Navbar />
          </PrivateRoute>
        }
      > */}
        {/* These will render inside Test.js (your layout) */}
       
        <Route path="casestudy/:editId" element={<CreateCaseStudy />} />
        <Route path="add-casestudy" element={<CreateCaseStudy />} />
        <Route path="list-casestudy" element={<CreateCaseStudy />} />
        <Route path="analytics" element={<CreateCaseStudy />} />
    
    </Routes>
  );
}
