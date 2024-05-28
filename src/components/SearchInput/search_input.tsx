'use client';

import { useState, useEffect } from 'react';
import './search_input.modules.css';

interface SearchProps {
    onSearch: (searchTerm: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        console.log('aaaaa', searchTerm)
        onSearch(searchTerm);
    }, [searchTerm]);

    return (
        <div className="search-container w-full flex items-align justify-center">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search movies..."
                className="search-input bg-zinc-900"
            />
        </div>
    );
};

export default Search;
