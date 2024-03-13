import './App.css';
import { Alert, Box, CircularProgress, Snackbar } from "@mui/material";
import { Routes, Route, Router, BrowserRouter, Navigate } from "react-router-dom";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { ProtectedRoute } from './components/ProtectedRoute';
// import Profile from './pages/Profile';
// import AppLayout from './components/AppLayout';
// import Sidebar from './components/Sidebar';

const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));
const Logout = lazy(() => import("./pages/Logout"));
const HomePage = lazy(() => import("./pages/Home"));
const ErrorPage = lazy(() => import("./pages/Error"));
const ProfilePage = lazy(() => import("./pages/Profile"));

function App() {

  return (


    <BrowserRouter>
      <AuthProvider>
        <Suspense
          fallback={
            <Box className="display-center">
              <CircularProgress sx={{ margin: "auto" }} />
            </Box>
          }>

          <Routes>
            <Route path="/" exact element={<Navigate to="/login" />} />
            <Route path="/login" exact element={<LoginPage />} />
            <Route path="/register" exact element={<RegisterPage />} />
            <Route path="/home" exact element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/profile" exact element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="*" exact element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </AuthProvider>

    </BrowserRouter>





  );
}

export default App;
