//import{MAX_AUTHOR_QUANTITY} from './constants.js';

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

export const makeInactiveForm = (form,elementsOfForm,additionalFields = []) => {
  form.classList.add('ad-form--disabled');
  const mergedArrays = [...elementsOfForm,...additionalFields];
  mergedArrays.forEach((interactiveElement) => interactiveElement.setAttribute('disabled', ''));
};
// makeInactiveForm(mapFiltersForm,mapFilterInteractiveElements,mapFeaturesElem);//Передаем ФОРМу1
// makeInactiveForm(adForm,setOfAdFormInteractiveElements);//Передаем ФОРМу 2

export const makeActiveForm = (form,elementsOfForm,additionalFields = []) => {
  form.classList.remove('ad-form--disabled');
  const mergedArrays = [...elementsOfForm,...additionalFields];
  mergedArrays.forEach((interactiveElement) => interactiveElement.removeAttribute('disabled'));
};

export const isEscapeKey = (evt) => evt.key === 'Escape';

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const errorMessage = dataErrorTemplate.cloneNode(true);
export const showDataErrorMessage = () => {
  document.body.append(errorMessage);
};

export function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();
    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    console.log('время меньше задержки')
    if (now - lastTime >= delayBetweenFrames) {
      console.log(now - lastTime)
      console.log(lastTime)
      console.log(now - lastTime >= delayBetweenFrames)
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export const resetPhotoSrc = function (element) {
  if(element.src) {
    element.src = 'img/muffin-grey.svg';
  } else {
    element.style.backgroundImage = '';
  }
};

// export const resetAllPhotosSrc = (...allPhotos) => {
//   allPhotos.forEach((photo) => {
//     photo.src = 'img/muffin-grey.svg';
//   });
// };

export{getRandomInteger,getRandomFractional,getUniqueInteger,translateType};
