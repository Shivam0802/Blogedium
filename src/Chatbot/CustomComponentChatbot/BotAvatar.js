import React from "react";

const BotAvatar = (props) => {
    return (
        <img
        src="/Assets/robot.png"
        alt="bot"
        {...props}
        className="w-10 h-10 rounded-full"
        />
    );
    }

export default BotAvatar;