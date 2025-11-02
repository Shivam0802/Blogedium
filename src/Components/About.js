import React, { useState, useEffect } from "react";

const images = [
    {
        id: 1,
        src: "/Assets/Icons/about0.jpg"
    },
    {
        id: 2,
        src: "/Assets/Icons/about1.jpg"
    },
    {
        id: 3,
        src: "/Assets/Icons/about2.jpg"
    }
];

function About() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-between items-center">
                <div className="flex flex-col w-full md:w-[55%]">
                    <p className="text-base md:text-lg text-slate-700 font-normal leading-relaxed">
                        At Blogedium, we believe everyone has a story to tell. Our platform is dedicated to providing a space where bloggers can share their thoughts, connect with like-minded individuals, and inspire others.
                        <br /><br />Founded with the mission to empower voices from all walks of life, Blogedium is a hub for creativity, knowledge, and community. Whether you're a seasoned blogger or just starting, we welcome you to share your unique perspective.
                    </p>
                </div>
                <div className="relative flex flex-col items-center w-full md:w-[40%]">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-emerald-100 rounded-xl blur-md opacity-50"></div>
                    <img
                        key={images[currentIndex].id}
                        src={images[currentIndex].src}
                        alt="About"
                        className="relative z-10 w-full h-auto object-cover rounded-xl shadow-lg transition-opacity duration-500 ease-out"
                    />
                </div>
            </div>
        </div>
    );
}

export default About;
