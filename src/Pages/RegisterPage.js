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
        >
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col md:flex-row items-center justify-around w-[100%] md:w-[80%] h-auto bg-[#2F3645] bg-opacity-5 rounded-lg backdrop-blur-sm p-4 m-4">
                    <div className="relative mt-[32rem] md:mt-0 w-full md:w-[60%] h-full flex items-center mb-8 md:mb-0">
                        {/* Image for mobile */}
                        <img
                            src="/Assets/Mobiles.jpg"
                            alt="login"
                            className="w-full md:hidden blur-[5px]"
                        />
                        {/* Image for desktop */}
                        <img
                            src="/Assets/Desktop.jpg"
                            alt="login"
                            className="hidden md:block w-full blur-[5px]"
                        />
                        <div className="absolute top-0 md:left-[6rem] w-full h-full rounded-lg">
                            <div className="flex flex-col items-center justify-center md:justify-start mt-10 w-full md:w-[70%] h-full">
                                <h1 className="text-[#DBCBBD] text-[1.7rem] md:text-[2.7rem] font-normal">
                                    Welcome to BlogSphere
                                </h1>
                                <p className="text-white text-[1rem] md:text-[1.3rem] font-light mx-4 md:mx-10 text-justify">
                                    Welcome to BlogSphere, your ultimate destination for sharing and discovering stories, insights, and experiences. Dive into a universe of creativity and let your voice be heard.
                                </p>
                                <div className="w-fit flex items-center mt-10 gap-2 md:gap-4">
                                    <PiIntersectThreeBold className="text-[#F96D80] h-6 w-6" />
                                    <hr className="w-[15rem] md:w-[30rem] h-0.5 bg-[#6C7B95] bg-opacity-40" />
                                    <PiIntersectThreeBold className="text-[#F96D80] h-6 w-6" />
                                </div>
                                <div className="w-fit flex flex-col items-center mt-4">
                                    <h2 className="text-white text-[1rem] md:text-[1.3rem] font-normal">
                                        <strong className="text-green-300 font-medium mr-2 md:mr-4">
                                            Or
                                        </strong>
                                        continue with
                                    </h2>
                                    <div className="w-full flex justify-center items-center mt-4">
                                        <button
                                            className="relative inline-flex w-full items-center justify-center rounded-md ring-1 ring-red-300 border border-gray-400 bg-white px-6 md:px-10 py-1 font-normal text-[1rem] md:text-[1.17rem] text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                                            type="button"
                                        >
                                            <span className="mr-2 inline-block">
                                                <svg
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 text-rose-500"
                                                >
                                                    <path
                                                        d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                                                    ></path>
                                                </svg>
                                            </span>
                                            Sign in with Google
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full md:w-[40%] h-full justify-center items-center">
                        <h1 className="text-white text-[1.7rem] md:text-[2.5rem] font-medium mt-2">
                            Welcome Back ...
                        </h1>
                        <p className="text-white text-[1rem] md:text-[1.3rem] font-normal">
                            Login to your account
                        </p>
                        <hr className="w-[80%] h-0.5 bg-white bg-opacity-40 my-4" />
                        <div className="w-[80%] md:w-[90%]">
                            <form onSubmit={handleAdd} className="flex flex-col gap-4">
                                <div className="flex flex-col w-[100%] gap-1 mt-4">
                                    <label
                                        htmlFor="name"
                                        className="text-white text-[1rem] font-normal ml-2"
                                    >
                                        Name :
                                    </label>
                                    <div className="flex items-center bg-[#2F3645] bg-opacity-20 text-white text-[1rem] font-normal px-4 py-[0.02rem] rounded-lg ring-[0.02rem] ring-gray-200 hover:outline-none focus:outline-none">
                                        <IoPerson className="text-[#F96D80] h-6 w-6 mr-2" />
                                        <hr className="w-0.5 h-6 bg-white bg-opacity-100 mr-4" />
                                        <input
                                            type="text"
                                            id="name"
                                            value={data.name}
                                            onChange={handleChange}
                                            className="w-full h-[2.5rem] bg-transparent bg-opacity-20 text-white focus:outline-none"
                                            placeholder="Name"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                    )}
                                </div>
                                <div className="flex flex-col w-[100%] gap-1 mt-3">
                                    <label
                                        htmlFor="email"
                                        className="text-white text-[1rem] font-normal ml-2"
                                    >
                                        Email :
                                    </label>
                                    <div className="flex items-center bg-[#2F3645] bg-opacity-20 text-white text-[1rem] font-normal px-4 py-[0.02rem] rounded-lg ring-[0.02rem] ring-gray-200 hover:outline-none focus:outline-none">
                                        <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                        <hr className="w-0.5 h-6 bg-white bg-opacity-100 mr-4" />
                                        <input
                                            type="email"
                                            id="email"
                                            value={data.email}
                                            onChange={handleChange}
                                            className="w-full h-[2.5rem] bg-transparent bg-opacity-20 text-white focus:outline-none"
                                            placeholder="Email"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>
                                <div className="flex flex-col md:flex-row w-[100%] gap-6 md:gap-4 mt-3">
                                    <div className="flex flex-col gap-1">
                                        <label
                                            htmlFor="password"
                                            className="text-white text-[1rem] font-normal ml-2"
                                        >
                                            Password :
                                        </label>
                                        <div className="flex items-center bg-[#2F3645] bg-opacity-20 text-white text-[1rem] font-normal px-4 py-[0.02rem] rounded-lg ring-[0.02rem] ring-gray-200 hover:outline-none focus:outline-none">
                                            <TbLockFilled className="text-[#9CDBA6] h-6 w-6 mr-2" />
                                            <hr className="w-0.5 h-6 bg-white bg-opacity-100 mr-4" />
                                            <input
                                                type={showPassword ? "password" : "text"}
                                                id="password"
                                                value={data.password}
                                                onChange={handleChange}
                                                className="w-full h-[2.5rem] bg-transparent bg-opacity-20 text-white focus:outline-none"
                                                placeholder="Password"
                                            />
                                            <div>
                                                {showPassword ? <FaRegEye size={20} className="text-white" onClick={handlePassword} /> : <FaRegEyeSlash size={20} className="text-white" onClick={handlePassword} />}
                                            </div>
                                        </div>
                                        {errors.password && (
                                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label
                                            htmlFor="password"
                                            className="text-white text-[1rem] font-normal ml-2"
                                        >
                                            Confirm Password :
                                        </label>
                                        <div className="flex items-center bg-[#2F3645] bg-opacity-20 text-white text-[1rem] font-normal px-4 py-[0.02rem] rounded-lg ring-[0.02rem] ring-gray-200 hover:outline-none focus:outline-none">
                                            <TbLockFilled className="text-[#9CDBA6] h-6 w-6 mr-2" />
                                            <hr className="w-0.5 h-6 bg-white bg-opacity-100 mr-4" />
                                            <input
                                                type={showConfirmPassword ? "password" : "text"}
                                                id="confirmPassword"
                                                value={data.confirmPassword}
                                                onChange={handleChange}
                                                className="w-full h-[2.5rem] bg-transparent bg-opacity-20 text-white focus:outline-none"
                                                placeholder="Confirm Password"
                                            />
                                            <div>
                                                {showConfirmPassword ? <FaRegEye size={20} className="text-white" onClick={handleConfirmPassword} /> : <FaRegEyeSlash size={20} className="text-white" onClick={handleConfirmPassword} />}
                                            </div>
                                        </div>
                                        {errors.confirmPassword && (
                                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                                        )}
                                    </div>
                                </div>
                                {errors.comparePassword && (
                                    <p className="text-red-500 text-[1rem] ml-4">{errors.comparePassword}</p>
                                )}
                                <div className="flex flex-col justify-between w-[90%] mt-4">
                                    <label className="flex items-center text-white text-[1rem] font-normal">
                                        <input
                                            type="checkbox"
                                            className="h-[0.9rem] w-[0.9rem] mr-2"
                                            checked
                                        />
                                        Terms and Conditions Apply
                                    </label>
                                    <label className="flex items-center text-white text-[1rem] font-normal">
                                        <input
                                            type="checkbox"
                                            className="h-[0.9rem] w-[0.9rem] mr-2"
                                            checked
                                        />
                                        Privacy Policy
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-[100%] h-[2.5rem] bg-[#FFE5B4] text-[1.2rem] md:text-[1.35rem] font-normal text-gray-700 rounded-lg mt-6 mb-4 cursor-pointer"
                                >
                                    {loading ? 'Loading...' : 'Register'}
                                </button>
                            </form>
                            <p className="text-white mt-4 text-center">
                                Already have an account? <Link to="/login" className="text-blue-400">Log in</Link>
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
