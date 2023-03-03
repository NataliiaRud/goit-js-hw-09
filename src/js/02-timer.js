import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const flatp = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const buttonEl = document.querySelector('.timer');

buttonEl.style.fontSize = '18px';
buttonEl.style.display = 'flex';
buttonEl.style.gap = '30px';
buttonEl.style.marginTop = '30px';

let selectedMs = null;
let timerId = null;

startBtn.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timeSelector(selectedDates);
  },
};

const flpi = flatpickr('#datetime-picker', options);

function timeSelector(selectedDates) {
  selectedMs = selectedDates[0].getTime();
  if (selectedMs < Date.now()) {
    Notiflix.Notify.failure('Please choose a date in the future');
  }
  startBtn.removeAttribute('disabled');
}

function timeMaker() {
  if (selectedMs > Date.now()) {
    timerId = setInterval(() => {
      const differ = selectedMs - Date.now();

      secondsEl.textContent = convertMs(differ).seconds;
      minutesEl.textContent = convertMs(differ).minutes;
      hoursEl.textContent = convertMs(differ).hours;
      daysEl.textContent = convertMs(differ).days;
      if (differ < 1000) {
        clearInterval(timerId);
      }
    }, 1000);
  }
  startBtn.setAttribute('disabled', 'true');
}

startBtn.addEventListener('click', timeMaker);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
