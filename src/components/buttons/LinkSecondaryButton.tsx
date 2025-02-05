import React from "react";
import { Link } from "react-router-dom";
import { LinkButtonProps } from "./LinkPrimaryButton";
import SecondaryButton from "./SecondaryButton";


const LinkSecondaryButton: React.FC<LinkButtonProps> = ({ //Green Button
    onClick = () => { },
    text,
    to,
    replace = false,
}) => {
    return (
        <Link to={to} replace={replace}>
            <SecondaryButton onClick={onClick} text={text}/>
        </Link>
    );
};

export default LinkSecondaryButton;
