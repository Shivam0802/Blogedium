import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";
import { FaArrowUp } from "react-icons/fa";
import { db } from '../firebase.config';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { motion } from "framer-motion";

function ProfilePage() {
    const [user, setUser] = useState({});
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isloading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const userId = JSON.parse(storedUser).uid;
                    if (userId) {
                        const userDocRef = doc(db, "users", userId);
                        const docSnap = await getDoc(userDocRef);
                        if (docSnap.exists()) {
                            setUser(docSnap.data());
                        } else {
                            console.log("No such document!");
                        }
                    } else {
                        console.log("User ID not found in localStorage.");
                    }
                } else {
                    console.log("No user data found in localStorage.");
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setError('Error fetching user.');
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const userId = JSON.parse(storedUser).uid;
                    if (userId) {
                        const blogsCollectionRef = collection(db, 'blogs');
                        const blogsQuery = query(blogsCollectionRef, where("userId", "==", userId));
                        const querySnapshot = await getDocs(blogsQuery);
                        const blogsData = querySnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        }));
                        console.log('Blogs data:', blogsData); // Debug: Check if blogs are fetched
                        setBlogs(blogsData);
                    } else {
                        console.log("User ID not found in localStorage.");
                    }
                } else {
                    console.log("No user data found in localStorage.");
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setError('Error fetching blogs.');
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };

        const delayLoading = async () => {
            await fetchBlogs();
            setTimeout(() => {
                setIsLoading(false);
            }, 5000);
        };

        delayLoading();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const goTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Navbar />
            <div className="max-w-7xl mx-auto mt-28 mb-10 px-4">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-[25%] mx-auto bg-white text-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-200">
                        <div className="flex items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-emerald-50">
                            <div className="w-32 h-32 bg-white rounded-full overflow-hidden border-4 border-[#7C3AED] shadow-md">
                                {user && user.profileImage ? <img src={user.profileImage} alt="profile" className="w-full h-full object-cover" /> : <img src="/Assets/user.png" alt="profile" className="w-full h-full" />}
                            </div>
                        </div>
                        <div className="px-6 py-4">
                            <div className="font-bold text-2xl text-slate-800 mb-1">{user.name || 'User'}</div>
                            <h4 className="text-slate-500 text-sm mb-4">{user.email || 'abc@gmail.com'}</h4>
                            <p className="text-slate-600 text-sm text-justify mb-4">
                                {user.bio || 'Share your thoughts and stories with the world...'}
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-slate-100 rounded-full px-3 py-1 text-sm font-medium text-slate-700 mr-2 mb-2">33 Followers</span>
                            <span className="inline-block bg-slate-100 rounded-full px-3 py-1 text-sm font-medium text-slate-700 mr-2 mb-2">50 Following</span>
                        </div>
                        <div className="px-6 py-4 mb-6">
                            <Link to="/publish">
                                <button className="w-full bg-[#7C3AED] text-white font-medium py-2.5 px-4 rounded-lg hover:bg-[#6D28D9] transition-colors shadow-sm">
                                    Create Blog
                                </button>
                            </Link>
                        </div>
                        <div className="px-6 py-4">
                            <p className="text-gray-400 mb-2">Social Links:</p>
                            <div className="flex space-x-3">
                                <Link to={user.socialLinks?.youtube || '#'} target="_blank" rel="noreferrer">
                                <svg stroke="currentColor" viewBox="0 0 24 24" className="text-red-400 w-5 hover:scale-125 duration-200 hover:cursor-pointer fill-red-400 stroke-2">
                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z">
                                    </path>
                                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                                </svg>
                                </Link>
                                <Link to={user.socialLinks?.twitch || '#'} target="_blank" rel="noreferrer">
                                <svg stroke="currentColor" viewBox="0 0 24 24" className="text-[#B692C2] w-5 hover:scale-125 duration-200 hover:cursor-pointer fill-[#B692C2] stroke-2">
                                    <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path>
                                </svg>
                                </Link>
                                <Link to={user.socialLinks?.instagram || '#'} target="_blank" rel="noreferrer">
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 24 24"
                                    className="text-red-400 w-5 hover:scale-125 duration-200 hover:cursor-pointer fill-red-400"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.417.398.59.205 1.016.453 1.47.906.454.454.701.88.906 1.47.158.447.342 1.246.398 2.417.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.398 2.417a3.727 3.727 0 01-.906 1.47c-.454.454-.88.701-1.47.906-.447.158-1.246.342-2.417.398-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.417-.398a3.727 3.727 0 01-1.47-.906c-.454-.454-.701-.88-.906-1.47-.158-.447-.342-1.246-.398-2.417C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.398-2.417a3.727 3.727 0 01.906-1.47c.454-.454.88-.701 1.47-.906.447-.158 1.246-.342 2.417-.398C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.717 0 8.31.012 7.052.07c-1.265.058-2.145.24-2.908.51-.794.278-1.45.648-2.109 1.307-.659.659-1.029 1.315-1.307 2.109-.27.763-.452 1.643-.51 2.908-.058 1.258-.07 1.665-.07 4.948s.012 3.69.07 4.948c.058 1.265.24 2.145.51 2.908.278.794.648 1.45 1.307 2.109.659.659 1.315 1.029 2.109 1.307.763.27 1.643.452 2.908.51 1.258.058 1.665.07 4.948.07s3.69-.012 4.948-.07c1.265-.058 2.145-.24 2.908-.51.794-.278 1.45-.648 2.109-1.307.659-.659 1.029-1.315 1.307-2.109.27-.763.452-1.643.51-2.908.058-1.258.07-1.665.07-4.948s-.012-3.69-.07-4.948c-.058-1.265-.24-2.145-.51-2.908a4.63 4.63 0 00-1.307-2.109c-.659-.659-1.315-1.029-2.109-1.307-.763-.27-1.643-.452-2.908-.51C15.69.012 15.283 0 12 0z"></path>
                                    <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.164a4.002 4.002 0 110-8.004 4.002 4.002 0 010 8.004zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"></path>
                                </svg>
                                </Link>
                                <Link to={user.socialLinks?.discord || '#'} target="_blank" rel="noreferrer">
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 24 24"
                                    className="text-blue-500 w-5 hover:scale-125 duration-200 hover:cursor-pointer fill-blue-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1337c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1336 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1066c.3608.698.7733 1.3628 1.225 1.9932a.076.076 0 00.0842.0276c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0303-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path>
                                </svg>
                                </Link>
                                <Link to={user.socialLinks?.twitter || '#'} target="_blank" rel="noreferrer">
                                <svg stroke="currentColor" viewBox="0 0 24 24" className="text-blue-300 w-5 hover:scale-125 duration-200 hover:cursor-pointer fill-blue-300 stroke-2">
                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z">
                                    </path>
                                </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-[75%] h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {blogs.length === 0 ? (
                            <div className="text-center text-slate-600 col-span-full py-12">No blogs available</div>
                        ) : (
                            isloading ? (
                                <Loader />
                            ) : (
                                blogs.map((blog) => (
                                    <div key={blog.id} className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 cursor-pointer">
                                        <img src={blog.attachment} alt="blog" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                                        <div className="p-4 flex flex-col gap-2">
                                            <p className="font-semibold text-slate-800 text-lg group-hover:text-[#7C3AED] transition-colors line-clamp-2">
                                                {blog.title}
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
                            ))}
                    </div>
                </div>
            </div>
            <Footer />
            <button onClick={goTop} className="bg-[#10B981] fixed bottom-4 right-4 rounded-full p-3 shadow-lg hover:bg-[#059669] transition-colors z-40">
                <FaArrowUp size={20} className="text-white" />
            </button>
        </motion.div>
    );
}

export default ProfilePage;
