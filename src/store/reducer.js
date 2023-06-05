import { combineReducers } from "redux";
import {
    TIMER_DECREMENT,
    TIMERID_SET,
    TIMER_SET,
    SET_WORD,
    SET_CHAR,
    APPEND_TYPE_HISTORY,
    PREV_WORD,
    SET_WORDLIST,
    SET_REF,
    SET_CARET_REF,
    SET_THEME,
    SET_TIME,
    SET_MODE,
    SET_LAYOUT,
    SET_IS_CMDLINE,
    SET_IS_THEME,
    SET_WORDS_CONFIG,
    SET_TEST_ACTIVE,
    SET_TEST_DONE,
    SET_TEST_START,
    SET_TEST_END,
} from "./actions";

export const initialState = {
    time: {
        timer: 30,
        timerId: null,
        testStart: null,
        testEnd: null,
    },
    word: {
        currWord: "",
        typedWord: "",
        typedHistory: [],
        wordList: [],
        activeWordRef: null,
        caretRef: null,
    },
    preferences: {
        theme: "",
        timeLimit: 30,
        mode: "time",
        layout: "multi",
        wordsConfig: 25,
    },
    toggle: {
        isCmdLine: false,
        isTheme: false,
        testActive: false,
        testDone: false,
    },
};

// Timer Reducer
const timerReducer = (state = initialState.time, { type, payload }) => {
    switch (type) {
        case TIMER_DECREMENT:
            return { ...state, timer: state.timer - 0.1 };
        case TIMER_SET:
            return { ...state, timer: payload };
        case TIMERID_SET:
            return { ...state, timerId: payload };
        case SET_TEST_START:
            return { ...state, testStart: payload };
        case SET_TEST_END:
            return { ...state, testEnd: payload };
        default:
            return state;
    }
};

// Word Reducer
const wordReducer = (state = initialState.word, { type, payload }) => {
    switch (type) {
        case SET_WORD:
            return { ...state, typedHistory: [...state.typedHistory, payload] };
        case SET_CHAR:
            return { ...state, typedWord: payload };
        case APPEND_TYPE_HISTORY:
            const nextIdx =
                state.wordList.indexOf(
                    state.currWord,
                    state.typedHistory.length
                ) + 1;
            return {
                ...state,
                typedWord: "",
                currWord: state.wordList[nextIdx],
                typedHistory: [...state.typedHistory, state.typedWord],
            };
        case PREV_WORD:
            const prevIdx = state.wordList.indexOf(state.currWord) - 1;
            return {
                ...state,
                currWord: state.wordList[prevIdx],
                typedWord: !payload ? state.typedHistory[prevIdx] : "",
                typedHistory: state.typedHistory.splice(
                    0,
                    state.typedHistory.length - 1
                ),
            };
        case SET_REF:
            return {
                ...state,
                activeWordRef: payload,
            };
        case SET_CARET_REF:
            return {
                ...state,
                caretRef: payload,
            };
        case SET_WORDLIST:
            return {
                ...state,
                typedWord: "",
                typedHistory: [],
                currWord: payload[0],
                wordList: payload,
            };
        default:
            return state;
    }
};

// Preference Reducer
const preferenceReducer = (
    state = initialState.preferences,
    { type, payload }
) => {
    switch (type) {
        case SET_THEME:
            return { ...state, theme: payload };
        case SET_TIME:
            return { ...state, timeLimit: payload };
        case SET_MODE:
            return { ...state, mode: payload };
        case SET_LAYOUT:
            return { ...state, layout: payload };
        case SET_WORDS_CONFIG:
            return { ...state, wordsConfig: payload };
        default:
            return state;
    }
};

const toggleReducer = (state = initialState.toggle, { type, payload }) => {
    switch (type) {
        case SET_IS_CMDLINE:
            return { ...state, isCmdLine: payload };
        case SET_IS_THEME:
            return { ...state, isTheme: payload };
        case SET_TEST_ACTIVE:
            return { ...state, testActive: payload };
        case SET_TEST_DONE:
            return { ...state, testDone: payload };
        default:
            return state;
    }
};

export default combineReducers({
    time: timerReducer,
    word: wordReducer,
    preferences: preferenceReducer,
    toggle: toggleReducer,
});
