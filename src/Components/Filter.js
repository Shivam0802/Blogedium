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
            <div className="flex flex-row items-center bg-white text-slate-700 pl-4 pr-4 py-2.5 border border-slate-300 rounded-lg max-w-full md:max-w-[60rem] w-full shadow-sm focus-within:border-[#7C3AED] focus-within:ring-2 focus-within:ring-purple-100 transition-all">
                <img src="/Assets/Icons/search.svg" alt="Search" className="h-5 w-5 mr-3 text-slate-400" />
                <input
                    type="search"
                    placeholder="Search for blogs"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full bg-transparent focus:outline-none text-base placeholder-slate-400"
                />
            </div>
            <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="py-2.5 px-4 border border-slate-300 rounded-lg w-full md:w-[15rem] bg-white text-slate-700 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 shadow-sm transition-all"
            >
                <option value="">All Categories</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Travel">Travel</option>
                <option value="Sports">Sports</option>
                <option value="Nature">Nature</option>
            </select>
        </div>
    );
};

export default FilterComponent;
