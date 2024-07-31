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
            <div className="relative">
                <img
                    src="/Assets/background.jpg"
                    alt="Background"
                    className="w-full h-[45vh] md:h-[50vh] object-cover filter blur-[5px]"
                />
                <div className="absolute top-0 left-0 w-full">
                    <Navbar />
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[20%] md:-translate-y-[40%] text-white text-center px-4">
                    <h1 className="text-[2.5rem] md:text-[4rem] font-medium">Blogs</h1>
                    <p className="text-[1rem] md:text-[1.5rem] font-medium">
                        Explore diverse topics, share your thoughts, and be part of a vibrant community of bloggers.
                    </p>
                </div>
            </div>
            <div className="md:mx-10 my-20 px-4">
                <FilterComponent onFilterChange={handleFilterChange} categories={['Technology', 'Lifestyle', 'Nature', 'Travel', 'Sports']} />
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <div className="flex flex-col md:flex-row gap-4 md:gap-4 justify-center items-center mb-4">
                            <hr className="w-full md:w-[25%] border-[1px] border-[#A0153E] mb-2 md:mb-0" />
                            <h1 className="text-yellow-100 text-[1.5rem] md:text-[2.5rem] font-normal">Top Blogs</h1>
                            <hr className="w-full md:w-[25%] border-[1px] border-[#A0153E] mt-2 md:mt-0" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-5">
                            {
                                filterTopBlogs().length ? (
                                    filterTopBlogs().map(blog => (
                                        <BlogCard key={blog.id} blog={blog} />
                                    ))
                                ) : (
                                    <p className="text-white">No blogs found.</p>
                                )
                            }
                        </div>
                        <div className="md:mx-10 my-20 px-4">
                            <div className="flex flex-col md:flex-row gap-4 md:gap-4 justify-center items-center mb-4">
                                <hr className="w-full md:w-[25%] border-[1px] border-[#A0153E] mb-2 md:mb-0" />
                                <h1 className="text-yellow-100 text-[1.5rem] md:text-[2.5rem] font-normal">Latest Blogs</h1>
                                <hr className="w-full md:w-[25%] border-[1px] border-[#A0153E] mt-2 md:mt-0" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-5">
                                {
                                    filterLatestBlogs().length ? (
                                        filterLatestBlogs().map(blog => (
                                            <BlogCard key={blog.id} blog={blog} />
                                        ))
                                    ) : (
                                        <p className="text-white">No blogs found.</p>
                                    )
                                }
                            </div>
                        </div>
                        {['Technology', 'Lifestyle', 'Nature', 'Travel', 'Sports'].map(category => (
                            <div id={category.toLowerCase()} key={category} className="md:mx-10 my-20 px-4">
                                <div className="flex flex-col md:flex-row gap-4 md:gap-4 justify-center items-center mb-4">
                                    <hr className="w-full md:w-[25%] border-[1px] border-[#A0153E] mb-2 md:mb-0" />
                                    <h1 className="text-yellow-100 text-[1.5rem] md:text-[2.5rem] font-normal">
                                        {`${category} Blogs`}
                                    </h1>
                                    <hr className="w-full md:w-[25%] border-[1px] border-[#A0153E] mt-2 md:mt-0" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-5">
                                    {
                                        filterCategoryBlogs(category).length ? (
                                            filterCategoryBlogs(category).map(blog => (
                                                <BlogCard key={blog.id} blog={blog} />
                                            ))
                                        ) : (
                                            <p className="text-white">No blogs found in this category.</p>
                                        )
                                    }
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-1 md:gap-40 bg-[#211f1f] bg-opacity-40 md:mx-[30rem] px-4 md:py-4 md:px-0 mb-4 md:w-[50%]">
                <h2 className="text-[1rem] md:text-[1.5rem] font-Light text-gray-200">Ready to share your thoughts?</h2>
                <Link to="/publish" >
                <button className="flex items-center px-2 md:px-4 bg-[#A0153E] text-gray-300 text-[1.12rem] text-white py-2 rounded-lg hover:bg-[#540a1f]">
                    Publish a Blog
                </button>
                </Link>
            </div>
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
            {alertMessage && <CustomAlert message={alertMessage} />}
        </motion.div>
    );
}

export default BlogPage;
