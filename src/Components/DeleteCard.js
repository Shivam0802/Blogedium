import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";


function DeleteCard({closeModal}) {

    const handleDelete = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        await deleteDoc(doc(db, "users", user.uid));
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    return (
        <div className="group select-none flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-md">
            <div className="">
                <div className="text-center p-3 flex-auto justify-center">
                    <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="group-hover:animate-bounce w-12 h-12 flex items-center text-gray-600 fill-red-500 mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clip-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            fill-rule="evenodd"
                        ></path>
                    </svg>
                    <h2 className="text-[2rem] font-normal py-4 text-gray-200">Are you sure?</h2>
                    <p className="font-light text-[1.2rem] text-gray-400 px-2">
                        Do you really want to continue ? This process cannot be undone
                    </p>
                </div>
                <div className="p-2 mt-2 text-center space-x-10 md:block">
                    <button
                        onClick={closeModal}
                        className="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-[1.2rem] shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-transparent px-5 ml-4 py-2 text-[1.2rem] shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteCard;