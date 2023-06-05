import { store } from "../store/store";
import { setTime, timerSet, setMode, setLayout, setWordsConfig } from "../store/actions";

const { dispatch } = store;

export const setTimeConfig = (value) => {
    localStorage.setItem("time", value);
    dispatch(setTime(value));
    dispatch(timerSet(value));
};

export const setModeConfig = (value) => {
    localStorage.setItem("type", value);
    dispatch(setMode(value));
};

export const setWordsLimitConfig = (value) => {
    localStorage.setItem("wordsConfig", value);
    dispatch(setWordsConfig(value));
}

export const setLayoutConfig = (value) => {
    localStorage.setItem("layout", value);
    dispatch(setLayout(value))
};
