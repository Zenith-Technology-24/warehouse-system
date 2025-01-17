import React, { ChangeEvent, useState } from "react"

interface SearchProps {
    handleFetchData: any
}

const Search: React.FC<SearchProps> = ({ handleFetchData }) => {
    const [search, setSearch] = useState<string>('')
    const [typingTimeout, setTypingTimeout] = useState<number>(0);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        clearTimeout(typingTimeout);
        setSearch(value);
        const timeoutId = setTimeout(() => {
            handleFetchData(value);
        }, 500);
        setTypingTimeout(timeoutId);
    };

    return (
        <div>
            <input
                id="search"
                name="search"
                value={search}
                onChange={handleChange}
                placeholder="Search"
                className="w-64 p-3 border bg-white border-gray-200 text-aaa rounded-lg outline-none focus:border-2 focus:border-aaa focus:outline-none focus:ring-0 transition"
            />
        </div>
    )
}

export default Search