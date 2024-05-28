const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const errorMessage = dataErrorTemplate.cloneNode(true);

const getRandomInteger = (min,max) => {
  const lower = Math.ceil(Math.min(Math.abs(min),Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min),Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomFractional = (min,max) => {
  const lower = Math.min(Math.abs(min),Math.abs(max));
  const upper = Math.max(Math.abs(min),Math.abs(max));
  const result = Math.random() * (upper - lower) + lower;
  return (+((result) .toFixed(5)));
};

const getUniqueInteger = (min,max) => {
  const arrOfUniqueIntegers = [];
  return function () {
    let randomInteger = getRandomInteger(min,max);
    if(arrOfUniqueIntegers.length >= (max - min + 1)) {
      return null;
    }
    while(arrOfUniqueIntegers.includes(randomInteger)) {
      randomInteger = getRandomInteger(min,max);
    }
    arrOfUniqueIntegers.push(randomInteger);
    return randomInteger;
  };
};

const translateType = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
    default:
      return type;
  }
};

const makeInactiveForm = (form,elementsOfForm,additionalFields = []) => {
  form.classList.add('ad-form--disabled');
  const mergedArrays = [...elementsOfForm,...additionalFields];
  mergedArrays.forEach((interactiveElement) => interactiveElement.setAttribute('disabled', ''));
};

const makeActiveForm = (form,elementsOfForm,additionalFields = []) => {
  form.classList.remove('ad-form--disabled');
  const mergedArrays = [...elementsOfForm,...additionalFields];
  mergedArrays.forEach((interactiveElement) => interactiveElement.removeAttribute('disabled'));
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showDataErrorMessage = () => {
  document.body.append(errorMessage);
};

function throttle (callback, delayBetweenFrames) {
  let lastTime = 0;
  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

const resetPhotoSrc = function (element) {
  if(element.src) {
    element.src = 'img/muffin-grey.svg';
  }
  element.style.backgroundImage = '';
};


export
{getRandomInteger,
  getRandomFractional,
  getUniqueInteger,
  translateType,
  makeInactiveForm,
  makeActiveForm,
  isEscapeKey,
  showDataErrorMessage,
  throttle,
  resetPhotoSrc
};
