import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Theme from "./components/Theme";
import { useSelector, useDispatch } from "react-redux";
import CommandLine from "./components/CommandLine";
import { setIsTheme } from "./store/actions";
import { setLayoutConfig, setModeConfig, setTimeConfig, setWordsLimitConfig } from "./helpers/config";
import { initWords } from "./helpers/initWords";

function App() {
    const {
        toggle: { isCmdLine, isTheme },
    } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isTheme) {
            if (isCmdLine) {
                dispatch(setIsTheme(false))
                console.log('close theme');
            }
        }
    }, [isCmdLine])

    useEffect(() => {
        const time = localStorage.getItem("time") || 30;
        const type = localStorage.getItem("type") || "time";
        const wordsConfig = localStorage.getItem("wordsConfig") || 25;
        const layout = localStorage.getItem("layout") || "multi";

        setTimeConfig(time);
        setModeConfig(type);
        setWordsLimitConfig(wordsConfig);
        setLayoutConfig(layout);

        initWords(type, wordsConfig);
    }, [dispatch])

    return (
        <div className="App">
            <div className="container">
                <BrowserRouter>
                    <Navbar />
                    <Theme isTheme={isTheme} />
                    {isCmdLine && <CommandLine />}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
