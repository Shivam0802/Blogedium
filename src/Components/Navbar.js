import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import DeleteCard from "./DeleteCard";
import Update from "./Update";
import Modal from "./Modal";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const { currentUser } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    const openModal = (content) => {
        setModalContent(content);
        setIsOpenModal(true);
    };

    const closeModal = () => {
        setIsOpenModal(false);
        setModalContent(null); // Clear the modal content when closing
    };

    return (
        <>
            <div className="absolute top-0 left-0 w-full p-4 z-50">
                <div className={`rounded-lg ${isOpen ? 'bg-[#2F3645] bg-opacity-80' : 'bg-[#2F3645] bg-opacity-15'} backdrop-blur-sm transition-all duration-300`}>
                    <div className="flex justify-between items-center h-[5rem] px-4">
                        <div>
                            <Link to="/">
                                <img src="/Assets/Logo.png" alt="logo" className="w-[10rem] h-fit rounded-lg" />
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-6 gap-4">
                            <Link to="/" className="flex items-center gap-1 text-white text-[1.16rem] font-normal hover:text-[#40A578]">
                                <img src="/Assets/Icons/home.svg" alt="home" className="w-7 h-7" />
                                Home
                            </Link>
                            <Link to="/blogs" className="flex items-center gap-1 text-white text-[1.16rem] font-normal hover:text-[#40A578]">
                                <img src="/Assets/Icons/blogs.svg" alt="blogs" className="w-5 h-5" />
                                Blogs
                            </Link>
                            <Link to="/search" className="flex items-center gap-1 text-white text-[1.16rem] font-normal hover:text-[#40A578]">
                                <FaSearch alt="about" className="w-4 h-4 text-[#BB9AB1]" />
                                Search
                            </Link>
                            <Link to="/contact" className="flex items-center gap-1 text-white text-[1.16rem] font-normal hover:text-[#40A578]">
                                <img src="/Assets/Icons/phone.png" alt="contact" className="w-[1.35rem] h-[1.35rem]" />
                                Contact
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-4 relative">
                            {currentUser ? (
                                <div className="relative">
                                    <button onClick={toggleDropdown} className="text-white text-[1.16rem] font-normal hover:text-[#40A578]">
                                        <div className="flex items-center p-3 w-58 h-16 bg-[#312f2f70] rounded-md shadow-lg">
                                            <section className="flex justify-center items-center w-14 h-14 rounded-full shadow-md hover:cursor-pointer hover:scale-110 duration-300">
                                                <img src="/Assets/man.png" alt="user" className="w-14 h-14" />
                                            </section>

                                            <section className="block border-l border-gray-300 m-3">
                                                <div className="pl-3">
                                                    <h3 className="text-red-200 font-normal text-[1.2rem] text-start">{user?.name}</h3>
                                                    <h3 className="text-white text-[0.7rem] font-light">{user?.email}</h3>
                                                </div>
                                            </section>
                                        </div>
                                    </button>
                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-[15.5rem] bg-white rounded-md shadow-lg py-2 z-10 ">
                                            <Link to="/profile" className="flex flex-row items-center gap-3 block px-2 py-1 text-[1.2rem] text-gray-800 hover:bg-gray-100">
                                                <img src="/Assets/user.png" alt="profile" className="w-6 h-6" />
                                                My Profile
                                            </Link>
                                            <button onClick={() => openModal(<Update closeModal={closeModal} />)} className="flex flex-row items-center gap-3 block w-full text-[1.2rem] text-left px-2 py-1 text-gray-800 hover:bg-gray-100">
                                                <img src="/Assets/update.png" alt="update" className="w-6 h-6" />
                                                Update
                                            </button>
                                            <button onClick={() => openModal(<DeleteCard closeModal={closeModal} />)} className="flex flex-row items-center gap-3 block w-full text-[1.2rem] text-left px-2 py-1 text-gray-800 hover:bg-gray-100">
                                                <img src="/Assets/delete.png" alt="delete" className="w-6 h-6" />
                                                Delete
                                            </button>
                                            <button onClick={handleLogout} className="flex flex-row items-center gap-2 block w-full text-left px-2 py-1 text-[1.2rem] text-gray-800 hover:bg-gray-100">
                                                <img src="/Assets/logout.png" alt="logout" className="w-6 h-6 ml-1" />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to="/login">
                                    <button className="text-gray-700 bg-[#FFE5B4] px-4 py-1 rounded-lg text-[1.16rem] font-normal hover:bg-[#FCC45C]">Login</button>
                                </Link>
                            )}
                        </div>
                        <div className="md:hidden flex items-center">
                            <button onClick={toggleMenu} className="text-white">
                                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                            </button>
                        </div>
                    </div>
                    {isOpen && (
                        <div className="md:hidden flex flex-col m-4 space-y-4 pb-4">
                            <Link to="/" className="flex items-center gap-3 text-white text-[1.16rem] font-normal hover:text-[#40A578]">
                                <img src="/Assets/Icons/home.svg" alt="home" className="w-7 h-7" />
                                Home
                            </Link>
                            <Link to="/blogs" className="flex items-center gap-3 text-white text-[1.16rem] font-normal hover:text-[#40A578]">
                                <img src="/Assets/Icons/blogs.svg" alt="blogs" className="w-5 h-5" />
                                Blogs
                            </Link>
                            <Link to="/search" className="flex items-center gap-3 text-white text-[1.16rem] font-normal hover:text-[#40A578]">
                                <FaSearch alt="about" className="w-4 h-4 text-[#BB9AB1]" />
                                Search
                            </Link>
                            <Link to="/contact" className="flex items-center gap-3 text-white text-[1.16rem] font-normal hover:text-[#40A578]">
                                <img src="/Assets/Icons/phone.png" alt="contact" className="w-[1.35rem] h-[1.35rem]" />
                                Contact
                            </Link>
                            {currentUser ? (
                                <div className="flex flex-col space-y-3">
                                    <Link to="/profile" className="flex items-center gap-3 text-white text-[1.16rem] font-normal hover:text-[#40A578]">
                                        <img src="/Assets/user.png" alt="profile" className="w-[1.35rem] h-[1.35rem]" />
                                        Profile
                                    </Link>
                                    <button onClick={() => openModal(<Update closeModal={closeModal} />)} className="flex items-center gap-3 text-white text-[1.16rem] font-normal hover:text-[#40A578]">
                                        <img src="/Assets/update.png" alt="update" className="w-[1.35rem] h-[1.35rem]" />
                                        Update
                                    </button>
                                    <button onClick={() => openModal(<DeleteCard closeModal={closeModal} />)} className="flex items-center gap-3 text-white text-[1.16rem] font-normal hover:text-[#40A578]">
                                        <img src="/Assets/delete.png" alt="delete" className="w-[1.35rem] h-[1.35rem]" />
                                        Delete
                                    </button>
                                    <button onClick={handleLogout} className="flex items-center gap-2 text-white text-[1.16rem] font-normal hover:text-[#40A578]">
                                        <img src="/Assets/logout.png" alt="logout" className="w-[1.35rem] h-[1.35rem] ml-1" />
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login">
                                    <button className="text-gray-700 bg-[#FFE5B4] px-4 py-1 rounded-lg text-[1.16rem] font-normal hover:bg-[#FCC45C]">Login</button>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Modal isVisible={isOpenModal} className="blur-[10px]">
                {modalContent}
            </Modal>
        </>
    );
}

export default Navbar;
