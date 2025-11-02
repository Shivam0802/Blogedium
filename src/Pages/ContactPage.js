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
            <div className="relative bg-gradient-to-br from-purple-50 via-white to-emerald-50 min-h-[35vh] md:min-h-[40vh] flex items-center">
                <div className="absolute top-0 left-0 w-full">
                    <Navbar />
                </div>
                <div className="w-full max-w-7xl mx-auto px-4 pt-24 pb-12 mt-16 text-center">
                    <h1 className="text-[2.5rem] md:text-[4rem] font-bold text-slate-800 mb-4">Contact Us</h1>
                    <p className="text-[1.1rem] md:text-[1.3rem] font-normal text-slate-600 max-w-2xl mx-auto">
                        We are always here to help you. If you have any queries or suggestions, feel free to contact us.
                    </p>
                </div>
            </div>
            <Contact />
            <Footer />
            <button onClick={openChatbot} className="bg-[#7C3AED] fixed bottom-16 right-4 rounded-full p-3 shadow-lg hover:bg-[#6D28D9] transition-colors z-40">
                <FaRobot size={24} className="text-white" />
            </button>
            <button onClick={goTop} className="bg-[#10B981] fixed bottom-4 right-4 rounded-full p-3 shadow-lg hover:bg-[#059669] transition-colors z-40">
                <FaArrowUp size={20} className="text-white" />
            </button>
            <Modal isVisible={isChatbotOpen} className="blur-[10px]">
                <Chatbot closeModal={closeChatbot} />
            </Modal>
        </motion.div>
    );
}

export default ContactPage;