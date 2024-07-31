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
        <div className="flex justify-center items-center bg-[#1c1f1fcf] w-screen h-screen">
            <div className="flex flex-col items-center justify-center bg-[#EEEEEE] w-[90rem] h-auto rounded-lg">
                <h1 className="text-[2rem] md:text-[3rem] font-medium text-center">Publish Blog</h1>
                <form className="flex flex-col w-[90%] md:w-[97%] gap-4 mt-16 mb-2 overflow-auto" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="title" className="text-gray-700 text-[1rem] font-normal ml-1">
                            Title :
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                            placeholder="Title"
                            className="w-[100%] h-[2rem] bg-transparent border-b border-gray-500 px-2 bg-opacity-20 text-black focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="category" className="text-gray-700 text-[1rem] font-normal ml-1">
                            Category :
                        </label>
                        <select id="category" name="category" value={data.category} onChange={handleChange} className="w-[100%] h-[2rem] bg-transparent border-b border-gray-500 px-2 bg-opacity-20 text-black focus:outline-none">
                            <option value="">Select Category</option>
                            <option value="Technology">Technology</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Travel">Travel</option>
                            <option value="Sports">Sports</option>
                            <option value="Nature">Nature</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="description" className="text-gray-700 text-[1rem] font-normal ml-1">
                            Description :
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            className="w-full h-56 p-2 border border-gray-300 rounded-lg focus:outline-none"
                            placeholder="Write your content here..."
                        ></textarea>
                    </div>
                    <div className="grid w-full md:w-[100%] items-center">
                        <label className="text-gray-700 text-[1rem] font-normal ml-1">Picture</label>
                        <input
                            id="picture"
                            type="file"
                            ref={fileInputRef}
                            className="flex h-10 w-full rounded-md border border-input bg-white text-sm text-gray-400 file:border-0 file:mr-4 file:bg-[#FFF2E1] file:px-2 file:h-10 file:text-gray-600 file:text-[1.12rem] file:font-normal"
                            onChange={handleFileChange}
                        />
                    </div>
                    {selectedImage && (
                        <div className="mt-1 flex justify-center">
                            <img src={selectedImage} alt="Selected" className="h-fit w-full md:h-[10rem] md:w-[15rem] object-cover rounded-md" />
                        </div>
                    )}
                    <div className="flex flex-row items-center justify-center gap-4 mt-4">
                        <button
                            onClick={handleCancel}
                            className="w-[25%] h-[2.5rem] bg-[#A0153E] text-white font-normal hover:bg-[#944E63] focus:outline-none"
                        >
                            Cancel
                        </button>
                        <button type="submit" disabled={isSubmitDisabled} className={`w-[25%] h-[2.5rem] bg-[#FDAF7B] text-white font-normal hover:bg-[#FCC45C] focus:outline-none ${isSubmitDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
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