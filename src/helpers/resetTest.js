import {
    setTestActive,
    setTestDone,
    setTestEnd,
    setTestStart,
    setTimerId,
    timerSet,
} from "../store/actions";
import { store } from "../store/store";
import { initWords } from "./initWords";

export const resetTest = async () => {
    const { dispatch, getState } = store;

    const {
        time: { timerId, testStart, testEnd },
        preferences: { timeLimit, mode, wordsConfig },
        toggle: { testActive, testDone },
    } = getState();

    document
        .querySelectorAll(".wrong, .right")
        .forEach((el) => el.classList.remove("wrong", "right"));

    if (timerId) {
        clearInterval(timerId);
        dispatch(setTimerId(null));
    }
    if (testStart) {
        dispatch(setTestStart(null));
    }
    if (testEnd) {
        dispatch(setTestEnd(null));
    }
    if (mode === "words") {
        if (testDone === true) {
            dispatch(setTestDone(false));
        }
        if (testActive === true) {
            dispatch(setTestActive(false));
        }
    }

    initWords(mode, wordsConfig);
    dispatch(timerSet(timeLimit));
};
