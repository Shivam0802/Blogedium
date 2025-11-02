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
        <div className="group select-none flex flex-col p-6 relative items-center justify-center bg-slate-900 border border-slate-800 shadow-xl rounded-xl">
            <div className="w-full">
                <div className="text-center p-4 flex-auto justify-center">
                    <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="group-hover:animate-bounce w-14 h-14 flex items-center fill-[#DC2626] mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clipRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            fillRule="evenodd"
                        ></path>
                    </svg>
                    <h2 className="text-3xl font-semibold py-4 text-white">Are you sure?</h2>
                    <p className="font-normal text-base text-slate-300 px-2">
                        Do you really want to continue? This process cannot be undone
                    </p>
                </div>
                <div className="p-2 mt-4 text-center space-x-4 flex justify-center">
                    <button
                        onClick={closeModal}
                        className="bg-slate-700 px-6 py-2.5 text-base shadow-sm font-medium tracking-wider border-2 border-slate-600 hover:border-slate-500 text-white rounded-lg hover:shadow-lg hover:bg-slate-600 transition ease-in duration-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-[#DC2626] hover:bg-[#B91C1C] px-6 py-2.5 text-base shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-[#DC2626] text-white rounded-lg transition ease-in duration-300"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteCard;