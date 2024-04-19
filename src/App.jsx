import React from "react";
import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage/HomePage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { Route, Routes,Navigate } from "react-router-dom";
import useAuthStore from "./store/authStore";
import {auth} from "./FireBase/firebase"
import { useAuthState } from "react-firebase-hooks/auth";
const App = () => {
  // const authUser =useAuthStore(state=> state.user)
  const [authUser] = useAuthState(auth);
// both above satetments is doing same thing getting user one from zusstand and other from useAuthSate which is hook of firestore
  return (
    // the things that are common in every page should be in pagelayout which is parent component wrapping all children compo
    <PageLayout>
    <Routes>
    {/* //the elements are gonna be children */}
      <Route path="/" element={authUser ? <HomePage/>: <Navigate to="/auth" />} />
      <Route path="/auth" element={!authUser ? <AuthPage/> : <Navigate to="/" />} /> 
      <Route path="/:username" element={<ProfilePage />} /> 
    </Routes>
    </PageLayout>
  );
};

export default App;
