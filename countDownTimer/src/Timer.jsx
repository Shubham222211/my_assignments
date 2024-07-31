import  { useEffect, useRef, useState } from "react";
import "./App.css";

function Timer() {
    const [count, setCount] = useState(10);
    let intervalId = useRef(null);

    useEffect(() => {
        function cleanUp() {
            clearInterval(intervalId.current);
        }
        return cleanUp;
    }, []);

    function StartTimer() {
        intervalId.current = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount <= 1) {
                    alert("Time Over!");
                    clearInterval(intervalId.current);
                }
                return prevCount - 1;
            });
        }, 1000);
    }

    function stopTimer() {
        clearInterval(intervalId.current);
    }

    function resetTimer() {
        stopTimer();
        setCount(10);
    }

    return (
        <div className="container">
            <h1>Count Down Timer</h1>
            <h2>Timer: {count}</h2>
            <div className="button-group">
                <button className="start-button" onClick={StartTimer}>Start</button>
                <button className="stop-button" onClick={stopTimer}>Stop</button>
                <button className="reset-button" onClick={resetTimer}>Reset</button>
            </div>
        </div>
    );
}

export default Timer;
