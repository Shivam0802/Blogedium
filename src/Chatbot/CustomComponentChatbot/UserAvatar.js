import React from "react";

const UserAvatar = (props) => {
    return (
        <img
            src="/Assets/chatuser.png"
            alt="user"
            {...props}
            className="w-10 h-10 rounded-full ml-2"
        />
    );
}

export default UserAvatar;