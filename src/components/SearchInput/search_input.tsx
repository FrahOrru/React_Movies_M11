'use client';

import { useState, useEffect } from 'react';

interface SearchProps {
    onSearch: (searchTerm: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        console.log(searchTerm)
        onSearch(searchTerm);
    }, [searchTerm]);

    return (
        <div className="search-container">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search movies..."
                className="search-input"
            />
        </div>
    );
};

export default Search;
