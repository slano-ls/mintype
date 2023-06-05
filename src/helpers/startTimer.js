import { setTimerId, timerDecrement } from "../store/actions";
import { store } from "../store/store";

export const startTimer = () => {
    const { dispatch } = store;
    const timerId = setInterval(() => {
        dispatch(timerDecrement());
    }, 100);

    dispatch(setTimerId(timerId));
};