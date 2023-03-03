import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const delayEl = document.querySelector('[name=delay]');
const stepEl = document.querySelector('[name=step]');
const amountEl = document.querySelector('[name=amount]');
const submitEl = document.querySelector('[type=submit]');
console.log(submitEl);
//let delay = 0;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function createSubmit(e) {
  e.preventDefault();
  const delayVal = Number(delayEl.value);
  const stepVal = Number(stepEl.value);
  const amountVal = Number(amountEl.value);

  for (let i = 1; i <= amountVal; i++) {
    const delay = delayVal + stepVal * (i - 1);
    console.log(delay);
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`);
      });
  }
}

submitEl.addEventListener('click', createSubmit);
