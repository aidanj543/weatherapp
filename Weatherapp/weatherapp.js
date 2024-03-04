function updateClock(){
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    //this will add zeros to single digit numbers
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes <10) ? "0" + minutes: minutes;
    seconds = (seconds <10) ? "0" + seconds: seconds;

    //this line of code is basically the format of the clock
    let timeString = hours + ":" + minutes + ":" + seconds;

    //this will update the current clock div I put on the html code
    document.getElementById("clock").textContent = timeString;

    //this will call this function to update every second
    setTimeout(updateClock, 1000);
}

//this will call the updateClock function for the first time
updateClock();


