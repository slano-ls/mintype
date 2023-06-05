import React, { useRef, useState, useEffect } from "react";
import {
    currentCommands,
    setCurrentCommands,
    defalutCommands,
} from "../helpers/commandline-lists";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { setIsCmdLine } from "../store/actions";

function CommandLine() {
    const {
        toggle: { isCmdLine },
    } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [inputVal, setInputVal] = useState("");
    const [subgroup, setSubgroup] = useState(false);
    const [isInput, setIsInput] = useState(false);
    const [cmdMouseMode, setCmdMouseMode] = useState(false);
    const commandInput = useRef(null);

    const filteredSearch = currentCommands.list.filter((val) => {
        if (inputVal === "") {
            return val;
        } else if (val.display.toLowerCase().includes(inputVal.toLowerCase())) {
            return val;
        }
    });

    const showInput = (command, placeholder, defalutValue = "") => {
        document.querySelector(".commandLine").classList.add('hidden');
        document.querySelector("#commandInput").classList.remove('hidden');
        document.querySelector("#commandInput input").setAttribute('placeholder', placeholder);
        // document.querySelector("#commandInput input").val
        document.querySelector("#commandInput input").setAttribute('command', "");
        document.querySelector("#commandInput input").setAttribute('command', command);
    }

    const trigger = (command) => {
        currentCommands.list.forEach((obj, idx) => {
            if (obj.id == command) {
                if (obj.input) {
                    setIsInput(true);
                    const escaped = obj.display.split("</i>")[1] ?? obj.display;
                    showInput(obj.id, escaped, obj.defaultValue)
                    console.log("this thing has to input");
                } else if (obj.subgroup) {
                    setSubgroup(true);
                    setCurrentCommands(obj.subgroup);
                    dispatch(setIsCmdLine(true));
                } else {
                    if (obj.exec) {
                        obj.exec();
                        dispatch(setIsCmdLine(false));
                    }
                }
                setInputVal("");
            }
        });
    };

    const escReturn = () => {
        currentCommands.list.forEach((obj, idx) => {
            if (obj.subgroup) {
                dispatch(setIsCmdLine(false));
            } else {
                setCurrentCommands(defalutCommands);
                dispatch(setIsCmdLine(true));
            }
        });
    };

    const handlePalletKeys = (e) => {
        if (e.key) {
            commandInput.current.focus();
        }
        if (e.key === "Tab") {
            e.preventDefault();
        }
        if (e.key === "Escape" && isCmdLine === true) {
            e.preventDefault();
            escReturn();
        }
        if (e.key === "Enter") {
            e.preventDefault();
            const cmdLists = Array.from(document.querySelectorAll(".cmdlist"));

            cmdLists.forEach((obj, idx) => {
                if (!obj.classList.contains("activeKeyboard")) {
                    return;
                } else {
                    const command = document
                        .querySelector(".cmdlist.activeKeyboard")
                        .getAttribute("command");
                    trigger(command);
                }
            });
        }
        if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Tab") {
            e.preventDefault();
            const cmdLists = Array.from(document.querySelectorAll(".cmdlist"));
            let activenum = -1;

            cmdLists.forEach((obj, idx) => {
                if (obj.classList.contains("activeKeyboard")) {
                    activenum = idx;
                }
            });

            if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
                cmdLists.forEach((obj, idx) => {
                    obj.classList.remove("activeKeyboard");
                });
                if (activenum === 0) {
                    cmdLists[cmdLists.length - 1].classList.add(
                        "activeKeyboard"
                    );
                } else {
                    cmdLists[--activenum].classList.add("activeKeyboard");
                }
            }

            if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
                cmdLists.forEach((obj, idx) => {
                    obj.classList.remove("activeKeyboard");
                });
                if (activenum + 1 == cmdLists.length) {
                    cmdLists[0].classList.add("activeKeyboard");
                } else {
                    cmdLists[++activenum].classList.add("activeKeyboard");
                }
            }
            document
                .querySelector(".cmdlist.activeKeyboard")
                .scrollIntoView({ block: "nearest" });
        }
        e.stopPropagation();
    };

    const handleExitClick = (e) => {
        if (e.target.getAttribute("class") === "commandLineWrapper") {
            dispatch(setIsCmdLine(false));
            setCurrentCommands(defalutCommands);
        }
    };

    const handleInputKeyup = (e) => {
        const cmdLists = Array.from(document.querySelectorAll(".cmdlist"));
        setCmdMouseMode(false);
        cmdLists.forEach((obj) => {
            if (e.key === "Escape") return;
            else {
                obj.classList.remove("activeMouse");
            }
        });
        if (
            e.key === "ArrowUp" ||
            e.key === "ArrowDown" ||
            e.key === "Enter" ||
            e.key === "Tab" ||
            e.key === "Escape" ||
            e.key.length > 1
        ) {
            return;
        }
    };

    const handleMouseMove = () => {
        if (!cmdMouseMode) {
            setCmdMouseMode(true);
        }
    };

    const handleMouseOver = () => {
        if (!cmdMouseMode) return;
        const cmdLists = Array.from(document.querySelectorAll(".cmdlist"));
        cmdLists.forEach((obj) => {
            obj.classList.remove("activeKeyboard");
        });
    };

    const handleMouseEnter = (e) => {
        if (!cmdMouseMode) return;
        e.target.classList.add("activeMouse");
    };

    const handleMouseLeave = (e) => {
        if (!cmdMouseMode) return;
        e.target.classList.remove("activeMouse");
    };

    const handleListClick = (e) => {
        trigger(e.currentTarget.getAttribute("command"));
    };

    return (
        <div
            className="commandLineWrapper"
            onKeyDown={handlePalletKeys}
            onClick={handleExitClick}
            onMouseMove={handleMouseMove}
        >
            <div className="commandLine">
                <div className="input-box">
                    <div className="search-icon">
                        <FaSearch />
                    </div>
                    <input
                        className="input"
                        placeholder="Type to search"
                        type="text"
                        ref={commandInput}
                        // onBlur={({ target }) => {
                        //     target.focus();
                        // }}
                        autoFocus
                        maxLength={32}
                        onChange={(e) => {
                            setInputVal(e.target.value);
                        }}
                        onKeyUp={handleInputKeyup}
                        value={inputVal}
                    />
                </div>
                {filteredSearch.length > 0 && (
                    <div className="suggestions" onMouseOver={handleMouseOver}>
                        {filteredSearch.map((obj, idx) => (
                            <div
                                className="cmdlist"
                                command={obj.id}
                                key={idx}
                                onMouseOver={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={handleListClick}
                            >
                                {obj.display}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div id="commandInput" className="hidden">
                <input className="input" placeholder="custom..." />
            </div>
        </div>
    );
}

export default CommandLine;
