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
                <div className={`rounded-lg ${isOpen ? 'bg-white/95' : 'bg-white/90'} backdrop-blur-sm shadow-md transition-all duration-300`}>
                    <div className="flex justify-between items-center h-[4rem] px-4">
                        <div>
                            <Link to="/">
                                <img src="/Assets/Logo.png" alt="logo" className="w-[8rem] h-fit rounded-lg" />
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-6 gap-4">
                            <Link to="/" className="flex items-center gap-1 text-slate-700 text-[1rem] font-medium hover:text-[#7C3AED] transition-colors">
                                <img src="/Assets/Icons/home.svg" alt="home" className="w-5 h-5" />
                                Home
                            </Link>
                            <Link to="/blogs" className="flex items-center gap-1 text-slate-700 text-[1rem] font-medium hover:text-[#7C3AED] transition-colors">
                                <img src="/Assets/Icons/blogs.svg" alt="blogs" className="w-4 h-4" />
                                Blogs
                            </Link>
                            <Link to="/search" className="flex items-center gap-1 text-slate-700 text-[1rem] font-medium hover:text-[#7C3AED] transition-colors">
                                <FaSearch className="w-4 h-4" />
                                Search
                            </Link>
                            <Link to="/contact" className="flex items-center gap-1 text-slate-700 text-[1rem] font-medium hover:text-[#7C3AED] transition-colors">
                                <img src="/Assets/Icons/phone.png" alt="contact" className="w-[1.2rem] h-[1.2rem]" />
                                Contact
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-4 relative">
                            {currentUser ? (
                                <div className="relative">
                                    <button onClick={toggleDropdown} className="text-slate-700 text-[1rem] font-medium hover:text-[#7C3AED] transition-colors">
                                        <div className="flex items-center p-2 bg-slate-50 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                                            <section className="flex justify-center items-center w-10 h-10 rounded-full shadow-sm hover:scale-110 duration-300">
                                                <img src="/Assets/man.png" alt="user" className="w-10 h-10 rounded-full" />
                                            </section>

                                            <section className="block border-l border-slate-200 ml-2">
                                                <div className="pl-3">
                                                    <h3 className="text-slate-800 font-medium text-sm text-start">{user?.name}</h3>
                                                    <h3 className="text-slate-500 text-xs font-light">{user?.email}</h3>
                                                </div>
                                            </section>
                                        </div>
                                    </button>
                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-[14rem] bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-10">
                                            <Link to="/profile" className="flex flex-row items-center gap-3 block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                                                <img src="/Assets/user.png" alt="profile" className="w-5 h-5" />
                                                My Profile
                                            </Link>
                                            <button onClick={() => openModal(<Update closeModal={closeModal} />)} className="flex flex-row items-center gap-3 block w-full text-sm text-left px-3 py-2 text-slate-700 hover:bg-slate-50 transition-colors">
                                                <img src="/Assets/update.png" alt="update" className="w-5 h-5" />
                                                Update
                                            </button>
                                            <button onClick={() => openModal(<DeleteCard closeModal={closeModal} />)} className="flex flex-row items-center gap-3 block w-full text-sm text-left px-3 py-2 text-slate-700 hover:bg-slate-50 transition-colors">
                                                <img src="/Assets/delete.png" alt="delete" className="w-5 h-5" />
                                                Delete
                                            </button>
                                            <button onClick={handleLogout} className="flex flex-row items-center gap-2 block w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                                                <img src="/Assets/logout.png" alt="logout" className="w-5 h-5" />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                    <Link to="/login">
                                    <button className="bg-[#7C3AED] text-white px-5 py-2 rounded-lg text-[1rem] font-medium hover:bg-[#6D28D9] transition-colors shadow-sm">Login</button>
                                </Link>
                            )}
                        </div>
                        <div className="md:hidden flex items-center">
                            <button onClick={toggleMenu} className="text-slate-700">
                                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                            </button>
                        </div>
                    </div>
                    {isOpen && (
                        <div className="md:hidden flex flex-col m-4 space-y-3 pb-4">
                            <Link to="/" className="flex items-center gap-3 text-slate-700 text-[1rem] font-medium hover:text-[#7C3AED] transition-colors">
                                <img src="/Assets/Icons/home.svg" alt="home" className="w-5 h-5" />
                                Home
                            </Link>
                            <Link to="/blogs" className="flex items-center gap-3 text-slate-700 text-[1rem] font-medium hover:text-[#7C3AED] transition-colors">
                                <img src="/Assets/Icons/blogs.svg" alt="blogs" className="w-4 h-4" />
                                Blogs
                            </Link>
                            <Link to="/search" className="flex items-center gap-3 text-slate-700 text-[1rem] font-medium hover:text-[#7C3AED] transition-colors">
                                <FaSearch className="w-4 h-4" />
                                Search
                            </Link>
                            <Link to="/contact" className="flex items-center gap-3 text-slate-700 text-[1rem] font-medium hover:text-[#7C3AED] transition-colors">
                                <img src="/Assets/Icons/phone.png" alt="contact" className="w-[1.2rem] h-[1.2rem]" />
                                Contact
                            </Link>
                            {currentUser ? (
                                <div className="flex flex-col space-y-2">
                                    <Link to="/profile" className="flex items-center gap-3 text-slate-700 text-[1rem] font-medium hover:text-[#7C3AED] transition-colors">
                                        <img src="/Assets/user.png" alt="profile" className="w-[1.2rem] h-[1.2rem]" />
                                        Profile
                                    </Link>
                                    <button onClick={() => openModal(<Update closeModal={closeModal} />)} className="flex items-center gap-3 text-slate-700 text-[1rem] font-medium hover:text-[#7C3AED] transition-colors">
                                        <img src="/Assets/update.png" alt="update" className="w-[1.2rem] h-[1.2rem]" />
                                        Update
                                    </button>
                                    <button onClick={() => openModal(<DeleteCard closeModal={closeModal} />)} className="flex items-center gap-3 text-slate-700 text-[1rem] font-medium hover:text-[#7C3AED] transition-colors">
                                        <img src="/Assets/delete.png" alt="delete" className="w-[1.2rem] h-[1.2rem]" />
                                        Delete
                                    </button>
                                    <button onClick={handleLogout} className="flex items-center gap-2 text-slate-700 text-[1rem] font-medium hover:text-[#7C3AED] transition-colors">
                                        <img src="/Assets/logout.png" alt="logout" className="w-[1.2rem] h-[1.2rem]" />
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login">
                                    <button className="bg-[#7C3AED] text-white px-4 py-2 rounded-lg text-[1rem] font-medium hover:bg-[#6D28D9] transition-colors">Login</button>
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
