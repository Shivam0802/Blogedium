import React from "react";
import { Link } from "react-router-dom";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { IoIosMail } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { PiPhoneCallFill } from "react-icons/pi";
import { BsThreads } from "react-icons/bs";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


function Contact() {

    const [data, setData] = React.useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, message } = data;
        const response = await fetch('https://formspree.io/f/mrbzgwap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        });

         if (response.ok) {
             alert('Message sent successfully');
             setData({ name: '', email: '', message: '' });
         } else {
             alert('Message not sent');
         }
    };

    return (
        <>
            <div className="max-w-7xl mx-auto p-4 md:p-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row justify-between gap-8">
                    <div className="flex w-full md:w-[45%]">
                        <div className="flex flex-col bg-gradient-to-br from-purple-50 to-emerald-50 rounded-xl px-6 py-6 w-full">
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Contact Info</h1>
                            <div className="space-y-5">
                                <div>
                                    <span className="font-semibold text-base md:text-lg text-slate-700 flex items-center gap-2 mb-2">
                                        <IoLocation size={22} className="text-[#7C3AED]" />
                                        Address:
                                    </span>
                                    <p className="ml-8 text-slate-600 text-sm">123, XYZ Street, ABC City, 123456</p>
                                </div>
                                <div>
                                    <span className="font-semibold text-base md:text-lg text-slate-700 flex items-center gap-2 mb-2">
                                        <PiPhoneCallFill size={22} className="text-[#7C3AED]" />
                                        Phone:
                                    </span>
                                    <Link to="tel:" className="ml-8 text-[#7C3AED] text-sm hover:text-[#6D28D9] font-medium">
                                        +91 1234567890
                                    </Link>
                                </div>
                                <div>
                                    <span className="font-semibold text-base md:text-lg text-slate-700 flex items-center gap-2 mb-2">
                                        <IoIosMail size={22} className="text-[#7C3AED]" />
                                        Email:
                                    </span>
                                    <Link to="mailto:" className="ml-8 text-[#7C3AED] text-sm hover:text-[#6D28D9] font-medium">
                                        abc12@gmail.org
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-8">
                                <h2 className="text-lg font-semibold text-slate-800 mb-4">Social Media</h2>
                                <div className="flex items-center gap-4">
                                    <Link to="#" className="hover:scale-110 transition-transform">
                                        <BsThreads size={24} className="text-slate-700" />
                                    </Link>
                                    <Link to="#" className="hover:scale-110 transition-transform">
                                        <AiFillInstagram size={28} className="text-[#E1306C]" />
                                    </Link>
                                    <Link to="#" className="hover:scale-110 transition-transform">
                                        <AiOutlineTwitter size={28} className="text-[#1DA1F2]" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full md:w-[50%]">
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Contact Us</h1>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label htmlFor="name" className="text-sm font-medium text-slate-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        placeholder="Full Name"
                                        className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-[#7C3AED] bg-slate-50"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="email" className="text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-[#7C3AED] bg-slate-50"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="subject" className="text-sm font-medium text-slate-700 mb-1">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={data.subject}
                                    onChange={handleChange}
                                    placeholder="Subject"
                                    className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-[#7C3AED] bg-slate-50"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="message" className="text-sm font-medium text-slate-700 mb-1">Message</label>
                                <textarea
                                    placeholder="Your message..."
                                    name="message"
                                    value={data.message}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-[#7C3AED] bg-slate-50 resize-none"
                                    rows="4"
                                ></textarea>
                            </div>
                            <button className="w-full bg-[#7C3AED] text-white p-3 rounded-lg mt-2 hover:bg-[#6D28D9] transition-colors font-medium shadow-sm">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;