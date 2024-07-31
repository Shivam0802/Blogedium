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
        <div className='p-4'>
            <h2 className="text-[2.26rem] font-medium text-[#A34343] mb-4 text-center">Update Profile</h2>
            <form onSubmit={updateUserProfile}>
                <div className='bg-white p-4 rounded-md shadow-md mb-4'>
                    <label className="block text-[1.05rem] ml-2 font-medium text-gray-600" htmlFor="profile_picture">Upload profile picture :</label>
                    <div className='flex flex-col md:flex-row justify-around gap-6 items-center'>
                        <div className=" flex justify-center md:justify-start">
                            <img src={profileImage} alt="Selected" className="h-40 w-40 md:h-56 md:w-56 object-cover rounded-md" />
                        </div>
                        <div className="mb-4 flex flex-col items-center md:items-start">
                            <div className='h-[12rem] w-[12rem] md:h-[12rem] md:w-[20rem] border rounded-md flex flex-col items-center justify-between p-2 gap-3 bg-blue-100 shadow-md'>
                                <div className='flex-1 w-[100%] h-[100%] border-dashed border-2 border-blue-400 rounded-md flex items-center justify-center flex-col'>
                                    <BsCloudUpload className='text-4xl text-black' />
                                    <p className='text-center text-sm md:text-base'>{fileName}</p>
                                </div>
                                <input type='file' id='file' ref={fileInputRef} className='hidden' onChange={handleFileChange} />
                                <div htmlfor="file" className='w-[100%] h-[40px] p-[8px] bg-blue-50 border-2 cursor-pointer flex items-center justify-center text-black border-none' onClick={handleFileUploadClick}>
                                    choose file to upload
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-[1.05rem] ml-2 font-medium text-gray-600" htmlFor="bio">Bio :</label>
                    <textarea
                        className="mt-1 p-2 w-full border rounded-md text-normal text-gray-600"
                        rows="3"
                        name="bio"
                        value={data.bio}
                        onChange={handleChange}
                        id="bio"
                        placeholder="Write something about yourself..."
                    ></textarea>
                </div>
                <hr className="mt-4" />
                <div className='mb-4'>
                    <div className="mb-4">
                        <label className="block text-[1.05rem] ml-2 font-medium text-gray-600">Social Media Links:</label>
                        <div className="flex gap-4 mt-1">
                            <input
                                type="url"
                                className="p-2 w-full border rounded-md text-normal text-gray-600"
                                placeholder="Instagram"
                                value={socialLinks.instagram}
                                onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                            />
                            <input
                                type="url"
                                className="p-2 w-full border rounded-md text-normal text-gray-600"
                                placeholder="Twitter"
                                value={socialLinks.twitter}
                                onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                            />
                            <input
                                type="url"
                                className="p-2 w-full border rounded-md text-normal text-gray-600"
                                placeholder="Discord"
                                value={socialLinks.discord}
                                onChange={(e) => setSocialLinks({ ...socialLinks, discord: e.target.value })}
                            />
                            <input
                                type="url"
                                className="p-2 w-full border rounded-md text-normal text-gray-600"
                                placeholder="Twitch"
                                value={socialLinks.twitch}
                                onChange={(e) => setSocialLinks({ ...socialLinks, twitch: e.target.value })}
                            />
                            <input
                                type="url"
                                className="p-2 w-full border rounded-md text-normal text-gray-600"
                                placeholder="Youtube"
                                value={socialLinks.youtube}
                                onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                            />
                        </div>
                    </div>

                </div>
                <div className="flex flex-row items-center justify-center gap-4">
                    <button onClick={closeModal} className="w-[25%] h-[2.5rem] bg-[#A0153E] text-white font-normal hover:bg-[#944E63] focus:outline-none">
                        Cancel
                    </button>
                    <button type='submit' className="w-[25%] h-[2.5rem] bg-[#FDAF7B] text-white font-normal hover:bg-[#FCC45C] focus:outline-none">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Update;