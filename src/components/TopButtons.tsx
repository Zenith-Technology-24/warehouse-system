import React, { PropsWithChildren } from "react";

const TopButtons: React.FC<PropsWithChildren> = ({
    children
}) => {
    return (
        <div className="space-x-3 flex flex-row">
            {children}
        </div>
    );
};

export default TopButtons;
