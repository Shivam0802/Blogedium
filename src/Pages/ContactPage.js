import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Contact from "../Components/Contact";
import { motion } from "framer-motion";
import Chatbot from "../Chatbot/Chatbot";
import Modal from "../Components/Modal";
import { FaArrowUp } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";


function ContactPage() {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const openChatbot = () => {
        setIsChatbotOpen(true);
    };

    const closeChatbot = () => {
        setIsChatbotOpen(false);
    };

    const goTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="relative">
                <img
                    src="/Assets/background.jpg"
                    alt="img1"
                    className="w-full h-[40vh] md:h-[40vh] object-cover filter blur-[5px]"
                />
                <div className="absolute top-0 left-0 w-full">
                    <Navbar />
                </div>
                <div className="absolute top-1/2 left-1/3 md:left-1/2 transform -translate-x-[20%] md:-translate-x-1/3 -translate-y-[30%] text-white">
                    <h1 className="text-[2rem] md:text-[3.5rem] font-medium ml-12 md:ml-32">Contact Us</h1>
                    <p className="text-[1rem] md:text-[1.3rem] font-light md:mr-80 mt-4 text-justify">
                        We are always here to help you. If you have any queries or suggestions, feel free to contact us.
                    </p>
                </div>
            </div>
            <Contact />
            <Footer />
            <button onClick={openChatbot} className="bg-[#C73659] fixed bottom-16 right-0 rounded-full px-[0.64rem] py-[0.64rem] mr-6 mb-6">
                <FaRobot size={27} className="text-[#F1F1F1]" />
            </button>
            <button onClick={goTop} className="bg-[#C73659] fixed bottom-0 right-0 rounded-full px-[0.64rem] py-[0.64rem] mr-6 mb-6">
                <FaArrowUp size={25} className="text-[#F1F1F1]" />
            </button>
            <Modal isVisible={isChatbotOpen} className="blur-[10px]">
                <Chatbot closeModal={closeChatbot} />
            </Modal>
        </motion.div>
    );
}

export default ContactPage;