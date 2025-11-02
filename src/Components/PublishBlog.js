import React, { useState, useEffect, useRef } from "react";
import { auth, db, storage } from '../firebase.config';
import { addDoc, collection } from 'firebase/firestore';
import CustomAlert from "./CustomAlerts";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { serverTimestamp } from "firebase/firestore";

function PublishBlog() {
    const [fileName, setFileName] = useState("Browse File to upload!");
    const [selectedImage, setSelectedImage] = useState(null);
    const fileSizeLimit = 5 * 1024 * 1024; // 5MB limit

    const [file, setFile] = useState(null);
    const [data, setData] = useState({
        title: '',
        description: '',
        attachment: '',
        category: '',
    });
    const [percentage, setPercentage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [type, setType] = useState('');

    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > fileSizeLimit) {
                alert("File size exceeds the 5MB limit. Please choose a smaller file.");
                return;
            }
            const fileURL = URL.createObjectURL(file);
            setSelectedImage(fileURL);
            setFile(file);
            setFileName(file.name);
            setUploading(true);
            console.log(`File selected: ${file.name}`);
        }
    };

    useEffect(() => {
        if (!file) return;

        const uploadFile = () => {
            const name = `${new Date().getTime()}-${file.name}`;
            const fileRef = ref(storage, name);
            const uploadTask = uploadBytesResumable(fileRef, file);

            try {
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setPercentage(progress);
                        console.log('Upload is ' + progress + '% done');
                    },
                    (error) => {
                        console.log(error);
                        setUploading(false);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setData((prevData) => ({
                                ...prevData,
                                attachment: downloadURL
                            }));
                            setPercentage(100); // Upload completed
                            setUploading(false);
                        });
                    }
                );
                setAlertMessage('Image uploaded successfully!');
                setType('success');
            }
            catch (error) {
                setAlertMessage('Error uploading file. Please try again.');
                setType('error');
            }
        };

        uploadFile();
    }, [file]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleCancel = (e) => {
        e.preventDefault();

        setData({
            title: '',
            description: '',
            category: '',
            attachment: ''
        });

        setFileName('Browse File to upload!');
        setSelectedImage(null);

        setAlertMessage('Publishing cancelled.');
        setType('information');

        window.history.back();

        setTimeout(() => {
            setAlertMessage('');
        }, 3000);

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (uploading) {
            alert("Please wait for the file upload to complete.");
            return;
        }

        try {
            await addDoc(collection(db, 'blogs'), {
                userId: auth.currentUser.uid,
                title: data.title,
                description: data.description,
                category: data.category,
                attachment: data.attachment,
                timestamp: serverTimestamp()
            });
            handleCancel(e);
            setAlertMessage('Blog published successfully!');
            setType('success');
        } catch (error) {
            setAlertMessage('Error publishing blog. Please try again.');
            setType('error');
        }
    };

    const isSubmitDisabled = !data.title || !data.description || !data.category || !data.attachment || uploading;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-emerald-50 py-12 px-4">
            <div className="flex flex-col items-center justify-center bg-white w-full max-w-4xl rounded-2xl shadow-xl p-6 md:p-10">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">Publish Blog</h1>
                <form className="flex flex-col w-full gap-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-sm font-medium text-slate-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                            placeholder="Enter blog title"
                            className="w-full h-12 px-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-[#7C3AED] bg-slate-50 text-slate-700"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="category" className="text-sm font-medium text-slate-700">
                            Category
                        </label>
                        <select 
                            id="category" 
                            name="category" 
                            value={data.category} 
                            onChange={handleChange} 
                            className="w-full h-12 px-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-[#7C3AED] bg-slate-50 text-slate-700"
                        >
                            <option value="">Select Category</option>
                            <option value="Technology">Technology</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Travel">Travel</option>
                            <option value="Sports">Sports</option>
                            <option value="Nature">Nature</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="description" className="text-sm font-medium text-slate-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            className="w-full h-56 p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:border-[#06B6D4] bg-slate-50 text-slate-700 resize-none"
                            placeholder="Write your content here..."
                        ></textarea>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700">Picture</label>
                        <input
                            id="picture"
                            type="file"
                            ref={fileInputRef}
                            className="flex h-12 w-full rounded-lg border border-slate-300 bg-slate-50 text-sm text-slate-600 file:border-0 file:mr-4 file:bg-[#7C3AED] file:px-4 file:py-2 file:rounded-lg file:text-white file:font-medium file:cursor-pointer hover:file:bg-[#6D28D9] transition-colors"
                            onChange={handleFileChange}
                        />
                    </div>
                    {selectedImage && (
                        <div className="flex justify-center">
                            <img src={selectedImage} alt="Selected" className="h-48 w-auto object-cover rounded-lg shadow-md" />
                        </div>
                    )}
                    <div className="flex flex-row items-center justify-center gap-4 mt-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="w-full md:w-[25%] h-11 bg-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={isSubmitDisabled} 
                            className={`w-full md:w-[25%] h-11 bg-[#7C3AED] text-white font-medium rounded-lg hover:bg-[#6D28D9] transition-colors shadow-sm ${isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            Publish
                        </button>
                    </div>
                </form>
            </div>
            {alertMessage && (
                <CustomAlert
                    message={alertMessage}
                    onClose={() => setAlertMessage('')}
                    type="information"
                />
            )}
        </div>
    );
}

export default PublishBlog;