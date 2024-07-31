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
            <div className="flex flex-row items-center gap-2 mx-4 my-2 cursor-pointer md:gap-2 md:mx-6 md:my-4" onClick={() => window.history.back()}>
                <IoIosArrowDropleftCircle size={25} className="text-[#F5FCCD]" />
                <h1 className="text-[#F5FCCD] font-medium text-[1.3rem]">Back</h1>
            </div>
            <div className="mx-4 mt-2 flex flex-col gap-4 bg-[#222831] bg-opacity-50 md:mx-28 md:mt-4">
                <div className="mt-6 mx-2 flex flex-col gap-4 rounded-lg md:flex-row md:mx-4">
                    <input
                        type="text"
                        placeholder="Search Bloggers and blogs..."
                        value={searchInput}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:outline-none"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-[#853C62] hover:bg-[#891652] text-white text-[1.2rem] font-normal py-2 px-4 rounded-full w-full md:w-[10%] h-fit"
                    >
                        Search
                    </button>
                </div>
                <div className="mt-10 mx-2 grid grid-cols-1 gap-4 rounded-lg md:grid-cols-2 lg:grid-cols-5 md:mx-4">
                    {allUsers.length ? (
                        allUsers.slice(0, 5).map((user, index) => (
                            <div key={index} className="flex items-center p-3 bg-white rounded-md shadow-lg md:h-24 md:w-[17.4rem]">
                                <section className="flex justify-center items-center w-14 rounded-full shadow-md bg-gradient-to-r from-[#F9C97C] to-[#A2E9C1] hover:from-[#C9A9E9] hover:to-[#7EE7FC] hover:cursor-pointer hover:scale-110 duration-300">
                                    <img src={user.profileImage || "/Assets/user.png"} alt="" className="w-12 h-12 rounded-full" />
                                </section>

                                <section className="block border-l border-gray-300 m-3">
                                    <div className="pl-3">
                                        <h3 className="text-gray-600 font-semibold text-md">{user.name}</h3>
                                        <h3 className="bg-clip-text text-transparent bg-gradient-to-l from-[#005BC4] to-[#27272A] text-sm font-light">
                                            {user.email}
                                        </h3>
                                    </div>
                                    <div className="flex gap-3 pt-2 pl-3">
                                        <button className="flex items-center text-gray-600 text-[0.9rem] font-normal rounded h-fit hover:text-red-300">
                                            Follow
                                            <IoIosArrowRoundForward size={20} className="textgray-800" />
                                        </button>
                                    </div>
                                </section>
                            </div>
                        ))
                    ) : (
                        <p className="text-white text-center">No users found</p>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-4">
                    {allBlogs.length ? (
                        allBlogs.slice(0, 5).map((blog, index) => (
                            <div key={index} className="m-2 group px-4 py-5 bg-white/10 rounded-lg flex flex-col items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#abd373] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0">
                                <img
                                    src={blog.attachment}
                                    alt=""
                                    className="w-40 h-40 object-cover rounded-full shadow-lg"
                                />
                                <div className="flex flex-col gap-2 w-full">
                                    <p className="cardtxt font-semibold text-gray-200 tracking-wider group-hover:text-gray-700 text-xl">
                                        {blog.title.slice(0, 15)}...
                                    </p>
                                    <p className="blueberry font-semibold text-gray-400 text-xs group-hover:text-gray-800">
                                        {blog.description.slice(0, 50)}...
                                    </p>
                                    <div className="ordernow flex flex-row justify-between items-center w-full">
                                        <p className="ordernow-text text-[#abd373] font-semibold group-hover:text-gray-800">
                                            {blog.likeCount || '0'} Likes
                                        </p>
                                        <Link to={`/blog/${blog.id}`} state={{ blog }}>
                                            <p className="btun4 lg:inline-flex items-center gap-3 group-hover:bg-white/10 bg-[#abd373] shadow-[10px_10px_150px_#ff9f0d] cursor-pointer py-2 px-4 text-sm font-semibold rounded-full butn">
                                                Read More
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-white text-center">No blogs found</p>
                    )}
                </div>
            </div>
            <button onClick={openChatbot} className="bg-[#C73659] fixed bottom-16 right-0 rounded-full px-[0.64rem] py-[0.64rem] mr-6 mb-6">
                <FaRobot size={27} className="text-[#F1F1F1]" />
            </button>
            <button onClick={goTop} className="bg-[#C73659] fixed bottom-0 right-0 rounded-full px-[0.64rem] py-[0.64rem] mr-6 mb-6">
                <FaArrowUp size={25} className="text-[#F1F1F1]" />
            </button>
            <Modal isVisible={isChatbotOpen} className="blur-[10px]">
                <Chatbot closeModal={closeChatbot} />
            </Modal>
        </>
    );
}

export default SearchPage;
