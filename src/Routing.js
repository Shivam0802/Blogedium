import React, { useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import BlogPage from "./Pages/BlogPage";
import ContactPage from "./Pages/ContactPage";
import RegisterPage from "./Pages/RegisterPage";
import ProfilePage from "./Pages/ProfilePage";
import SearchPage from "./Pages/SearchPage";
import Blog from "./Components/Blog";
//import MyComponent from "./Chatbot/Chatbot";
import PublishBlog from "./Components/PublishBlog";

import { AnimatePresence } from "framer-motion";

function Routing() {

    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const RequireAuth = ({ children }) => {
        return currentUser ? children : navigate('/login');
    };

    return (
        <AnimatePresence>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/blogs" element={<BlogPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/search" element={<SearchPage />} />
                {/* <Route path="/chatbot" element={<MyComponent />} /> */}
                <Route path="/publish" element={
                    <RequireAuth>
                        <PublishBlog />
                    </RequireAuth>
                } />
                <Route path="/profile" element={
                    <RequireAuth>
                        <ProfilePage />
                    </RequireAuth>
                } />
                <Route path="/blog/:id" element={
                    <RequireAuth>
                        <Blog />
                    </RequireAuth>
                } />
            </Routes>
        </AnimatePresence>
    );
}

export default Routing;