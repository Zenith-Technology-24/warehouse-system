import React from "react";
import PrimaryButton, { ButtonProps } from "./PrimaryButton";
import { Link } from "react-router-dom";


export interface LinkButtonProps extends ButtonProps {
    to: string,
    replace?: boolean,
    onClick?: () => void,
}

const LinkPrimaryButton: React.FC<LinkButtonProps> = ({ //Green Button
    onClick = () => { },
    text,
    to,
    replace = false,
}) => {
    return (
        <Link to={to} replace={replace}>
            <PrimaryButton onClick={onClick} text={text} />
        </Link>
    );
};

export default LinkPrimaryButton;
