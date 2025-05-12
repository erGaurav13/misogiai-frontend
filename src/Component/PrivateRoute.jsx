// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isAuth = !!localStorage.getItem("token"); // or use your actual auth logic

  return true ? children : <Navigate to="/login" replace />;
}


// import jwt_decode from "jwt-decode";

// export default function PrivateRoute({ children }) {
//   const token = localStorage.getItem("token");

//   if (!token) return <Navigate to="/login" replace />;

//   try {
//     const decoded = jwt_decode(token);
//     const isExpired = decoded.exp * 1000 < Date.now(); // exp is in seconds
//     if (isExpired) {
//       localStorage.removeItem("token");
//       return <Navigate to="/login" replace />;
//     }
//     return children;
//   } catch (err) {
//     return <Navigate to="/login" replace />;
//   }
// }
