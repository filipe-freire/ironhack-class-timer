const timerDOMTag = document.getElementById('time');
const startBtn = document.getElementById('startBtn');
const date = document.getElementById('date');

date.innerText = `${new Date().getFullYear()}`;

const resetBtn = document.getElementById('resetBtn');

let minutesInput = document.getElementById('minutes'); // .value;
let secondsInput = document.getElementById('seconds'); // .value;

let minutes = 15;
let seconds = 0;
let hasStarted = false;

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

function setBtnToStart() {
  hasStarted = false;
  startBtn.classList.toggle('stop');
  startBtn.innerText = 'START';
}

function setBtnToStop() {
  hasStarted = true;
  startBtn.classList.toggle('stop');
  startBtn.innerText = 'STOP';
}

const timerLogic = () => {
  let currentTimerValue;
  let intervalId = setInterval(() => {
    if (hasStarted) {
      if (seconds <= 0 && minutes <= 0) {
        setBtnToStart();
        return clearInterval(intervalId);
      }
      if (seconds === 0) {
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
      currentTimerValue = parseTime();
      timerDOMTag.innerText = currentTimerValue;
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
};

// prevent double clicking on button
let processing = false;
startBtn.addEventListener('click', () => {
  if (!processing) {
    processing = true;
    const x = setTimeout(() => {
      if (seconds < 0 || seconds > 59 || minutes < 0 || (minutes === 0 && seconds === 0)) {
        return;
      }
      if (hasStarted) {
        setBtnToStart();
      } else {
        resetBtn.style.display = 'block';
        setBtnToStop();
        timerLogic();
      }
      processing = false;
    }, 300);
  }
});

resetBtn.addEventListener('click', () => {
  minutes = +minutesInput.value;
  seconds = +secondsInput.value;

  if (!hasStarted) {
    currentTimerValue = parseTime();
    timerDOMTag.innerText = currentTimerValue;
  }
});

timerDOMTag.innerText = `00m:00s`;
