import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Chatbot from "../Chatbot/Chatbot";
import Modal from "../Components/Modal";
import { FaArrowUp } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";
import { db } from '../firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import { IoIosArrowRoundForward } from "react-icons/io";


const SearchPage = () => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [allBlogs, setAllBlogs] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [newFilteredUsers, setNewFilteredUsers] = useState([]);
    const [newFilteredBlogs, setNewFilteredBlogs] = useState([]);

    const openChatbot = () => {
        setIsChatbotOpen(true);
    };

    const closeChatbot = () => {
        setIsChatbotOpen(false);
    };

    const goTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollectionRef = collection(db, 'users');
                const querySnapshot = await getDocs(usersCollectionRef);
                const usersData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setAllUsers(usersData);
                console.log('Fetched users:', usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogsCollectionRef = collection(db, 'blogs');
                const querySnapshot = await getDocs(blogsCollectionRef);
                const blogsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setAllBlogs(blogsData);
                console.log('Fetched blogs:', blogsData);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchInput(value);

        const newFilteredUsers = allUsers.filter(user =>
            user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value)
        );
        setNewFilteredUsers(newFilteredUsers);

        const newFilteredBlogs = allBlogs.filter(blog =>
            blog.title.toLowerCase().includes(value) || blog.description.toLowerCase().includes(value)
        );
        setNewFilteredBlogs(newFilteredBlogs);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setAllUsers(newFilteredUsers);
        setAllBlogs(newFilteredBlogs);
    };

    return (
        <>
            <div className="flex flex-row items-center gap-2 mx-4 my-4 cursor-pointer" onClick={() => window.history.back()}>
                <IoIosArrowDropleftCircle size={24} className="text-slate-600" />
                <h1 className="text-slate-600 font-medium text-base">Back</h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-4 flex flex-col gap-6">
                <div className="flex flex-col gap-4 md:flex-row bg-white rounded-xl shadow-md p-4">
                    <input
                        type="text"
                        placeholder="Search Bloggers and blogs..."
                        value={searchInput}
                        onChange={handleInputChange}
                        className="flex-1 h-11 px-4 text-base text-slate-700 placeholder-slate-400 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-[#7C3AED] bg-slate-50"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-base font-medium py-2.5 px-6 rounded-lg transition-colors shadow-sm"
                    >
                        Search
                    </button>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                    {allUsers.length ? (
                        allUsers.slice(0, 5).map((user, index) => (
                            <div key={index} className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                <img src={user.profileImage || "/Assets/user.png"} alt="" className="w-12 h-12 rounded-full border-2 border-[#7C3AED]" />
                                <div className="block border-l border-slate-200 ml-4 flex-1">
                                    <div className="pl-3">
                                        <h3 className="text-slate-800 font-semibold text-sm">{user.name}</h3>
                                    </div>
                                    <div className="flex gap-3 pt-2 pl-3">
                                        <button className="flex items-center text-[#7C3AED] text-xs font-medium hover:text-[#6D28D9] transition-colors">
                                            Follow
                                            <IoIosArrowRoundForward size={16} className="ml-1" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-slate-600 text-center col-span-full">No users found</p>
                    )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
                    {allBlogs.length ? (
                        allBlogs.slice(0, 5).map((blog, index) => (
                            <div key={index} className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 cursor-pointer">
                                <img
                                    src={blog.attachment}
                                    alt=""
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="p-4 flex flex-col gap-2">
                                    <p className="font-semibold text-slate-800 text-lg group-hover:text-[#7C3AED] transition-colors line-clamp-2">
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
                        ))
                    ) : (
                        <p className="text-slate-600 text-center col-span-full">No blogs found</p>
                    )}
                </div>
            </div>
            <button onClick={openChatbot} className="bg-[#7C3AED] fixed bottom-16 right-4 rounded-full p-3 shadow-lg hover:bg-[#6D28D9] transition-colors z-40">
                <FaRobot size={24} className="text-white" />
            </button>
            <button onClick={goTop} className="bg-[#10B981] fixed bottom-4 right-4 rounded-full p-3 shadow-lg hover:bg-[#059669] transition-colors z-40">
                <FaArrowUp size={20} className="text-white" />
            </button>
            <Modal isVisible={isChatbotOpen} className="blur-[10px]">
                <Chatbot closeModal={closeChatbot} />
            </Modal>
        </>
    );
}

export default SearchPage;
