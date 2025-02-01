import React from "react"
import { siteConfig } from "../constants/site"

const Loading: React.FC = () => {
    return (
        <div className="w-screen h-screen m-auto flex justify-center">
            <img className="w-52" src={siteConfig.logo} alt="Logo" />
        </div>
    )
}

export default Loading