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
    .then(delayValue => {
      iziToast.show({
        message: `✅ OK Fulfilled promise in ${delay}ms`,
        backgroundColor: '#59A10D',
        position: 'topRight',
        messageColor: '#ffffff',
        iconColor: '#ffffff',
      });
    })
    .catch(delayValue => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        backgroundColor: '#FF2E2E',
        position: 'topRight',
        messageColor: '#ffffff',
      });
    });
};

const submitPromise = event => {
  event.preventDefault();

  const delayValue = Number(delayInput.value);

  if (delayValue <= 0) {
    iziToast.error({
      message: 'Error: Illegal operation',
      position: 'topRight',
      messageColor: '#ffffff',
      backgroundColor: '#EF4040',
    });
    event.target.reset();
    return;
  }

  processPromise(delayValue, fulfilledInput.checked ? 'fulfilled' : 'rejected');
  event.target.reset();
};

promiseForm.addEventListener('submit', submitPromise);
