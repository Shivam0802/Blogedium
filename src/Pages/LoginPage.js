import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiIntersectThreeBold } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { TbLockFilled } from "react-icons/tb";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase.config';
import { AuthContext } from '../Context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from "framer-motion";

function LoginPage() {

    const [showPassword, setShowPassword] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            console.log(userDoc.data());
            if (userDoc.exists()) {
                dispatch({
                    type: 'LOGIN',
                    payload: userDoc.data()
                });
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handlePassword = () => {
        setShowPassword(!showPassword);
    };

    const goBack = () => {
        navigate('/');
    };


    return (
        <>
            <div className="flex flex-row items-center gap-2 mx-6 mt-6 cursor-pointer" onClick={goBack}>
                <IoIosArrowDropleftCircle size={24} className="text-slate-600" />
                <h1 className="text-slate-600 font-medium text-base">Back</h1>
            </div>
            <motion.div
                className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-emerald-50 py-12 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="hidden md:flex w-full md:w-[50%] h-full bg-gradient-to-br from-purple-100 to-emerald-100 p-8 items-center justify-center">
                        <div className="text-center">
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                                Welcome to Blogedium
                            </h1>
                            <p className="text-base md:text-lg text-slate-600 mb-6">
                                Your ultimate destination for sharing and discovering stories, insights, and experiences.
                            </p>
                            <div className="flex items-center justify-center gap-2 mb-6">
                                <PiIntersectThreeBold className="text-[#7C3AED] h-5 w-5" />
                                <hr className="w-40 border-t border-slate-300" />
                                <PiIntersectThreeBold className="text-[#7C3AED] h-5 w-5" />
                            </div>
                            <button
                                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
                                type="button"
                            >
                                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                                </svg>
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col w-full md:w-[50%] p-8 md:p-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-base text-slate-600 mb-6">
                            Login to your account
                        </p>
                        <hr className="w-full border-t border-slate-200 mb-6" />
                        <form className="w-full flex flex-col" onSubmit={handleLogin}>
                            <div className="flex flex-col gap-2 mb-5">
                                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                                    Email
                                </label>
                                <div className="flex items-center bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 focus-within:border-[#7C3AED] focus-within:ring-2 focus-within:ring-purple-100 transition-all">
                                    <MdEmail className="text-[#7C3AED] h-5 w-5 mr-3" />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 mb-5">
                                <label htmlFor="password" className="text-sm font-medium text-slate-700">
                                    Password
                                </label>
                                <div className="flex items-center bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 focus-within:border-[#7C3AED] focus-within:ring-2 focus-within:ring-purple-100 transition-all">
                                    <TbLockFilled className="text-[#7C3AED] h-5 w-5 mr-3" />
                                    <input
                                        type={showPassword ? 'password' : 'text'}
                                        id="password"
                                        name="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none"
                                    />
                                    <button type="button" onClick={handlePassword} className="ml-2">
                                        {showPassword ? <FaRegEye size={18} className="text-slate-500" /> : <FaRegEyeSlash size={18} className="text-slate-500" />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-6">
                                <label className="flex items-center text-sm text-slate-600">
                                    <input type="checkbox" className="h-4 w-4 mr-2 rounded border-slate-300 text-[#7C3AED] focus:ring-[#7C3AED]" />
                                    Remember me
                                </label>
                                <a href="#" className="text-sm text-[#7C3AED] hover:text-[#6D28D9] font-medium">
                                    Forgot Password?
                                </a>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-11 bg-[#7C3AED] text-white text-base font-medium rounded-lg hover:bg-[#6D28D9] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                                {loading ? 'Loading...' : 'LOGIN'}
                            </button>
                            {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}
                            <p className="text-sm text-slate-600 text-center mt-4">
                                Don't have an account?{" "}
                                <Link to="/register" className="text-[#7C3AED] hover:text-[#6D28D9] font-medium">
                                    Register
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default LoginPage;

