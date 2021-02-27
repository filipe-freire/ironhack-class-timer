const timerDOMTag = document.getElementById('time');
const startBtn = document.getElementById('startBtn');

//TODO: FIX SET FUNCTIONALITY
// const resetBtn = document.getElementById('resetBtn');

let minutesInput = document.getElementById('minutes'); // .value;
let secondsInput = document.getElementById('seconds'); // .value;

let minutes = 0;
let seconds = 0;
let hasStarted = false;
let hasReset = false;

function setTimer() {
  if (seconds.value >= 60) {
    seconds.value = 59;
  }

  if (!hasStarted) {
    minutes = +minutesInput.value;
    seconds = +secondsInput.value;
    if (isNaN(minutes) || isNaN(seconds) || minutes < 0 || seconds < 0) return;

    if (seconds > 59) {
      seconds = 59;
      secondsInput.value = 59;
    }

    if (seconds < 0) {
      seconds = 0;
      secondsInput.value = 0;
    }
    timerDOMTag.innerText = parseTime();
  }
  return;
}

const increaseMinutesBtn = document
  .querySelector('.minutes-increase-btn')
  .addEventListener('click', () => {
    minutesInput.value++;
    setTimer();
  });

const decreaseMinutesBtn = document
  .querySelector('.minutes-decrease-btn')
  .addEventListener('click', () => {
    if (minutesInput.value - 1 < 0) return;
    minutesInput.value--;
    setTimer();
  });

const increaseSecondsBtn = document
  .querySelector('.seconds-increase-btn')
  .addEventListener('click', () => {
    if (secondsInput.valueAsNumber + 1 >= 60) return;
    secondsInput.value++;
    setTimer();
  });

const decreaseSecondsBtn = document
  .querySelector('.seconds-decrease-btn')
  .addEventListener('click', () => {
    if (secondsInput.value - 1 < 0) return;
    secondsInput.value--;
    setTimer();
  });

function parseTime() {
  return minutes < 10 && seconds < 10
    ? `0${minutes}m:0${seconds}s`
    : minutes >= 10 && seconds < 10
    ? `${minutes}m:0${seconds}s`
    : minutes >= 10 && seconds >= 10
    ? `${minutes}m:${seconds}s`
    : minutes < 10 && seconds >= 10
    ? `0${minutes}m:${seconds}s`
    : null;
}

//! setInterval approach (not working on pause/resume)
const timerLogic = () => {
  let currentTimerValue;
  let intervalId = setInterval(() => {
    if (hasStarted) {
      if (seconds <= 0 && minutes <= 0) {
        return clearInterval(intervalId);
      }

      if (seconds === 0) {
        minutes--;
        seconds = 59;
        currentTimerValue = parseTime();
        timerDOMTag.innerText = currentTimerValue;
      } else {
        seconds--;
        // console.log(seconds);
        currentTimerValue = parseTime();
        timerDOMTag.innerText = currentTimerValue;
      }
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
};

startBtn.addEventListener('click', () => {
  if (seconds < 0 || seconds > 59 || minutes < 0 || (minutes === 0 && seconds === 0)) {
    return;
  }
  if (hasStarted) {
    hasStarted = false;
    startBtn.classList.toggle('stop');
    startBtn.innerText = 'START';
  } else {
    hasStarted = true;
    startBtn.classList.toggle('stop');
    startBtn.innerText = 'STOP';
    timerLogic();
  }
});

//TODO: FIX SET FUNCTIONALITY
// resetBtn.addEventListener('click', () => {
//   hasStarted = false;
// });

timerDOMTag.innerText = `00m:00s`;
