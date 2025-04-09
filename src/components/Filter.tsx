import { useState, useRef, useEffect } from "react";

interface FilterProps {
    listItems: string[]
    filterString: string
    setFilterString: React.Dispatch<React.SetStateAction<string>>,
}

const Filter = ({ listItems,  filterString, setFilterString }: FilterProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null); 
    const buttonRef = useRef<HTMLDivElement>(null); 

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            <div
                ref={buttonRef} 
                className="flex text-gray-500 gap-2 border p-3 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)} 
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.5 7h15M7 12h10m-7 5h4" />
                </svg>
                <p>{filterString !== '' ? filterString : 'Filter'}</p>
            </div>

            {isOpen && (
                <div ref={dropdownRef} className="border p-3 right-0 absolute mt-1 w-36 bg-white text-gray-700">
                    <ul className="flex flex-col gap-7">
                        {listItems.map((item, index) => (
                            <li onClick={() => {
                                    setFilterString(item);
                                    setIsOpen(false);
                                }} 
                                key={index} className="whitespace-nowrap hover:text-gray-900 cursor-pointer">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Filter;
