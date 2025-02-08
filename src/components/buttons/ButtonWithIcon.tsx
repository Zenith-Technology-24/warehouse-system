import React, { useState } from "react";

type ButtonWithIconProps = {
    icon: JSX.Element;
    children: React.ReactNode;
    options?: { label: string; value: string }[];
    onClick?: () => void;
    onSelect?: (value: string) => void;
    variant?: "default" | "outline" | "ghost" | "destructive";
    size?: "sm" | "md" | "lg";
};

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
    icon,
    children,
    options = [],
    onClick,
    onSelect,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
        onClick?.();
    };

    const handleSelect = (value: string) => {
        onSelect?.(value);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block">
            <button
                onClick={handleToggle}
                className="flex items-center gap-2 rounded-lg border-gray-200 text-gray-500 outline-none transition border p-3"
            >
                {icon}
                {children}
            </button>

            {isOpen && options.length > 0 && (
                <div className="absolute mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ButtonWithIcon;
