import { useSelector } from "react-redux";

const Timer = () => {
    const {
        time: { timer, timerId },
        preferences: { timeLimit },
    } = useSelector((state) => state);

    const percent = (timer / timeLimit) * 100;

    return (
        <div className="timerWrapper" style={{ opacity: timerId ? 1 : 0 }}>
            <div
                className="timer"
                style={{
                    width: Math.ceil(timer) === 0 ? "0vw" : percent + "vw",
                }}
            ></div>
        </div>
    );
};

export default Timer;
