import React from "react";
import { ButtonProps } from "./PrimaryButton";

export const secondaryButtonClassname = "rounded-lg font-lato border-2 border-aaa text-aaa p-3";

const SecondaryButton: React.FC<ButtonProps> = ({ //Green Button
    onClick,
    text,
}) => {
    return (
        <button 
            className={secondaryButtonClassname}
            onClick={onClick}>{text}
        </button>
    );
};

export default SecondaryButton;
