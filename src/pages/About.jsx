import React from "react";

function About() {
    const monkeytype = (
        <a href="https://monkeytype.com/" target="_blank">
            Monkeytype
        </a>
    );

    return (
        <div className="about">
            {/* section */}
            <div className="section">
                <h1>About</h1>
                <p style={{ textIndent: "4rem" }}>
                    MinType is a minimal typing test platform where you can try and improve your typing speed
                </p>
                <p style={{ textIndent: "4rem" }}>
                    
                </p>
            </div>
            <div className="section">
                <h1>Contributors</h1>
                <div className="contributors">
                    <p>Saihaj Law</p>
                </div>
            </div>
        </div>
    );
}

export default About;
