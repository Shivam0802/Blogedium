import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiIntersectThreeBold } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { TbLockFilled } from "react-icons/tb";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import CustomAlert from "../Components/CustomAlerts";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, db } from "../firebase.config"; 
import { serverTimestamp, doc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";

const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

const validatePassword = (password) => {
    return password.length >= 6;
};

const validateName = (name) => {
    const re = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return re.test(name);
};

function RegisterPage() {
    const [showPassword, setShowPassword] = useState(true);
    const [errors, setErrors] = useState({});
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const [alertMessage, setAlertMessage] = useState('');
    const [type, setType] = useState('');
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handlePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        setData({ ...data, [id]: value });
    };

    const validate = () => {
        const errors = {};

        if (data.name === '') {
            errors.name = 'Name is required';
        } else if (!validateName(data.name)) {
            errors.name = 'Name is invalid';
        }

        if (data.email === '') {
            errors.email = 'Email is required';
        } else if (!validateEmail(data.email)) {
            errors.email = 'Email is invalid';
        }

        if (data.password === '') {
            errors.password = 'Password is required';
        } else if (!validatePassword(data.password)) {
            errors.password = 'Password must be at least 6 characters';
        }

        if (data.confirmPassword === '') {
            errors.confirmPassword = 'Confirm Password is required';
        } else if (!validatePassword(data.confirmPassword)) {
            errors.confirmPassword = 'Password must be at least 6 characters';
        }

        if (data.password !== data.confirmPassword) {
            errors.comparePassword = 'Passwords do not match';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!validate()) {
            setLoading(false);
            return;
        }

        try {
            console.log('Attempting to create user...');
            const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
            console.log('User created: ', res.user);

            await sendEmailVerification(res.user);

            const user = {
                uid: res.user.uid,
                name: data.name,
                email: data.email,
                createdAt: serverTimestamp()
            };
            await setDoc(doc(db, 'users', res.user.uid), user);
            console.log('User added to Firestore.');
            setAlertMessage('User created successfully. Please verify your email to login.');
            setType('success');
            navigate('/login');
        } catch (error) {
            setAlertMessage(error.message);
            setType('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-emerald-50 py-12 px-4"
        >
            <div className="flex justify-center items-center">
                <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="hidden md:flex w-full md:w-[50%] h-full bg-gradient-to-br from-purple-100 to-emerald-100 p-8 items-center justify-center">
                        <div className="text-center">
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                                Join Blogedium
                            </h1>
                            <p className="text-base md:text-lg text-slate-600 mb-6">
                                Start sharing your stories and connect with a vibrant community of bloggers.
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
                                Sign up with Google
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col w-full md:w-[50%] p-8 md:p-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                            Create Account
                        </h1>
                        <p className="text-base text-slate-600 mb-6">
                            Sign up to start blogging
                        </p>
                        <hr className="w-full border-t border-slate-200 mb-6" />
                        <div className="w-full">
                            <form onSubmit={handleAdd} className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="text-sm font-medium text-slate-700">
                                        Name
                                    </label>
                                        <div className="flex items-center bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 focus-within:border-[#7C3AED] focus-within:ring-2 focus-within:ring-purple-100 transition-all">
                                        <IoPerson className="text-[#7C3AED] h-5 w-5 mr-3" />
                                        <input
                                            type="text"
                                            id="name"
                                            value={data.name}
                                            onChange={handleChange}
                                            className="w-full bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-sm font-medium text-slate-700">
                                        Email
                                    </label>
                                        <div className="flex items-center bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 focus-within:border-[#7C3AED] focus-within:ring-2 focus-within:ring-purple-100 transition-all">
                                        <MdEmail className="text-[#7C3AED] h-5 w-5 mr-3" />
                                        <input
                                            type="email"
                                            id="email"
                                            value={data.email}
                                            onChange={handleChange}
                                            className="w-full bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="password" className="text-sm font-medium text-slate-700">
                                            Password
                                        </label>
                                        <div className="flex items-center bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 focus-within:border-[#7C3AED] focus-within:ring-2 focus-within:ring-purple-100 transition-all">
                                            <TbLockFilled className="text-[#7C3AED] h-5 w-5 mr-3" />
                                            <input
                                                type={showPassword ? "password" : "text"}
                                                id="password"
                                                value={data.password}
                                                onChange={handleChange}
                                                className="w-full bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none"
                                                placeholder="Password"
                                            />
                                            <button type="button" onClick={handlePassword} className="ml-2">
                                                {showPassword ? <FaRegEye size={18} className="text-slate-500" /> : <FaRegEyeSlash size={18} className="text-slate-500" />}
                                            </button>
                                        </div>
                                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                                            Confirm Password
                                        </label>
                                        <div className="flex items-center bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 focus-within:border-[#7C3AED] focus-within:ring-2 focus-within:ring-purple-100 transition-all">
                                            <TbLockFilled className="text-[#7C3AED] h-5 w-5 mr-3" />
                                            <input
                                                type={showConfirmPassword ? "password" : "text"}
                                                id="confirmPassword"
                                                value={data.confirmPassword}
                                                onChange={handleChange}
                                                className="w-full bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none"
                                                placeholder="Confirm Password"
                                            />
                                            <button type="button" onClick={handleConfirmPassword} className="ml-2">
                                                {showConfirmPassword ? <FaRegEye size={18} className="text-slate-500" /> : <FaRegEyeSlash size={18} className="text-slate-500" />}
                                            </button>
                                        </div>
                                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                                    </div>
                                </div>
                                {errors.comparePassword && <p className="text-red-500 text-sm">{errors.comparePassword}</p>}
                                <div className="flex flex-col gap-2 mt-2">
                                    <label className="flex items-center text-sm text-slate-600">
                                        <input type="checkbox" className="h-4 w-4 mr-2 rounded border-slate-300 text-[#7C3AED] focus:ring-[#7C3AED]" defaultChecked />
                                        Terms and Conditions Apply
                                    </label>
                                    <label className="flex items-center text-sm text-slate-600">
                                        <input type="checkbox" className="h-4 w-4 mr-2 rounded border-slate-300 text-[#7C3AED] focus:ring-[#7C3AED]" defaultChecked />
                                        Privacy Policy
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-11 bg-[#7C3AED] text-white text-base font-medium rounded-lg hover:bg-[#6D28D9] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                >
                                    {loading ? 'Loading...' : 'Register'}
                                </button>
                            </form>
                            <p className="text-sm text-slate-600 text-center mt-4">
                                Already have an account? <Link to="/login" className="text-[#7C3AED] hover:text-[#6D28D9] font-medium">Log in</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {alertMessage && <CustomAlert message={alertMessage} onClose={() => setAlertMessage('')} type={type} />}
        </motion.div>
    );
}

export default RegisterPage;
