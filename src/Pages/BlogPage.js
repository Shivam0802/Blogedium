import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import BlogCard from "../Components/BlogCard";
import FilterComponent from "../Components/Filter";
import CustomAlert from "../Components/CustomAlerts";
import Modal from "../Components/Modal";
import Chatbot from "../Chatbot/Chatbot";
import Loader from "../Components/Loader";
import { db } from '../firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";

function BlogPage() {
    const [allBlogs, setAllBlogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const openChatbot = () => {
        setIsChatbotOpen(true);
    };

    const closeChatbot = () => {
        setIsChatbotOpen(false);
    };

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogsCollectionRef = collection(db, 'blogs');
                const querySnapshot = await getDocs(blogsCollectionRef);
                const blogsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                blogsData.sort((a, b) => b.timestamp - a.timestamp);
                setAllBlogs(blogsData);
                console.log('Fetched blogs:', blogsData);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                // Handle errors if necessary
            }
        };

        const delayLoading = async () => {
            await fetchBlogs();
            setTimeout(() => {
                setLoading(false);
            }, 5000);
        };

        delayLoading();
    }, []);


    useEffect(() => {
        if (selectedCategory) {
            const sectionId = selectedCategory.toLowerCase();
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [selectedCategory]);

    const filterTopBlogs = () => {
        return allBlogs.filter(blog =>
            (!searchQuery || blog.title.toLowerCase().includes(searchQuery.toLowerCase()))
        ).slice(0, 10);
    };

    const filterLatestBlogs = () => {
        return allBlogs.slice(0, 5);
    };

    const filterCategoryBlogs = (category) => {
        return allBlogs.filter(blog =>
            (category ? blog.category === category : true)
        );
    };

    const handleFilterChange = (filters) => {
        const { category, query } = filters;
        setSearchQuery(query);
        setSelectedCategory(category);
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
            <div className="relative bg-gradient-to-br from-purple-50 via-white to-emerald-50 min-h-[40vh] md:min-h-[45vh] flex items-center">
                <div className="absolute top-0 left-0 w-full">
                    <Navbar />
                </div>
                <div className="w-full max-w-7xl mx-auto px-4 pt-24 pb-12 mt-16 text-center">
                    <h1 className="text-[2.5rem] md:text-[4rem] font-bold text-slate-800 mb-4">Blogs</h1>
                    <p className="text-[1.1rem] md:text-[1.3rem] font-normal text-slate-600 max-w-2xl mx-auto">
                        Explore diverse topics, share your thoughts, and be part of a vibrant community of bloggers.
                    </p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto my-12 px-4">
                <FilterComponent onFilterChange={handleFilterChange} categories={['Technology', 'Lifestyle', 'Nature', 'Travel', 'Sports']} />
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <div className="flex flex-row gap-4 md:gap-6 justify-center items-center mb-8 mt-12">
                            <hr className="w-[20%] border-t-2 border-[#7C3AED]" />
                            <h1 className="text-[1.8rem] md:text-[2.5rem] font-bold text-slate-800">Top Blogs</h1>
                            <hr className="w-[20%] border-t-2 border-[#7C3AED]" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
                            {
                                filterTopBlogs().length ? (
                                    filterTopBlogs().map(blog => (
                                        <BlogCard key={blog.id} blog={blog} />
                                    ))
                                ) : (
                                    <p className="text-slate-600 col-span-full text-center">No blogs found.</p>
                                )
                            }
                        </div>
                        <div className="mb-12">
                            <div className="flex flex-row gap-4 md:gap-6 justify-center items-center mb-8">
                                <hr className="w-[20%] border-t-2 border-[#7C3AED]" />
                                <h1 className="text-[1.8rem] md:text-[2.5rem] font-bold text-slate-800">Latest Blogs</h1>
                                <hr className="w-[20%] border-t-2 border-[#7C3AED]" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {
                                    filterLatestBlogs().length ? (
                                        filterLatestBlogs().map(blog => (
                                            <BlogCard key={blog.id} blog={blog} />
                                        ))
                                    ) : (
                                        <p className="text-slate-600 col-span-full text-center">No blogs found.</p>
                                    )
                                }
                            </div>
                        </div>
                        {['Technology', 'Lifestyle', 'Nature', 'Travel', 'Sports'].map(category => (
                            <div id={category.toLowerCase()} key={category} className="mb-12">
                                <div className="flex flex-row gap-4 md:gap-6 justify-center items-center mb-8">
                                    <hr className="w-[20%] border-t-2 border-[#7C3AED]" />
                                    <h1 className="text-[1.8rem] md:text-[2.5rem] font-bold text-slate-800">
                                        {`${category} Blogs`}
                                    </h1>
                                    <hr className="w-[20%] border-t-2 border-[#7C3AED]" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                    {
                                        filterCategoryBlogs(category).length ? (
                                            filterCategoryBlogs(category).map(blog => (
                                                <BlogCard key={blog.id} blog={blog} />
                                            ))
                                        ) : (
                                            <p className="text-slate-600 col-span-full text-center">No blogs found in this category.</p>
                                        )
                                    }
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 bg-gradient-to-r from-purple-50 to-emerald-50 max-w-4xl mx-auto px-6 py-6 mb-8 rounded-xl shadow-md">
                <h2 className="text-base md:text-lg font-medium text-slate-800">Ready to share your thoughts?</h2>
                <Link to="/publish">
                    <button className="bg-[#7C3AED] text-white px-6 py-2.5 rounded-lg text-base font-medium hover:bg-[#6D28D9] transition-colors shadow-sm">
                        Publish a Blog
                    </button>
                </Link>
            </div>
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
            {alertMessage && <CustomAlert message={alertMessage} />}
        </motion.div>
    );
}

export default BlogPage;
