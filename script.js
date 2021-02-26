const seconds = document.getElementById('time');
const btn = document.querySelector('button');
let sec = 0;
let hasStarted = false;

//! setInterval approach (not working on pause/resume)
const timerLogic = () => {
  let intervalId = setInterval(() => {
    if (hasStarted) {
      sec++;
      console.log(sec);
      seconds.innerText = sec;
    } else {
      console.log('I should just run once, run when hastStarted = false');
      clearInterval(intervalId);
    }
  }, 1000);
};

btn.addEventListener('click', () => {
  console.log('I was clicked 😨');

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

seconds.innerText = sec;
