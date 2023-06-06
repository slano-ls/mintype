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
                <p style={{ textIndent: "0rem" }}>
                    MinType is a minimal typing test platform where you can try and improve your typing speed by practicing typing different words. 
                  But Mintype is a little bit different than your average typing test website...
                  Mintype uses <b>Machine Learning and AI</b> in order to track and store your common mistakes when you type, and then gives you words which the model believes will push you to your limit
                 There is detailed documentation on how this all works, so feel free to click on the Github to check it all out
                    
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
