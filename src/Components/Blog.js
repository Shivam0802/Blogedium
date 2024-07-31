import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { IoIosArrowDropleftCircle } from 'react-icons/io';
import { TiHeartFullOutline, TiHeartOutline } from 'react-icons/ti';
import { FaShare, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { IoArrowUpSharp } from "react-icons/io5";
import { BsPersonFill } from "react-icons/bs";
import { db } from '../firebase.config';
import { doc, getDoc, updateDoc, collection, addDoc, query, where, getDocs, arrayUnion, arrayRemove } from 'firebase/firestore';

function Blog() {
    const location = useLocation();
    const blogFromLocation = location.state?.blog || {}; 
    const [blogData, setBlogData] = useState(blogFromLocation);
    const [formattedDate, setFormattedDate] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [viewCount, setViewCount] = useState(0);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (blogFromLocation.id) {
            const fetchBlogData = async () => {
                try {
                    const blogDocRef = doc(db, 'blogs', blogFromLocation.id);
                    const docSnap = await getDoc(blogDocRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setBlogData(data);
                        setLikeCount(data.likeCount || 0);
                        setViewCount(data.viewCount || 0);
                        if (data.timestamp) {
                            const date = data.timestamp.toDate ? data.timestamp.toDate() : new Date(data.timestamp);
                            setFormattedDate(formatDate(date));
                        }
                    } else {
                        console.log('No such document!');
                    }
                } catch (error) {
                    console.error('Error fetching blog:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchBlogData();
            fetchComments(blogFromLocation.id);
            incrementViewCount(blogFromLocation.id);
            checkIfBookmarked(blogFromLocation.id);
        } else {
            setIsLoading(false);
        }
    }, [blogFromLocation.id]);

    const fetchComments = async (blogId) => {
        const commentsRef = collection(db, 'comments');
        const q = query(commentsRef, where('blogId', '==', blogId));
        const querySnapshot = await getDocs(q);
        const commentsData = querySnapshot.docs.map(doc => doc.data());
        setComments(commentsData);
    };

    const incrementViewCount = async (blogId) => {
        try {
            const blogDocRef = doc(db, 'blogs', blogId);
            await updateDoc(blogDocRef, {
                viewCount: viewCount + 1,
            });
            setViewCount(viewCount + 1);
        } catch (error) {
            console.error('Error updating view count:', error);
        }
    };

    const checkIfBookmarked = async (blogId) => {
        try {
            if (user) {
                const bookmarksRef = doc(db, 'bookmarks', user.uid);
                const docSnap = await getDoc(bookmarksRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setIsBookmarked(data.bookmarks.includes(blogId));
                }
            }
        } catch (error) {
            console.error('Error checking bookmarks:', error);
        }
    };

    const handleLike = async () => {
        try {
            const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
            setLikeCount(newLikeCount);
            setIsLiked(!isLiked);

            if (blogFromLocation.id) {
                const blogDocRef = doc(db, 'blogs', blogFromLocation.id);
                await updateDoc(blogDocRef, { likeCount: newLikeCount });
            }
        } catch (error) {
            console.error('Error updating like count:', error);
        }
    };

    const handleCommentSubmit = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        try {
            if (newComment.trim() === '') return;

            const comment = {
                blogId: blogFromLocation.id,
                text: newComment,
                timestamp: new Date(),
                user: user ? user.name : 'Anonymous' // Replace with actual user info
            };

            await addDoc(collection(db, 'comments'), comment);
            setComments([...comments, comment]);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleShare = (platform) => {
        // Implement sharing logic here
        console.log(`Sharing on ${platform}`);
    };

    const handleBookmark = async () => {
        try {
            if (user) {
                const bookmarksRef = doc(db, 'bookmarks', user.uid);
                if (isBookmarked) {
                    await updateDoc(bookmarksRef, {
                        bookmarks: arrayRemove(blogFromLocation.id)
                    });
                } else {
                    await updateDoc(bookmarksRef, {
                        bookmarks: arrayUnion(blogFromLocation.id)
                    });
                }
                setIsBookmarked(!isBookmarked);
            } else {
                console.log('User not logged in');
            }
        } catch (error) {
            console.error('Error updating bookmarks:', error);
        }
    };

    const formatDate = (date) => {
        const options = {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };

        return date.toLocaleString('en-US', options);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!blogData) {
        return <div>No blog data available.</div>;
    }
    

    return (
        <>
            <div className="flex flex-row items-center gap-2 md:gap-2 m-6 cursor-pointer" onClick={() => window.history.back()}>
                <IoIosArrowDropleftCircle size={25} className="text-[#F5FCCD]" />
                <h1 className="text-[#F5FCCD] font-medium text-[1.3rem]">Back</h1>
            </div>
            <div className="mx-4 md:mx-10 my-10 md:mb-20 px-4 bg-gray-800 bg-opacity-20">
                <div className="flex flex-col md:flex-row gap-4 md:gap-10 mb-4">
                    <div className="flex flex-col rounded-md p-4 md:p-8 mt-4 w-full md:w-[30%]">
                        <div className="w-full md:w-[100%] flex ">
                            <img
                                src={blogData.attachment || '/Assets/default-image.jpg'} // Provide a fallback image
                                alt="Blog Image"
                                className="w-full h-fit md:w-[25rem] object-cover rounded-md mt-16"
                                loading='lazy'
                            />
                        </div>
                        <div className="flex items-center justify-center gap-10 mt-10 ">
                            <div className="flex items-center gap-1 mr-4 cursor-pointer" onClick={handleLike}>
                                {isLiked ? (
                                    <TiHeartFullOutline size={25} className="text-[#EF5A6F]" />
                                ) : (
                                    <TiHeartOutline size={25} className="text-[#EF5A6F]" />
                                )}
                                <span className="text-gray-300">Like</span>
                            </div>
                            <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleShare('facebook')}>
                                <FaShare size={20} className="text-[#E6B9A6]" />
                                <span className="text-gray-300">Share</span>
                            </div>
                            <div className="flex items-center gap-1 cursor-pointer" onClick={handleBookmark}>
                                {isBookmarked ? (
                                    <FaBookmark size={20} className="text-[#E6B9A6]" />
                                ) : (
                                    <FaRegBookmark size={20} className="text-[#E6B9A6]" />
                                )}
                                <span className="text-gray-300">Bookmark</span>
                            </div>
                        </div>
                        <div className="mt-8 bg-[#161515] p-4 ">
                            <h2 className="text-2xl font-medium text-gray-100 ml-2">Comments</h2>
                            <div className="flex flex-col gap-4 mt-4 max-h-[150px] overflow-y-auto hide-scrollbar">
                                {comments.map((comment, index) => {
                                    return (
                                        <div key={index} className="bg-[#212326ba] p-4 rounded-md md:w-[100%]">
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-row items-center gap-3'>
                                                    <div className='bg-gray-300 rounded-full p-1'>
                                                        <BsPersonFill size={22} className='text-gray-800' />
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <p className='text-gray-300 text-sm'>{comment.user}</p>
                                                        <p className="text-gray-500 text-sm">
                                                            {formatDate(comment.timestamp.toDate ? comment.timestamp.toDate() : new Date())}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <p className="text-gray-300">{comment.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="mt-8 p-2 md:w-[100%] bg-[#212326] ring-1 ring-gray-500 rounded-lg">
                                <textarea
                                    rows={2}
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="w-full px-2 pt-2 bg-transparent text-gray-300 focus:outline-none "
                                />
                                <div className='flex flex-row justify-between'>
                                    <button className="group flex items-center justify-start w-9 h-9 bg-[#FDE49E] rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-40 hover:rounded-lg active:translate-x-1 active:translate-y-1">
                                        <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                                            <HiOutlineEmojiHappy size={30} className="text-gray-800" />
                                        </div>
                                        <div className="absolute right-5 transform translate-x-full opacity-0 text-gray-900 text-lg font-normal transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                                            Add Emoji
                                        </div>
                                    </button>
                                    <button onClick={handleCommentSubmit} className="group flex items-center justify-start w-9 h-9 bg-[#A91D3A] rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-52 hover:rounded-lg active:translate-x-1 active:translate-y-1">
                                        <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                                            <IoArrowUpSharp size={20} className="text-white" />
                                        </div>
                                        <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-normal transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                                            Submit Comment
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col rounded-md p-4 md:p-8 mt-4 w-full md:w-[70%]">
                        <div className="flex flex-col w-full">
                            <h1 className="text-[2rem] md:text-[3rem] text-[#F5FCCD] font-medium mt-4">{blogData.title || 'No Title'}</h1>
                            <h3 className="text-[1.14rem] md:text-[1rem] text-gray-500 font-normal ml-2">{blogData.category || 'No Category'}</h3>
                            <p className="text-[1rem] md:text-[1.2rem] text-gray-400 font-normal mb-2 ml-2">Date: {formattedDate || 'No Date'}</p>
                            <p className="text-[#C7C1C1] first-letter:text-7xl first-letter:font-medium first-letter:text-yellow-200 first-letter:mr-3 first-letter:float-left text-light text-[1rem]">
                                {blogData.description || 'No Description'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Blog;
