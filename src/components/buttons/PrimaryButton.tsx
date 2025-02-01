import React from "react";


export interface ButtonProps {
    text: string,
    onClick?: () => void,
    data?: any,
    headers?: any
    status?: string
}

export const primaryButtonClassName = "rounded-lg font-lato bg-aaa text-white p-3";

const PrimaryButton: React.FC<ButtonProps> = ({ //Green Button
    onClick,
    text,
}) => {
    return (
        <button
            className={primaryButtonClassName}
            onClick={onClick}>{text}
        </button>
    );
};

export default PrimaryButton;
