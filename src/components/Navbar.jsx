import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaInfo, FaKeyboard, FaCog, FaPalette } from "react-icons/fa";
import { resetTest } from "../helpers/resetTest";
import { useDispatch } from "react-redux";
import { setIsCmdLine, setIsTheme } from "../store/actions";
import {
    setCurrentCommands,
    defalutCommands,
} from "../helpers/commandline-lists";
import Mascot from "./Mascot";
import Tooltip from "./Tooltip";

function Navbar() {
    const dispatch = useDispatch();
    const handleChangeRoute = () => {
        resetTest();
    };

    const handleSetting = () => {
        dispatch(setIsCmdLine(true));
        setCurrentCommands(defalutCommands);
    };

    const handleTheme = () => {
        dispatch(setIsTheme(true));
    };

    return (
        <div className="top">
            {/* Logo */}
            <div className="logo">
                <Link to="/" onClick={handleChangeRoute}>
                    <Mascot />
                    <div className="logo-text">MinType</div>
                </Link>
            </div>

            {/* Menu */}
            <div className="menu">
                <Tooltip text="Home">
                    <Link to="/" className="button" onClick={handleChangeRoute}>
                        <FaKeyboard />
                    </Link>
                </Tooltip>
                <Tooltip text="About">
                    <Link
                        to="/About"
                        className="button"
                        onClick={handleChangeRoute}
                    >
                        <FaInfo />
                    </Link>
                </Tooltip>
                <Tooltip text="Theme">
                    <div className="button" onClick={handleTheme}>
                        <FaPalette />
                    </div>
                </Tooltip>
                <Tooltip text="Setting">
                    <div className="button" onClick={handleSetting}>
                        <FaCog />
                    </div>
                </Tooltip>
            </div>
        </div>
    );
}

export default Navbar;
