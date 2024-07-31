import React from "react";

const Password = (props) => {
    return (
        <div style={{ padding: "10px", backgroundColor: "#181717ec", color: "rgba(158, 160, 161, 0.892)", borderRadius: "10px", marginTop: "10px", width:'310px' }}>
            <p>Here is the way to reset your password:</p>
            <ul>
                <li>{'>>'} Go to the login page</li>
                <li>{'>>'} Click on the "Forgot Password" link</li>
                <li>{'>>'} Enter your email address</li>
                <li>{'>>'} Check your email for a link to reset your password</li>
            </ul>
        </div>
    );
};

export default Password;