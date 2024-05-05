import{MAX_AUTHOR_QUANTITY} from './constance.js';

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

// const getAuthorCount = () => {
//   let count = 0;
//   return function () {
//     count ++;
//     if (count < MAX_AUTHOR_QUANTITY) {
//       return `0${count}`;
//     }
//     return count;
//   };
// };

const getAuthorCount = () => {
  let count = 0;
  return function () {
    count ++;
    if (MAX_AUTHOR_QUANTITY.length === 2) {
      return count.toString().padStart(2,'0');
    }
    return count;
  };
};
//num.toString().padStart(3, '0')

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



export{getRandomInteger,getRandomFractional,getUniqueInteger,getAuthorCount,translateType};
