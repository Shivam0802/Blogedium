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
        <div className="md:mx-10 mb-20 px-4">
            <div className="flex flex-col md:flex-row gap-4 md:gap-10 justify-between items-center mb-4">
                <div className="flex flex-col items-center w-full md:w-[60%]">
                    <p className="text-[1.2rem] md:text-[1.4rem] text-gray-200 font-light text-justify">
                        At Blogedium, we believe everyone has a story to tell. Our platform is dedicated to providing a space where bloggers can share their thoughts, connect with like-minded individuals, and inspire others.
                        <br />Founded with the mission to empower voices from all walks of life, BlogSphere is a hub for creativity, knowledge, and community. Whether you're a seasoned blogger or just starting, we welcome you to share your unique perspective.
                    </p>
                </div>
                <div className="relative flex flex-col items-center mb-6 ml-4 w-full md:w-[40rem]">
                    <div className="absolute inset-0 bg-white blur-sm rounded-md"></div>
                    <img
                        key={images[currentIndex].id}
                        src={images[currentIndex].src}
                        alt="About"
                        className="relative z-10 w-full h-auto object-cover rounded-md transition-opacity duration-500 ease-out"
                    />
                </div>
            </div>
        </div>
    );
}

export default About;
