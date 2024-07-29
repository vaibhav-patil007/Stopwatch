let startTime=0;
let elapsedTime=0;
let intervalId;
let isRunning=false;

const display=document.getElementById("display");
const startStopButton=document.getElementById("startStop");
const resetButton=document.getElementById("reset");
const lapButton=document.getElementById("lap");
const lapsContainer=document.getElementById("laps");

startStopButton.addEventListener('click',() =>{
    if (isRunning){
        clearInterval(intervalId);
        startStopButton.textContent="Start";
        startStopButton.classList.remove("pause");
        resetButton.disabled=false;
        lapButton.disabled=true;
    }else{
        startTime= Date.now()-elapsedTime;
        intervalId=setInterval(updateDisplay,10);
        startStopButton.textContent="Pause";
        startStopButton.classList.add('pause');
        resetButton.disabled=true;
        lapButton.disabled=false;
    }
    isRunning=!isRunning;
});
resetButton.addEventListener('click',() =>{
    clearInterval(intervalId);
    startTime=0;
    elapsedTime=0;
    display.textContent='00:00:00:00';
    lapsContainer.innerHTML='';
    resetButton.disabled=true;
    lapButton.disabled=true;
});
lapButton.addEventListener('click',() => {
    const lapTime=formatTime(elapsedTime);
    const lapItem=document.createElement('li');
    lapItem.textContent=lapTime;
    lapsContainer.appendChild(lapItem)
});

function updateDisplay(){
    elapsedTime=Date.now()-startTime;
    display.textContent=formatTime(elapsedTime);
}

function formatTime(time){
    const date=new Date(time);
    const minutes=String(date.getUTCMinutes()).padStart(2,'0');
    const seconds=String(date.getUTCSeconds()).padStart(2,'0');
    const milliseconds=String(date.getUTCMilliseconds()).padStart(3,'0').slice(0,2);
    return `${minutes}:${seconds}.${milliseconds}`;
}