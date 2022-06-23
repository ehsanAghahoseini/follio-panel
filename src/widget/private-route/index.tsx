import React, { Component } from 'react';
import { Route, Navigate } from 'react-router-dom'



  export const ProtectedRoute = ({children}:any) => {
    if ( !localStorage.getItem("token")) {
      return <Navigate to={'/'} replace />;
    }
  
    return children;
  };