import React from "react";
import { Link } from "react-router-dom";

function BlogCard({ blog }) {
    if (!blog) {
        return <div className="m-2 p-5 bg-gray-200 rounded-lg text-gray-700">Blog data is missing</div>;
    }

    return (
        <div className="relative m-2 group bg-white/10 rounded-lg flex flex-col items-center gap-2 shadow-lg cursor-pointer transition-transform transform-gpu duration-300 hover:scale-105">
            <img src={blog.attachment || "/Assets/blog.png"} alt={blog.title || "Blog"} loading="lazy" className="w-full h-40 object-cover" />
            <div className="flex flex-col gap-2 w-full p-4">
            <p className="font-semibold text-gray-200 tracking-wider group-hover:text-gray-700 text-xl transition-colors duration-300">
                {blog.title.slice(0, 50) || "No Title"}...
            </p>
            <p className="font-semibold text-gray-600 text-xs transition-opacity duration-300 group-hover:opacity-70">
                {blog.description.slice(0, 50) || "No Description"}...
            </p>
            <div className="flex flex-row justify-between items-center w-full">
                <p className="text-[#abd373] font-semibold group-hover:text-gray-800 transition-colors duration-300">
                    {blog.likes || "0 Likes"}
                </p>
                <Link to={`/blog/${blog.id}`} state={{ blog }}>
                    <p className="lg:inline-flex items-center gap-3 py-2 px-4 text-sm font-normal text-gray-200 transition-colors duration-300 group-hover:bg-white/10 group-hover:text-gray-800 rounded-full">
                        Read More
                    </p>
                </Link>
            </div>
            </div>
            <div className="absolute inset-0 bg-[#abd373] z-[-10] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
    );
}

export default BlogCard;
