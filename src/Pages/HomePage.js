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
            <div className="relative">
                <img
                    src="/Assets/background.jpg"
                    alt="Background"
                    className="w-full h-[70vh] md:h-[68vh] object-cover filter blur-[5px]"
                />
                <div className="absolute top-0 left-0 w-full">
                    <Navbar />
                </div>
                <div className="absolute top-1/2 left-1/3 transform -translate-x-1/3 -translate-y-[40%] text-white">
                    <h1 className="text-[2rem] md:text-[3.5rem] font-medium">
                        Welcome to <br />
                        <strong className="text-[#E0A75E] text-[3rem] md:text-[5rem] font-medium" style={{ lineHeight: '1.3rem' }}>Blogedium</strong>.
                    </h1>
                    <p className="text-[1rem] md:text-[1.5rem] font-light md:mr-80 mt-4 text-justify">
                        Hello and welcome to Blogedium! 🖐🏼  <br />
                        At Blogedium, we celebrate every story and every voice. Explore diverse topics, share your thoughts, and be part of a vibrant community of bloggers.
                    </p>
                    <div className="flex flex-row items-center gap-4 mt-4 px-4 md:px-0 mb-4">
                        <Link to="/publish">
                            <button className="flex items-center px-2 md:px-4 bg-[#A0153E] text-gray-300 text-[1.12rem] text-white py-2 mt-4 rounded-md hover:bg-red-200 hover:text-gray-900">
                                Publish your Blog
                            </button>
                        </Link>
                        <button onClick={scrollToTrendingBlogs} className="flex items-center gap-2 text-gray-300 text-[1.15rem] text-white py-2 mt-4 rounded-md hover:text-red-300">
                            Explore Blogs
                            <HiMiniArrowLongRight className="inline-block" />
                        </button>
                    </div>
                </div>
            </div>
            <motion.div
                ref={aboutRef}
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                className="md:mx-10 my-20 px-4 bg-gray-800 bg-opacity-20"
            >
                <div className="flex flex-row gap-4 md:gap-10 justify-center items-center mb-4">
                    <hr className="w-[25%] border-[1px] border-[#A0153E]" />
                    <h1 className="text-[1.35rem] md:text-[4rem] font-normal text-[#D7E4C0]">About Us</h1>
                    <hr className="w-[25%] border-[1px] border-[#A0153E]" />
                </div>
                <About />
            </motion.div>
            <motion.div
                ref={fileInputRef} // Attach the ref here
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                className="md:mx-10 my-20 px-4 bg-gray-800 bg-opacity-20"
            >
                <div className="flex flex-row gap-4 md:gap-10 justify-center items-center mb-4">
                    <hr className="w-[25%] border-[1px] border-[#A0153E]" />
                    <h1 className="text-[1.35rem] md:text-[4rem] font-normal text-[#D7E4C0]">Trending Blogs</h1>
                    <hr className="w-[25%] border-[1px] border-[#A0153E]" />
                </div>
                {
                    loading ? <Loader /> : (
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-4">
                            {
                                blogs.map((blog, index) => (
                                    <div key={index} class="m-2 group px-4 py-5 bg-white/10 rounded-lg flex flex-col items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#abd373] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&amp;_p]:delay-200 [&amp;_p]:transition-all">
                                        <img
                                            src={blog.attachment}
                                            alt=""
                                            class="w-40 h-40 object-cover rounded-full shadow-lg"
                                        />
                                        <div className="flex flex-col gap-2 w-full">
                                            <p class="cardtxt font-semibold text-gray-200 tracking-wider group-hover:text-gray-700 text-xl">
                                                {blog.title.slice(0, 15)}...
                                            </p>
                                            <p class="blueberry font-semibold text-gray-400 text-xs group-hover:text-gray-800">
                                                {blog.description.slice(0, 50)}...
                                            </p>
                                            <div class="ordernow flex flex-row justify-between items-center w-full">
                                                <p class="ordernow-text text-[#abd373] font-semibold group-hover:text-gray-800">
                                                    {blog.likeCount || '0'} Likes
                                                </p>
                                                <Link to={`/blog/${blog.id}`} state={{ blog }}>
                                                    <p class="btun4 lg:inline-flex items-center gap-3 group-hover:bg-white/10 bg-[#abd373] shadow-[10px_10px_150px_#ff9f0d] cursor-pointer py-2 px-4 text-sm font-semibold rounded-full butn">
                                                        Read More
                                                    </p>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )).slice(0, 5) || 'No blogs found'
                            }
                        </div>
                    )}
                <div className="flex justify-end mr-4">
                    <Link to="/blogs">
                        <button className="flex items-center gap-2 text-gray-300 text-[1.15rem] text-white py-2 mt-4 rounded-md hover:text-red-300">
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
                className="md:mx-10 my-20 px-4 bg-gray-800 bg-opacity-20"
            >
                <div className="max-w-full mx-auto p-6 flex flex-col md:flex-row">
                    <div className="md:w-[40%] mt-10">
                        <img src="/Assets/Icons/faq.png" alt="Illustration" className="w-16 h-16" />
                        <h2 className="text-[2rem] font-light mb-4 text-gray-200">Frequently Asked
                            <br />
                            <strong className="text-[3rem] text-[#A0153E] font-normal" style={{ lineHeight: '1.2rem' }}>
                                Questions
                            </strong>
                        </h2>
                        <p className="w-full mb-8 text-white text-light">
                            <span className="text-[#EEF5FF] text-[1.3rem] text-normal">Have questions?</span>
                            <br /> We have answers! Check out our Frequently Asked Questions to know more about Blogedium.
                        </p>
                    </div>
                    <div className="md:w-[60%] mt-2">
                        <FAQ />
                    </div>
                </div>
            </motion.div>
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

