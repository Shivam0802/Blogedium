import React from 'react';

function Loader() {
    return (
        <div class="flex flex-row justify-center gap-3">
        <div class="w-4 h-2 rounded-full bg-[#536493] animate-bounce"></div>
        <div class="w-4 h-2 rounded-full bg-[#B4E380] animate-bounce [animation-delay:-.1s]"></div>
        <div class="w-4 h-2 rounded-full bg-[#EF5A6F] animate-bounce [animation-delay:-.2s]"></div>
        <div class="w-4 h-2 rounded-full bg-[#FFCBCB] animate-bounce [animation-delay:-.3s]"></div>
        <div class="w-4 h-2 rounded-full bg-[#468585] animate-bounce [animation-delay:-.5s]"></div>
      </div>
    );
}

export default Loader;
