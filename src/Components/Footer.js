import React from "react";
import { IoNewspaper, IoLocation } from "react-icons/io5";
import { PiPhoneCallFill } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { BsThreads } from "react-icons/bs";
import { LuInstagram, LuTwitter } from "react-icons/lu";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white flex flex-col p-6 md:p-8">
            <div className="max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row items-start mb-6 gap-8">
                    <div className="flex flex-col w-full md:w-[35%]">
                        <img src="/Assets/Logo.png" alt="Logo" className="w-[12rem] mb-4" />
                        <h1 className="text-2xl font-bold mb-3 text-[#7C3AED]">
                            Blogedium
                        </h1>
                        <p className="text-slate-300 text-sm leading-relaxed mb-6">
                            At Blogedium, explore diverse topics, share your thoughts, and be part of a vibrant community of bloggers.
                        </p>
                        <div className="flex flex-col gap-3">
                            <h2 className="text-lg font-semibold">Follow Us</h2>
                            <div className="flex flex-row gap-4">
                                <Link to="#" className="hover:scale-110 transition-transform">
                                    <LuInstagram size={28} className="text-[#E1306C]" />
                                </Link>
                                <Link to="#" className="hover:scale-110 transition-transform">
                                    <LuTwitter size={28} className="text-[#1DA1F2]" />
                                </Link>
                                <Link to="#" className="hover:scale-110 transition-transform">
                                    <BsThreads size={28} className="text-white" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row items-start gap-8 w-full md:w-[30%]">
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold mb-4 text-[#10B981]">Quick Links</h2>
                            <ul className="text-slate-300 text-sm space-y-2">
                                <Link to="/">
                                    <li className="hover:text-[#7C3AED] cursor-pointer transition-colors">Home</li>
                                </Link>
                                <Link to="/blogs">
                                    <li className="hover:text-[#7C3AED] cursor-pointer transition-colors">Blogs</li>
                                </Link>
                                <Link to="/contact">
                                    <li className="hover:text-[#7C3AED] cursor-pointer transition-colors">Contact Us</li>
                                </Link>
                                <Link to="#">
                                    <li className="hover:text-[#7C3AED] cursor-pointer transition-colors">About Us</li>
                                </Link>
                            </ul>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold mb-4 text-[#10B981]">Legal</h2>
                            <ul className="text-slate-300 text-sm space-y-2">
                                <li className="hover:text-[#7C3AED] cursor-pointer transition-colors">Privacy Policy</li>
                                <li className="hover:text-[#7C3AED] cursor-pointer transition-colors">Terms of Use</li>
                                <li className="hover:text-[#7C3AED] cursor-pointer transition-colors">Disclaimer</li>
                                <li className="hover:text-[#7C3AED] cursor-pointer transition-colors">FAQs</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col w-full md:w-[35%]">
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-6">
                            <IoNewspaper className="text-4xl text-[#7C3AED] mb-3" />
                            <h2 className="text-lg font-semibold mb-2 text-white">
                                Subscribe to our Newsletter
                            </h2>
                            <p className="text-slate-300 text-sm mb-4">
                                Stay updated with our latest blogs and news.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="flex-1 bg-white/20 border border-slate-400 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#7C3AED]" 
                                />
                                <button className="bg-[#7C3AED] text-white px-4 py-2 rounded-lg hover:bg-[#6D28D9] transition-colors text-sm font-medium whitespace-nowrap">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-row items-center gap-3">
                                <MdEmail size={20} className="text-[#7C3AED]" />
                                <p className="text-slate-300 text-sm">
                                    blogedium12@gmail.org
                                </p>
                            </div>
                            <div className="flex flex-row items-center gap-3">
                                <PiPhoneCallFill size={20} className="text-[#7C3AED]" />
                                <p className="text-slate-300 text-sm">
                                    +91 1234567890
                                </p>
                            </div>
                            <div className="flex flex-row items-start gap-3">
                                <IoLocation size={20} className="text-[#7C3AED] mt-1" />
                                <p className="text-slate-300 text-sm">
                                    123, XYZ Street, ABC City, State, Pincode: 123456
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="border-slate-600 my-6" />
                <p className="text-slate-400 text-center text-sm">
                    &copy; 2024 Blogedium. All rights reserved
                </p>
            </div>
        </div>
    );
}

export default Footer;
