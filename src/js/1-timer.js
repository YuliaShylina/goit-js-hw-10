import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('button');
const dateTimePicker = document.querySelector('#datetime-picker');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

let selectedDate = 0;

const updateTimer = ({ days, hours, minutes, seconds }) => {
  dataDays.textContent = String(days).padStart(2, '0');
  dataHours.textContent = String(hours).padStart(2, '0');
  dataMinutes.textContent = String(minutes).padStart(2, '0');
  dataSeconds.textContent = String(seconds).padStart(2, '0');
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const startTimer = () => {
  const intervalId = setInterval(() => {
    const date = new Date();
    let differenceTime = selectedDate - date.getTime();
    const { days, hours, minutes, seconds } = convertMs(differenceTime);

    updateTimer({ days, hours, minutes, seconds });

    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(intervalId);
    }
  }, 1000);
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    let differenceDate = selectedDate - new Date().getTime();
    if (differenceDate <= 0) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
        color: '#FF2E2E',
        messageColor: '#ffffff',
        backgroundColor: '#FF2E2E',
        timeout: 5000,
        close: false,
        progressBar: false,
      });
      startButton.classList.remove('selectedBtn');
      return;
    }
    startButton.disabled = false;
    startButton.classList.add('selectedBtn');
  },
};

flatpickr('#datetime-picker', options);

startButton.addEventListener('click', () => {
  startTimer();
  startButton.disabled = true;
  dateTimePicker.disabled = true;
});
