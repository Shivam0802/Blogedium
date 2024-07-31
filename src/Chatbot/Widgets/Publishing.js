import React from "react";

const Publishing = (props) => {
    return (
        <div style={{ padding: "10px", backgroundColor: "#181717ec", color: "rgba(158, 160, 161, 0.892)", borderRadius: "10px", marginTop: "10px", width:'310px' }}>
            <p>Here is the way to Publish your Blog:</p>
            <ul>
                <li>{'>>'} Go to the BlogSphere website</li>
                <li>{'>>'} Click on the "Publish your Blog" link</li>
                <li>{'>>'} Enter your Blog title, Category & Description</li>
                <li>{'>>'} Click on the "Publish" button</li>
            </ul>
        </div>
    );  

}

export default Publishing;