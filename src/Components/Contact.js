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
            <div className="bg-opacity-50 p-4 md:p-8 h-auto md:w-[70%] md:h-[30rem] md:ml-[18rem] rounded-lg flex flex-col md:flex-row justify-between gap-6">
                <div className="flex w-full md:w-[50%]">
                    <div className="flex flex-col bg-gray-800 bg-opacity-50 rounded-lg px-4 py-4 md:px-10 md:py-4 w-full">
                        <h1 className="text-[2rem] md:text-[2.5rem] font-medium text-[#E6B9A6]">Contact Info</h1>
                        <div className="mt-4">
                            <div className="ml-4">
                                <span className="font-normal text-[1.2rem] md:text-[1.5rem] text-gray-400 flex items-center gap-1 ">
                                    <IoLocation size={25} style={{ color: '#FF6969' }} />
                                    Address:
                                </span>
                                <p className="ml-8 text-gray-200 text-[1rem] font-light ">123, XYZ Street, ABC City, 123456</p>
                            </div>
                            <div className="ml-4 mt-2">
                                <span className="font-normal text-[1.2rem] md:text-[1.5rem] text-gray-400 flex items-center gap-1">
                                    <PiPhoneCallFill size={25} style={{ color: '#7776B3' }} />
                                    Phone:
                                </span>
                                <Link to="tel:" className="ml-8 text-[#F7F9F2] text-[1rem] font-light hover:text-red-200">
                                    +91 1234567890
                                </Link>
                            </div>
                            <div className="ml-4 mt-2">
                                <span className="font-normal text-[1.2rem] md:text-[1.5rem] text-gray-400 flex items-center gap-1">
                                    <IoIosMail size={25} style={{ color: '#C4B877' }} />
                                    Email:
                                </span>
                                <Link to="mailto:" className=" ml-8 text-[#F7F9F2] text-[1rem] font-light hover:text-red-200">
                                    abc12@gmail.org
                                </Link>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h1 className="text-[1.5rem] md:text-[1.7rem] font-normal text-gray-200">Social Media:</h1>
                            <div className="flex items-center gap-4 mt-2">
                                <Link to="#" className="text-blue-200 hover:underline">
                                    <BsThreads size={25} style={{ color: '#F3F3F3' }} />
                                </Link>
                                <Link to="#" className="text-blue-200 hover:underline">
                                    <AiFillInstagram size={35} style={{ color: '#E1306C' }} />
                                </Link>
                                <Link to="#" className="text-blue-200 hover:underline">
                                    <AiOutlineTwitter size={35} style={{ color: '#5871AB' }} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col px-4 py-4 md:px-10 md:py-4 w-full md:w-[50%] shadow-md rounded-lg bg-gray-800 bg-opacity-30">
                    <h1 className="text-[2rem] md:text-[2.5rem] font-semibold text-gray-200">Contact Me</h1>
                    <form className="mt-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="name" className="text-gray-200">Name: </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="email" className="text-gray-200">Email: </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col mt-2">
                            <label htmlFor="subject" className="text-gray-200">Subject: </label>
                            <input
                                type="text"
                                name="subject"
                                value={data.subject}
                                onChange={handleChange}
                                placeholder="Subject"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="flex flex-col mt-2">
                            <label htmlFor="message" className="text-gray-200">Message: </label>
                            <textarea
                                placeholder="Message"
                                name="message"
                                value={data.message}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                width="100%"
                                rows="2"
                            ></textarea>
                        </div>
                        <button className="w-full bg-gradient-to-r from-[#75345E] via-[#D95F54] to-[#795E31] text-white p-2 rounded-md mt-4 focus:outline-none focus:ring focus:ring-blue-200">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Contact;