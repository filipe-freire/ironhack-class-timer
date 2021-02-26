const timerDOMTag = document.getElementById('time');
const btn = document.querySelector('button');

let hasStarted = false;

let minutes = 0;
let seconds = 0;

const parseTime = () => {
  return minutes < 10 && seconds < 10
    ? `0${minutes}m:0${seconds}s`
    : minutes >= 10 && seconds < 10
    ? `${minutes}m:0${seconds}s`
    : minutes >= 10 && seconds >= 10
    ? `${minutes}m:${seconds}s`
    : minutes < 10 && seconds >= 10
    ? `0${minutes}m:${seconds}s`
    : null;
};

//! setInterval approach (not working on pause/resume)
const timerLogic = () => {
  let currentTimerValue;
  let intervalId = setInterval(() => {
    if (hasStarted) {
      // if (seconds <= 0 && minutes <= 0) {
      //   return clearInterval(intervalId);
      // }

      if (seconds === 59) {
        minutes++;
        seconds = 0;
        currentTimerValue = parseTime();
        timerDOMTag.innerText = currentTimerValue;
      } else {
        seconds++;
        // console.log(seconds);
        currentTimerValue = parseTime();
        timerDOMTag.innerText = currentTimerValue;
      }
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
};

btn.addEventListener('click', () => {
  if (hasStarted) {
    hasStarted = false;
    btn.classList.toggle('stop');
    btn.innerText = 'START';
  } else {
    hasStarted = true;
    btn.classList.toggle('stop');
    btn.innerText = 'STOP';
    timerLogic();
  }
});

timerDOMTag.innerText = `00m:00s`;
