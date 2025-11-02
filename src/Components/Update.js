import React, { useState, useRef, useEffect } from 'react';
import { BsCloudUpload } from "react-icons/bs";
import { db, storage } from '../firebase.config';
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Update({ closeModal }) {
    const [profileImage, setProfileImage] = useState("/Assets/user.png");
    const [fileName, setFileName] = useState("Browse File to upload!");
    const [file, setFile] = useState(null);
    const [data, setData] = useState({
        bio: '',
        profileImage: '',
        socialLinks: {
            twitter: '',
            discord: '',
            instagram: '',
            twitch: '',
            youtube: ''
        }
    });
    const [socialLinks, setSocialLinks] = useState({
        twitter: '',
        discord: '',
        instagram: '',
        twitch: '',
        youtube: ''
    });

    const fileInputRef = useRef(null);

    const handleFileUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setProfileImage(fileURL);
            setFile(file);
            setFileName(file.name);
            console.log(`File selected: ${file.name}`);
        }
    };

    useEffect(() => {
        const uploadFile = () => {
            if (!file) return;

            const name = `${new Date().getTime()}-${file.name}`;
            const fileRef = ref(storage, name);
            const uploadTask = uploadBytesResumable(fileRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prevData) => ({
                            ...prevData,
                            profileImage: downloadURL
                        }));
                    });
                }
            );
        };

        uploadFile();
    }, [file]);

    const updateUserProfile = async (event) => {
        event.preventDefault();
        let User = localStorage.getItem('user');
        const userId = JSON.parse(User).uid;
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
            bio: data.bio,
            profileImage: data.profileImage,
            socialLinks: socialLinks
        });
        closeModal();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className='p-6'>
            <h2 className="text-3xl font-semibold text-slate-800 mb-6 text-center">Update Profile</h2>
            <form onSubmit={updateUserProfile}>
                <div className='bg-slate-900 p-6 rounded-lg shadow-lg mb-6 border border-slate-800'>
                    <label className="block text-base ml-2 font-medium text-white mb-4" htmlFor="profile_picture">Upload profile picture</label>
                    <div className='flex flex-col md:flex-row justify-around gap-6 items-center'>
                        <div className="flex justify-center md:justify-start">
                            <img src={profileImage} alt="Selected" className="h-40 w-40 md:h-56 md:w-56 object-cover rounded-lg border-2 border-slate-700" />
                        </div>
                        <div className="mb-4 flex flex-col items-center md:items-start">
                            <div className='h-[12rem] w-[12rem] md:h-[12rem] md:w-[20rem] border border-slate-700 rounded-lg flex flex-col items-center justify-between p-3 gap-3 bg-slate-800 shadow-md'>
                                <div className='flex-1 w-[100%] h-[100%] border-dashed border-2 border-slate-600 rounded-lg flex items-center justify-center flex-col hover:border-[#7C3AED] transition-colors'>
                                    <BsCloudUpload className='text-4xl text-[#7C3AED]' />
                                    <p className='text-center text-sm md:text-base text-slate-300 mt-2'>{fileName}</p>
                                </div>
                                <input type='file' id='file' ref={fileInputRef} className='hidden' onChange={handleFileChange} />
                                <button type="button" onClick={handleFileUploadClick} className='w-[100%] h-[40px] p-2 bg-[#7C3AED] hover:bg-[#6D28D9] border-2 cursor-pointer flex items-center justify-center text-white rounded-lg transition-colors font-medium'>
                                    Choose file to upload
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-base ml-2 font-medium text-slate-700 mb-2" htmlFor="bio">Bio</label>
                    <textarea
                        className="mt-1 p-3 w-full border border-slate-300 rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED]"
                        rows="3"
                        name="bio"
                        value={data.bio}
                        onChange={handleChange}
                        id="bio"
                        placeholder="Write something about yourself..."
                    ></textarea>
                </div>
                <hr className="mt-4 border-slate-300" />
                <div className='mb-6'>
                    <div className="mb-4">
                        <label className="block text-base ml-2 font-medium text-slate-700 mb-3">Social Media Links</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-1">
                            <input
                                type="url"
                                className="p-3 w-full border border-slate-300 rounded-lg bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED]"
                                placeholder="Instagram"
                                value={socialLinks.instagram}
                                onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                            />
                            <input
                                type="url"
                                className="p-3 w-full border border-slate-300 rounded-lg bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED]"
                                placeholder="Twitter"
                                value={socialLinks.twitter}
                                onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                            />
                            <input
                                type="url"
                                className="p-3 w-full border border-slate-300 rounded-lg bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED]"
                                placeholder="Discord"
                                value={socialLinks.discord}
                                onChange={(e) => setSocialLinks({ ...socialLinks, discord: e.target.value })}
                            />
                            <input
                                type="url"
                                className="p-3 w-full border border-slate-300 rounded-lg bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED]"
                                placeholder="Twitch"
                                value={socialLinks.twitch}
                                onChange={(e) => setSocialLinks({ ...socialLinks, twitch: e.target.value })}
                            />
                            <input
                                type="url"
                                className="p-3 w-full border border-slate-300 rounded-lg bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED]"
                                placeholder="Youtube"
                                value={socialLinks.youtube}
                                onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center gap-4">
                    <button type="button" onClick={closeModal} className="w-[30%] h-11 bg-slate-200 text-slate-800 font-medium hover:bg-slate-300 focus:outline-none rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button type='submit' className="w-[30%] h-11 bg-[#7C3AED] text-white font-medium hover:bg-[#6D28D9] focus:outline-none rounded-lg transition-colors shadow-sm">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Update;