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
            <div className="flex flex-row items-center gap-2 m-6 cursor-pointer" onClick={() => window.history.back()}>
                <IoIosArrowDropleftCircle size={24} className="text-slate-600" />
                <h1 className="text-slate-600 font-medium text-base">Back</h1>
            </div>
            <div className="max-w-7xl mx-auto my-8 px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col w-full md:w-[30%] bg-white rounded-xl shadow-lg p-6">
                        <div className="w-full flex justify-center">
                            <img
                                src={blogData.attachment || '/Assets/default-image.jpg'}
                                alt="Blog Image"
                                className="w-full object-cover rounded-xl shadow-md"
                                loading='lazy'
                            />
                        </div>
                        <div className="flex items-center justify-center gap-6 mt-6 pb-6 border-b border-slate-200">
                            <button className="flex items-center gap-2 cursor-pointer hover:text-[#7C3AED] transition-colors" onClick={handleLike}>
                                {isLiked ? (
                                    <TiHeartFullOutline size={24} className="text-[#10B981]" />
                                ) : (
                                    <TiHeartOutline size={24} className="text-slate-400" />
                                )}
                                <span className="text-slate-700 text-sm font-medium">{likeCount} Likes</span>
                            </button>
                            <button className="flex items-center gap-2 cursor-pointer hover:text-[#7C3AED] transition-colors" onClick={() => handleShare('facebook')}>
                                <FaShare size={20} className="text-slate-400" />
                                <span className="text-slate-700 text-sm font-medium">Share</span>
                            </button>
                            <button className="flex items-center gap-2 cursor-pointer hover:text-[#7C3AED] transition-colors" onClick={handleBookmark}>
                                {isBookmarked ? (
                                    <FaBookmark size={20} className="text-[#7C3AED]" />
                                ) : (
                                    <FaRegBookmark size={20} className="text-slate-400" />
                                )}
                                <span className="text-slate-700 text-sm font-medium">Save</span>
                            </button>
                        </div>
                        <div className="mt-6">
                            <h2 className="text-xl font-bold text-slate-800 mb-4">Comments</h2>
                            <div className="flex flex-col gap-3 mt-4 max-h-[300px] overflow-y-auto">
                                {comments.length === 0 ? (
                                    <p className="text-slate-500 text-sm text-center py-4">No comments yet</p>
                                ) : (
                                    comments.map((comment, index) => {
                                        return (
                                            <div key={index} className="bg-slate-50 p-3 rounded-lg">
                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex flex-row items-center gap-3'>
                                                        <div className='bg-[#7C3AED] rounded-full p-1.5'>
                                                            <BsPersonFill size={18} className='text-white' />
                                                        </div>
                                                        <div className='flex flex-col'>
                                                            <p className='text-slate-800 text-sm font-medium'>{comment.user}</p>
                                                            <p className="text-slate-500 text-xs">
                                                                {formatDate(comment.timestamp.toDate ? comment.timestamp.toDate() : new Date())}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-col mt-2'>
                                                        <p className="text-slate-700 text-sm">{comment.text}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                            <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                                <textarea
                                    rows={3}
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-[#7C3AED] resize-none"
                                />
                                <div className='flex flex-row justify-end gap-2 mt-3'>
                                    <button onClick={handleCommentSubmit} className="bg-[#7C3AED] text-white px-5 py-2 rounded-lg hover:bg-[#6D28D9] transition-colors text-sm font-medium flex items-center gap-2">
                                        <IoArrowUpSharp size={18} />
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full md:w-[70%] bg-white rounded-xl shadow-lg p-6 md:p-8">
                        <div className="flex flex-col w-full">
                            <h1 className="text-3xl md:text-4xl text-slate-800 font-bold mb-2">{blogData.title || 'No Title'}</h1>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="bg-[#7C3AED] text-white px-3 py-1 rounded-full text-sm font-medium">{blogData.category || 'No Category'}</span>
                                <span className="text-slate-500 text-sm">Date: {formattedDate || 'No Date'}</span>
                            </div>
                            <div className="prose prose-slate max-w-none">
                                <p className="text-slate-700 leading-relaxed text-base md:text-lg large-first-letter">
                                    {blogData.description || 'No Description'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Blog;
