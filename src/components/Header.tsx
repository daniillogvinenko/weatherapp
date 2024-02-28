import { useEffect, useState } from "react";

export const Header = () => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    useEffect(() => {
        const updateTimeInterval = setInterval(() => {
            const currentDate = new Date();
            setDate(`${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`);
            setTime(
                `${currentDate.getHours()}:${
                    currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes()
                }`
            );
        }, 1000);

        return () => {
            clearInterval(updateTimeInterval);
        };
    }, []);

    return (
        <div className="mb-3 flex justify-between">
            <div className="text-[18px] font-thin">{date}</div>
            <div className="text-[18px] font-thin">{time}</div>
        </div>
    );
};
