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
const CodingPage = lazy(() => import("./pages/CodingPage"));
const QuizPage = lazy(() => import("./pages/QuizPage"));
const TextPage = lazy(() => import("./pages/TextPage"));
const PerformancePage = lazy(() => import("./pages/Performance"));
const UsersPage = lazy(() => import("./pages/Users"));

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
            <Route path="/users" exact element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <UsersPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" exact element={
              <ProtectedRoute allowedRoles={["student", "instructor"]}>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/contact" exact element={
              <ProtectedRoute allowedRoles={["student", "instructor"]}>
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
            <Route path="/page/coding" exact element={
              <ProtectedRoute>
                <CodingPage />
              </ProtectedRoute>
            } />
            <Route path="/page/quiz" exact element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            } />
            <Route path="/page/text" exact element={
              <ProtectedRoute>
                <TextPage />
              </ProtectedRoute>
            } />
            <Route path="/courseProgress" exact element={
              <ProtectedRoute>
                <PerformancePage />
              </ProtectedRoute>
            } />

            <Route path="/courseProgress" exact element={
              <ProtectedRoute>
                <PerformancePage />
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
