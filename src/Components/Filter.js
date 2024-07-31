import React, { useState } from 'react';

const FilterComponent = ({ onFilterChange }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        onFilterChange({ category, query: searchQuery });
    };

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        onFilterChange({ category: selectedCategory, query });
    };

    return (
        <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-8">
            <div className="flex flex-row items-center bg-white text-black pl-6 pr-4 py-1 border border-gray-300 rounded-lg max-w-full md:max-w-[60rem] w-full">
                <input
                    type="search"
                    placeholder="Search for blogs"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full bg-transparent focus:outline-none text-[1.25rem] placeholder-gray-500"
                />
                <img src="/Assets/Icons/search.svg" alt="Search" className="h-6 w-6 ml-2 cursor-pointer" />
            </div>
            <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="py-1 px-4 border rounded-lg w-full md:w-[15rem] bg-white text-black focus:outline-none"
            >
                <option value="">All Categories</option>
                <option value="Tech">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Travel">Travel</option>
                <option value="Sports">Sports</option>
                <option value="Nature">Nature</option>
            </select>
        </div>
    );
};

export default FilterComponent;
