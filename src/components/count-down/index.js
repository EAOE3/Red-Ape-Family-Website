import { useState, useEffect } from "react";


const CountDown = props => {

    const [timeLeft, setTimeLeft] = useState("");

    const countDownDate = new Date("Nov 25, 2021 14:00:00 GMT-05:00").getTime();

    useEffect(() => {
        const interval = setInterval(() => {
             // Get today's date and time
            var now = new Date().getTime();
                
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
                
            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
            // Output the result in an element with id="demo"
            setTimeLeft(days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds ");
                
            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(interval);                
            }
        }, 1000);
    });    

    return(
        <div className={props.className}>{timeLeft}</div>
    );
}

export default CountDown;