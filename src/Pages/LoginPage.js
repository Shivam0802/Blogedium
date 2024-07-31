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
            <div className="flex flex-row items-center gap-2 md:gap-2 mx-6 mt-6 cursor-pointer" onClick={goBack}>
                <IoIosArrowDropleftCircle size={25} className="text-[#F5FCCD]" />
                <h1 className="text-[#F5FCCD] font-medium text-[1.3rem]">Back</h1>
            </div>
            <motion.div
                className="flex justify-center items-center h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="flex flex-col md:flex-row items-center justify-around w-[100%] md:w-[65%] h-auto bg-[#2F3645] bg-opacity-5 rounded-lg backdrop-blur-sm p-4 m-4">
                    <div className="relative mt-[20rem] md:mt-0 w-full md:w-[80%] h-full flex items-center mb-8 md:mb-0">
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
                        <div className="absolute top-0 md:left-32 w-full h-full rounded-lg">
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
                        <h1 className="text-white text-[2rem] md:text-[2.7rem] font-medium mt-6">
                            Welcome Back ...
                        </h1>
                        <p className="text-white text-[1rem] md:text-[1.3rem] font-normal">
                            Login to your account
                        </p>
                        <hr className="w-[80%] h-0.5 bg-white bg-opacity-40 mt-4" />
                        <form className="w-full h-full flex flex-col items-center" onSubmit={handleLogin}>
                            <div className="flex flex-col w-[90%] gap-1 mt-6">
                                <label
                                    htmlFor="email"
                                    className="text-white text-[1rem] font-normal ml-2"
                                >
                                    Email :
                                </label>
                                <div className="flex items-center bg-[#2F3645] bg-opacity-20 text-white text-[1rem] font-normal px-4 py-[0.02rem] rounded-lg ring-[0.02rem] ring-gray-200 hover:outline-none focus:outline-none">
                                    <MdEmail className="text-[#FDAF7B] h-6 w-6 mr-2" />
                                    <hr className="w-0.5 h-6 bg-white bg-opacity-100 mr-4" />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        className="w-full h-[2.5rem] bg-transparent bg-opacity-20 text-white focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col w-[90%] gap-1 mt-6">
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
                                        type={showPassword ? 'password' : 'text'}
                                        id="password"
                                        name="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="w-full h-[2.5rem] bg-transparent bg-opacity-20 text-white focus:outline-none"
                                    />
                                    <div>
                                        {showPassword ? <FaRegEye size={20} className="text-white" onClick={handlePassword} /> : <FaRegEyeSlash size={20} className="text-white" onClick={handlePassword} />}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between w-[90%] mt-4">
                                <label className="flex items-center text-white text-[1rem] font-normal">
                                    <input
                                        type="checkbox"
                                        className="h-[0.9rem] w-[0.9rem] mr-2"
                                    />
                                    Remember me
                                </label>
                                <a href="#" className="text-[#FDAF7B] text-[1rem] font-normal">
                                    Forgot Password?
                                </a>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-[90%] h-[2.5rem] bg-[#FFE5B4] text-[1.2rem] md:text-[1.35rem] font-normal text-gray-700 rounded-lg mt-10">
                                {loading ? 'Loading...' : 'LOGIN'}
                            </button>
                            {error && <p className="text-red-300 text-center">{error}</p>}
                            <p className="text-white text-[1rem] font-normal mt-2">
                                Don't have an account?{" "}
                                <Link to="/register" className="text-[#40A578]">
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

