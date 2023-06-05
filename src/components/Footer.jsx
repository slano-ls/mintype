import { useState } from "react";
import { useEffect } from "react";
import { FaGithub, FaEnvelope } from "react-icons/fa";
import { RiBracesFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function Footer() {
    const [isMenu, setIsMenu] = useState(false);
    const [small, setSmall] = useState(
        window.matchMedia("(max-width: 380px)").matches
    );
    const [medium, setMedium] = useState(window.matchMedia("(max-width: 768px)").matches)
    useEffect(() => {
        window
            .matchMedia("(max-width: 380px)")
            .addEventListener("change", (e) => setSmall(e.matches));
        window
            .matchMedia("(max-width: 768px)")
            .addEventListener("change", (e) => setMedium(e.matches));
    }, [window]);

    const handleMenu = (e) => {
        e.stopPropagation();
        setIsMenu(() => !isMenu)
    }

    return (
        <div className="footer">
            <div className="left-footer">
                <a href="mailto:laws0817@gmail.com" className="textButton">
                    <FaEnvelope
                        style={{
                            marginRight: ".5rem",
                            color: "var(--hl-color)",
                        }}
                    />
                    <div className="text">Contact</div>
                </a>
                <a
                    href="https://github.com/slano-ls/mintype"
                    target="_blank"
                    className="textButton"
                >
                    <FaGithub
                        style={{
                            marginRight: ".4rem",
                            color: "var(--hl-color)",
                        }}
                    />
                    <div className="text">Github</div>
                </a>
                <a onClick={handleMenu} className="textButton">
                    <RiBracesFill
                        style={{
                            marginRight: ".4rem",
                            color: "var(--hl-color)",
                        }}
                    />
                    <div className="text">Contributors</div>
                </a>
                {isMenu && (
                    <div className="contributors-group">
                        <p>Saihaj Law</p>
                    </div>
                )}
            </div>
            <div className="right-footer">
                <a
                    href="http://it.cmtc.ac.th/web2017/"
                    target="_blank"
                    className="textButton"
                >
                    <div
                        className="text"
                        style={{ fontFamily: "'Noto Sans', sans-serif" }}
                    >
                        {small ? `mintype` : medium ? `mintype typing...` : `mintype, the minimal typing test`}
                    </div>
                </a>
            </div>
        </div>
    );
}

export default Footer;
