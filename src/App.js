import './App.css';
import { Alert, Box, CircularProgress, Snackbar } from "@mui/material";
import { Routes, Route, Router, BrowserRouter, Navigate } from "react-router-dom";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { ProtectedRoute } from './components/ProtectedRoute';

const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));
const ErrorPage = lazy(() => import("./pages/Error"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const ContactPage = lazy(() => import("./pages/Contact"));
const AllCoursePage = lazy(() => import("./pages/AllCourse"));
const MyCoursePage = lazy(() => import("./pages/MyCourse"));
const CourseOutlinePage = lazy(() => import("./pages/CourseOutline"));


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
            <Route path="/profile" exact element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/contact" exact element={
              <ProtectedRoute>
                <ContactPage />
              </ProtectedRoute>
            } />
            <Route path="/myCourse" exact element={
              <ProtectedRoute>
                <MyCoursePage />
              </ProtectedRoute>
            } />
            <Route path="/allCourse" exact element={
              <ProtectedRoute>
                <AllCoursePage />
              </ProtectedRoute>
            } />
            <Route path="/courseOutline" exact element={
              <ProtectedRoute>
                <CourseOutlinePage />
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
