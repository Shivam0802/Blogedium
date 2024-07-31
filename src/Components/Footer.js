import React from "react";
import { IoNewspaper, IoLocation } from "react-icons/io5";
import { PiPhoneCallFill } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { BsThreads } from "react-icons/bs";
import { LuInstagram, LuTwitter } from "react-icons/lu";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="bg-gray-800 bg-opacity-20 flex flex-col p-4">
            <div className="flex flex-col md:flex-row items-center mb-2 gap-8">
                <div className="flex flex-col w-full md:w-[65%] items-center md:items-start">
                    <img src="/Assets/Logo.png" alt="Logo" className="w-[15rem] mx-2 mb-4 md:mb-0" />
                    <h1 className="text-[2rem] text-white font-medium mx-6">
                        Blogedium
                    </h1>
                    <p className="text-white text-[1rem] mx-6 text-center md:text-left">
                        At Blogedium, explore diverse topics, share your thoughts, and be part of a vibrant community of bloggers.
                    </p>
                    <div className="flex flex-col gap-4 mx-6 mt-10 items-center md:items-start">
                        <h1 className="text-[1.5rem] text-white font-medium">
                            Follow Us:
                        </h1>
                        <div className="flex flex-row gap-4">
                            <Link to="#">
                                <LuInstagram size={30} className="text-[#E1306C]" />
                            </Link>
                            <Link to="#">
                                <LuTwitter size={30} className="text-[#1DA1F2]" />
                            </Link>
                            <Link to="#">
                                <BsThreads size={30} className="text-[#F3F3F3]" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-4 w-full md:w-[50%]">
                    <div className="flex flex-col items-center md:items-start w-full md:w-full">
                        <h1 className="text-[1.5rem] text-[#FFBB5C] font-medium mx-6 text-center md:text-left">
                            Quick Links
                        </h1>
                        <ul className="text-white text-[1rem] mx-6 text-center md:text-left">
                            <Link to="/">
                                <li className="my-2 hover:text-red-300 cursor-pointer">Home</li>
                            </Link>
                            <Link to="/blog">
                                <li className="my-2 hover:text-red-300 cursor-pointer">Blogs</li>
                            </Link>
                            <Link to="/contact">
                                <li className="my-2 hover:text-red-300 cursor-pointer">Contact Us</li>
                            </Link>
                            <Link to="#">
                                <li className="my-2 hover:text-red-300 cursor-pointer">About Us</li>
                            </Link>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center md:items-start w-full md:w-full">
                        <h1 className="text-[1.5rem] text-[#FFBB5C] font-medium mx-6 text-center md:text-left">
                            Legal Stuff
                        </h1>
                        <ul className="text-white text-[1rem] mx-6 text-center md:text-left">
                            <li className="my-2 hover:text-red-300 cursor-pointer">Privacy Policy</li>
                            <li className="my-2 hover:text-red-300 cursor-pointer">Terms of Use</li>
                            <li className="my-2 hover:text-red-300 cursor-pointer">Disclaimer</li>
                            <li className="my-2 hover:text-red-300 cursor-pointer">FAQs</li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col w-full md:w-[50%] items-center md:items-start">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-0 md:mx-10 my-4">
                        <IoNewspaper className="text-[3rem] text-[#7077A1] mx-auto md:mx-0" />
                        <h1 className="text-[1rem] md:text-[1.5rem] text-[#A0153E] font-medium text-center md:text-left">
                            Subscribe to our Newsletter
                        </h1>
                        <p className="text-gray-600 text-[0.84rem] md:text-[0.9rem] text-center md:text-left" style={{ lineHeight: '1rem' }}>
                            Stay updated with our latest blogs and news.
                        </p>
                        <div className="flex flex-col md:flex-row gap-2 mt-4">
                            <input type="email" placeholder="Enter your email" className="w-full bg-transparent border-b border-gray-300 focus:outline-none text-[1rem]" />
                            <button className="bg-[#A0153E] text-white px-4 py-2 rounded-md hover:bg-red-200 hover:text-gray-900 mt-4 md:mt-0">
                                Subscribe
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mx-0 md:mx-24">
                        <div className="flex flex-row gap-2 mt-4">
                            <MdEmail size={23} className="text-[#C5E898]" />
                            <p className="text-white text-[1rem]">
                                blogedium12@gmail.org
                            </p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <PiPhoneCallFill size={25} className="text-[#9BBEC8]" />
                            <p className="text-white text-[1rem]">
                                +91 1234567890
                            </p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <IoLocation size={25} className="text-[#F6B17A]" />
                            <p className="text-white text-[1rem]">
                                123, XYZ Street, ABC City, State, Pincode: 123456
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-gray-400 mx-6" />
            <p className="text-white text-center mt-4">
                &copy; 2024 BlogSphere. All rights reserved
            </p>
        </div>
    );
}

export default Footer;
