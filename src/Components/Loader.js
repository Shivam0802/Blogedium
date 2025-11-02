import React from 'react';

function Loader() {
    return (
        <div className="flex flex-row justify-center items-center gap-2 py-8">
            <div className="w-3 h-3 rounded-full bg-[#7C3AED] animate-bounce"></div>
            <div className="w-3 h-3 rounded-full bg-[#7C3AED] animate-bounce [animation-delay:-.15s]"></div>
            <div className="w-3 h-3 rounded-full bg-[#7C3AED] animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-3 h-3 rounded-full bg-[#10B981] animate-bounce [animation-delay:-.45s]"></div>
            <div className="w-3 h-3 rounded-full bg-[#10B981] animate-bounce [animation-delay:-.6s]"></div>
        </div>
    );
}

export default Loader;
