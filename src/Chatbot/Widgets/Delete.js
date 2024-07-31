import React from "react";

const Delete = (props) => {
    return (
        <div style={{ padding: "10px", backgroundColor: "#181717ec", color: "rgba(158, 160, 161, 0.892)", borderRadius: "10px", marginTop: "10px", width:'310px' }}>
            <p>Here is the way to Delete your Blog:</p>
            <ul>
                <li>{'>>'} Go to the BlogSphere website</li>
                <li>{'>>'} Click on the "Profile" present in Navigation Bar</li>
                <li>{'>>'} Click on "Delete" button</li>
                <li>{'>>'} Confirm your Deletion</li>
                <li>{'>>'} Your Account will be deleted</li>
            </ul>
        </div>
    );  

}

export default Delete;