import React from "react";

type ButtonWithIconProps = {
    icon: JSX.Element;
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "default" | "outline" | "ghost" | "destructive";
    size?: "sm" | "md" | "lg";
};

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
    icon,
    children,
    onClick
}) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 rounded-lg border-gray-200 text-gray-500 outline-none transition border p-3"
        >
            {icon}
            {children}
        </button>
    );
};

export default ButtonWithIcon;