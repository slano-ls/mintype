import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, setIsTheme } from "../store/actions";
import * as Misc from "../utils/misc";

export const options = await Misc.getThemeList();

function Theme({ isTheme }) {
    const {
        preferences: { theme },
    } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        const theme = localStorage.getItem("theme") || "mkbhd";
        dispatch(setTheme(theme));
    }, [dispatch]);

    // Set theme
    useEffect(() => {
        if (theme) {
            document.querySelector(".theme-area")?.childNodes.forEach((el) => {
                if (el instanceof HTMLDivElement)
                    el.classList.remove("selected");
            });
            document
                .querySelector(`div[id="${theme}"]`)
                ?.classList.add("selected");
            document.body.classList.remove(...options.map(obj => obj.name));
            document.body.classList.add(theme);
            localStorage.setItem("theme", theme);
        }
    }, [dispatch, theme]);

    const handleThemeSelected = ({ target }) => {
        if (target.id === theme) {
            target.blur();
            return;
        }
        dispatch(setTheme(target.id));
        target.blur();
    };

    const handleExitClick = (e) => {
        if (e.target.getAttribute("id") === "theme-main") {
            dispatch(setIsTheme(false));
        }
    };

    return (
        <div className={`theme-center ${isTheme ? "" : "hidden"}`} id="theme-main"  onClick={handleExitClick} >
            <div className="theme-area">
                {options.map((data, idx) => (
                    <div
                        className="theme-button"
                        key={idx}
                        id={data.name}
                        onClick={handleThemeSelected}
                        style={{color: data.mainColor, background: data.bgColor }}
                    >
                        {data.name}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Theme;
