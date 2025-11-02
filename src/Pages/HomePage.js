import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Modal from "../Components/Modal";
import Loader from "../Components/Loader";
import About from "../Components/About";
import FAQ from "../Components/Faq";
import Chatbot from "../Chatbot/Chatbot";
import CustomAlert from "../Components/CustomAlerts";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import { FaRobot } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";
import { db } from '../firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import { motion, useAnimation } from "framer-motion";

function HomePage() {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [loading, setLoading] = useState(true);

    const openChatbot = () => {
        setIsChatbotOpen(true);
    };

    const closeChatbot = () => {
        setIsChatbotOpen(false);
    };

    const fileInputRef = useRef(null);
    const aboutRef = useRef(null);
    const faqRef = useRef(null);

    const controls = useAnimation();

    const scrollToTrendingBlogs = () => {
        fileInputRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const animateOnScroll = () => {
        const aboutSection = aboutRef.current.getBoundingClientRect();
        const trendingSection = fileInputRef.current.getBoundingClientRect();
        const faqSection = faqRef.current.getBoundingClientRect();

        if (aboutSection.top < window.innerHeight && aboutSection.bottom >= 0) {
            controls.start({ opacity: 1, y: 0, transition: { duration: 0.6 } });
        }

        if (trendingSection.top < window.innerHeight && trendingSection.bottom >= 0) {
            controls.start({ opacity: 1, y: 0, transition: { duration: 0.6 } });
        }

        if (faqSection.top < window.innerHeight && faqSection.bottom >= 0) {
            controls.start({ opacity: 1, y: 0, transition: { duration: 0.6 } });
        }
    };

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogsCollectionRef = collection(db, 'blogs');
                const querySnapshot = await getDocs(blogsCollectionRef);
                const blogsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setBlogs(blogsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        const delayLoading = async () => {
            await fetchBlogs();
            setTimeout(() => {
                setLoading(false);
            }, 10000);
        };

        delayLoading();

        window.addEventListener('scroll', animateOnScroll);
        return () => window.removeEventListener('scroll', animateOnScroll);
    }, []);

    const goTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="relative bg-gradient-to-br from-purple-50 via-white to-emerald-50 min-h-[60vh] md:min-h-[65vh] flex items-center">
                <div className="absolute top-0 left-0 w-full">
                    <Navbar />
                </div>
                <div className="w-full max-w-7xl mx-auto px-4 pt-24 pb-12 mt-16 md:mt-20">
                    <div className="text-center md:text-left">
                        <h1 className="text-[2.5rem] md:text-[4rem] font-bold text-slate-800 mb-4">
                            Welcome to <br />
                            <span className="text-[#7C3AED]">Blogedium</span>
                        </h1>
                        <p className="text-[1.1rem] md:text-[1.3rem] font-normal text-slate-600 max-w-3xl mb-8">
                            Hello and welcome to Blogedium! 🖐🏼 <br />
                            At Blogedium, we celebrate every story and every voice. Explore diverse topics, share your thoughts, and be part of a vibrant community of bloggers.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link to="/publish">
                                <button className="flex items-center px-6 py-3 bg-[#7C3AED] text-white text-base font-medium rounded-lg hover:bg-[#6D28D9] transition-colors shadow-md">
                                    Publish your Blog
                                </button>
                            </Link>
                            <button onClick={scrollToTrendingBlogs} className="flex items-center gap-2 text-[#7C3AED] text-base font-medium py-3 hover:text-[#6D28D9] transition-colors">
                                Explore Blogs
                                <HiMiniArrowLongRight className="inline-block" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <motion.div
                ref={aboutRef}
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                className="max-w-7xl mx-auto my-16 px-4"
            >
                <div className="flex flex-row gap-4 md:gap-6 justify-center items-center mb-8">
                    <hr className="w-[20%] border-t-2 border-[#7C3AED]" />
                    <h1 className="text-[2rem] md:text-[3rem] font-bold text-slate-800">About Us</h1>
                    <hr className="w-[20%] border-t-2 border-[#7C3AED]" />
                </div>
                <About />
            </motion.div>
            <motion.div
                ref={fileInputRef}
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                className="max-w-7xl mx-auto my-16 px-4"
            >
                <div className="flex flex-row gap-4 md:gap-6 justify-center items-center mb-8">
                    <hr className="w-[20%] border-t-2 border-[#7C3AED]" />
                    <h1 className="text-[2rem] md:text-[3rem] font-bold text-slate-800">Trending Blogs</h1>
                    <hr className="w-[20%] border-t-2 border-[#7C3AED]" />
                </div>
                {
                    loading ? <Loader /> : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
                            {
                                blogs.map((blog, index) => (
                                    <div key={index} className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 cursor-pointer">
                                        <img
                                            src={blog.attachment}
                                            alt=""
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="p-4 flex flex-col gap-2">
                                            <p className="font-semibold text-slate-800 text-lg group-hover:text-[#7C3AED] transition-colors">
                                                {blog.title.slice(0, 20)}...
                                            </p>
                                            <p className="text-slate-600 text-sm line-clamp-2">
                                                {blog.description.slice(0, 50)}...
                                            </p>
                                            <div className="flex flex-row justify-between items-center w-full mt-2">
                                                <p className="text-[#10B981] font-medium text-sm">
                                                    {blog.likeCount || '0'} Likes
                                                </p>
                                                <Link to={`/blog/${blog.id}`} state={{ blog }}>
                                                    <button className="bg-[#7C3AED] text-white py-1.5 px-4 text-sm font-medium rounded-lg hover:bg-[#6D28D9] transition-colors">
                                                        Read More
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )).slice(0, 5) || 'No blogs found'
                            }
                        </div>
                    )}
                <div className="flex justify-center mt-8">
                    <Link to="/blogs">
                        <button className="flex items-center gap-2 text-[#7C3AED] text-base font-medium py-2 hover:text-[#6D28D9] transition-colors">
                            View All Blogs
                            <HiMiniArrowLongRight className="inline-block" />
                        </button>
                    </Link>
                </div>
            </motion.div>
            <motion.div
                ref={faqRef}
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                className="max-w-7xl mx-auto my-16 px-4"
            >
                <div className="bg-gradient-to-br from-purple-50 to-emerald-50 rounded-2xl p-8 md:p-12">
                    <div className="max-w-full mx-auto flex flex-col md:flex-row gap-8">
                        <div className="md:w-[40%]">
                            <h2 className="text-[2rem] md:text-[3rem] font-bold mb-4 text-slate-800">Frequently Asked
                                <br />
                                <span className="text-[#7C3AED]">Questions</span>
                            </h2>
                            <p className="w-full mb-8 text-slate-600 text-lg">
                                <span className="text-[#10B981] font-semibold">Have questions?</span>
                                <br /> We have answers! Check out our Frequently Asked Questions to know more about Blogedium.
                            </p>
                        </div>
                        <div className="md:w-[60%]">
                            <FAQ />
                        </div>
                    </div>
                </div>
            </motion.div>
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
            {alertMessage && (
                <CustomAlert
                    message={alertMessage}
                    onClose={() => setAlertMessage('')}
                    type="information"
                />
            )}
        </motion.div>
    );
}

export default HomePage;

