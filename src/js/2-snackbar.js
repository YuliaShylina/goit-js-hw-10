import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const promiseForm = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const fulfilledInput = document.querySelector('input[value="fulfilled"]');
const btnSubmit = document.querySelector('.form button');

const promiseDelay = (delay, promiseFunc) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      promiseFunc === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  });
};

const processPromise = (delay, promiseFunc) => {
  promiseDelay(delay, promiseFunc)
    .then(delay => {
      iziToast.show({
        message: `✅ OK Fulfilled promise in ${delay}ms`,
        backgroundColor: '#59A10D',
        position: 'topRight',
        messageColor: '#ffffff',
        close: false,
      });
    })
    .catch(delay => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        backgroundColor: '#FF2E2E',
        position: 'topRight',
        messageColor: '#ffffff',
        close: false,
      });
    });
};

const handleSubmit = event => {
  event.preventDefault();

  const delayValue = Number(delayInput.value);

  if (delayValue < 0) {
    iziToast.error({
      message: 'Error: Illegal operation',
      position: 'topRight',
      messageColor: '#ffffff',
      backgroundColor: '#EF4040',
      close: false,
    });
    delayInput.value = '';
    return;
  }

  processPromise(delayValue, fulfilledInput.checked ? 'fulfilled' : 'rejected');
  event.target.reset();
};

promiseForm.addEventListener('submit', handleSubmit);
