import {
    appendTypedHistory,
    backtrackWord,
    setChar,
    setTypedWord,
    setTestActive,
    setTestDone,
    setTestStart,
} from "../store/actions";
import { store } from "../store/store";
import { resetTest } from "./resetTest";
import { startTimer } from "./startTimer";

const handleBackspace = (ctrlKey) => {
    const { dispatch, getState } = store;
    const {
        word: { typedWord, typedHistory, currWord, activeWordRef, wordList },
    } = getState();
    const currIdx = wordList.indexOf(currWord);
    const currWordEl = activeWordRef?.current;

    if (
        typedWord.length === 0 &&
        typedHistory[currIdx - 1] !== wordList[currIdx - 1]
    ) {
        dispatch(backtrackWord(ctrlKey));
        currWordEl.previousElementSibling.classList.remove("right", "wrong");
        if (ctrlKey) {
            currWordEl.previousElementSibling.childNodes.forEach((char) => {
                char.classList.remove("wrong", "right");
            });
        }
    } else {
        if (ctrlKey) {
            dispatch(setTypedWord(""));
            currWordEl.childNodes.forEach((char) => {
                char.classList.remove("wrong", "right");
            });
        } else {
            const newTypedWord = typedWord.slice(0, typedWord.length - 1);
            dispatch(setTypedWord(newTypedWord));
        }
    }
};

export const recordTest = (key, ctrlKey) => {
    const { dispatch, getState } = store;
    const {
        time: { timer, timerId },
        word: { typedWord, currWord, activeWordRef, caretRef, wordList },
        preferences: { timeLimit, layout, mode },
        toggle: { testActive },
    } = getState();

    if (mode === "time") {
        if (Math.ceil(timer) == 0) {
            if (key === "Tab") {
                resetTest();
            }
            return;
        }
        if (timerId === null && key !== "Tab") startTimer();
    } else if (mode === "words") {
        if (testActive === false) {
            dispatch(setTestActive(true));
            dispatch(setTestStart(Date.now()));
            console.log("test active true");
        }

        const currIdx = wordList.indexOf(currWord);
        if (
            currWord.length == typedWord.length &&
            currIdx == wordList.length - 1
        ) {
            console.log("no more words");
            // dispatch(setTestActive(false));
            console.log("test not active, test done");
            dispatch(setTestDone(true));
            if (key === "Tab") {
                resetTest();
            }
            return;
        }
    }

    const currWordEl = activeWordRef?.current;

    if (layout === "multi") {
        currWordEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    const caret = caretRef?.current;
    caret.classList.remove("blink");
    setTimeout(() => caret.classList.add("blink"), 500);

    switch (key) {
        case "Tab":
            if (mode === "time") {
                if (Math.ceil(timer) == timeLimit || timerId) {
                    resetTest();
                    document.getElementsByClassName("word")[0].scrollIntoView();
                }
            } else {
                resetTest();
                document.getElementsByClassName("word")[0].scrollIntoView();
            }
            break;

        case " ":
            if (typedWord === "") return;
            if (layout === "single") {
                currWordEl.scrollIntoView({
                    behavior: "smooth",
                    inline: "start",
                });
            }
            currWordEl.classList.add(
                typedWord !== currWord ? "wrong" : "right"
            );
            dispatch(appendTypedHistory());

            if (wordList) break;

        case "Backspace":
            handleBackspace(ctrlKey);
            break;

        default:
            dispatch(setChar(typedWord + key));
            break;
    }
};
