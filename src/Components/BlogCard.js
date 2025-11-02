import React from "react";
import { Link } from "react-router-dom";

function BlogCard({ blog }) {
    if (!blog) {
        return <div className="m-2 p-5 bg-gray-200 rounded-lg text-gray-700">Blog data is missing</div>;
    }

    return (
        <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 cursor-pointer">
            <img src={blog.attachment || "/Assets/blog.png"} alt={blog.title || "Blog"} loading="lazy" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="flex flex-col gap-2 w-full p-4">
                <p className="font-semibold text-slate-800 text-lg group-hover:text-[#7C3AED] transition-colors line-clamp-2">
                    {blog.title.slice(0, 50) || "No Title"}...
                </p>
                <p className="text-slate-600 text-sm line-clamp-2">
                    {blog.description.slice(0, 50) || "No Description"}...
                </p>
                <div className="flex flex-row justify-between items-center w-full mt-2">
                    <p className="text-[#10B981] font-medium text-sm">
                        {blog.likes || blog.likeCount || "0"} Likes
                    </p>
                    <Link to={`/blog/${blog.id}`} state={{ blog }}>
                        <button className="bg-[#7C3AED] text-white py-1.5 px-4 text-sm font-medium rounded-lg hover:bg-[#6D28D9] transition-colors">
                            Read More
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default BlogCard;
