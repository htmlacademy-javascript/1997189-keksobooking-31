
const mapFiltersForm = document.querySelector('.map__filters');//форма1
const mapFilterInteractiveElements = [...document.querySelectorAll('.map__filters select')];//все селекты форма 1
const mapFeaturesElem = [...document.querySelectorAll('.map__filters fieldset')];//филдсет в форме 1 чекбоксы


const adForm = document.querySelector('.ad-form');//форма 2
const setOfAdFormInteractiveElements = [...document.querySelectorAll('.ad-form fieldset')];//все филдсеты в форме 2

const makeInactiveForm = (form,elementsOfForm,additionalFields = []) => {
  form.classList.add('ad-form--disabled');
  const mergedArrays = [...elementsOfForm,...additionalFields];
  mergedArrays.forEach((interactiveElement) => interactiveElement.setAttribute('disabled', ''));
};
// makeInactiveForm(mapFiltersForm,mapFilterInteractiveElements,mapFeaturesElem);//Передаем ФОРМу1
// makeInactiveForm(adForm,setOfAdFormInteractiveElements);//Передаем ФОРМу 2

const makeActiveForm  = (form,elementsOfForm,additionalFields = []) => {
  form.classList.remove('ad-form--disabled');
  const mergedArrays = [...elementsOfForm,...additionalFields];
  mergedArrays.forEach((interactiveElement) => interactiveElement.removeAttribute('disabled'));
};

//makeActiveForm(mapFiltersForm,mapFilterInteractiveElements,mapFeaturesElem);//Передаем ФОРМу1
//makeActiveForm(adForm,setOfAdFormInteractiveElements);//Передаем ФОРМу 2

const MIN_LENGTH = 30;
const MAX_LENGTH = 100;
const MAX_PRICE = 100000;

const priceInput = adForm.querySelector('#price');
const typeInput = adForm.querySelector('#type');

//const validatePrice = (value) => value && value <= MAX_PRICE;
const roomsQuantity = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
console.log(typeof(roomsQuantity.value));



const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',//на кот доб классы
  errorTextParent: 'ad-form__element',//куда  б добавляться текст с ошибкой
  errorTextClass:'ad-form__element--invalid'//класс для эл с текстом ошибки
});


//СООТНОШЕНИЕ КОЛ-ВО КОМНАТ: КОЛИЧЕСТВО ГОСТЕЙ 100 КОМНАТ???
const RATIO_ROOMS_GUESTS = {
  '1': ['1'],
  '2' : ['1','2'],
  '3' : ['1','2','3'],
  '100': ['0'],
};

const RATIO_TYPE_MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

let message = '';

const showTypeErrorMessage = () => message;

const errorMessage = {
  minimum: `Стоимость ниже допустимой ${priceInput.getAttribute('min')}`,//НЕ ВЫВОДИТ СТОИМОСТЬ, ПОДУМАТЬ ОТКУДА БРАТЬ
  maximum: `Не больше ${MAX_PRICE}`
};

const addAttributeToPrice = () => {
  priceInput.setAttribute('min',RATIO_TYPE_MIN_PRICE[typeInput.value]);
  priceInput.placeholder = RATIO_TYPE_MIN_PRICE[typeInput.value];
};

const validateTypeMinPrice = () => {
  addAttributeToPrice(priceInput.value);
  const priceInputMin = priceInput.getAttribute('min');
  if(priceInput.value < Number(priceInputMin)) {
    //message = errorMessage.minimum;
    message = errorMessage.minimum;//НЕ НАХОДИТ ЦИФРУ. ПОДУМАТЬ, ГДЕ БРАТЬ
    return false;
  } else if (priceInput.value > MAX_PRICE) {
    message = errorMessage.maximum;
    //showTypeErrorMessage();
    return false;
  }
  return true;
};

const onPriceInputChange = () => {
  pristine.validate(priceInput);//НО отслеживаем внутри поле цена жилья
  // addAttributeToPrice(typeInput.value);
};

typeInput.addEventListener('change',onPriceInputChange);

pristine.addValidator(typeInput,validateTypeMinPrice);//showTypeErrorMessage);
pristine.addValidator(priceInput,validateTypeMinPrice,showTypeErrorMessage);


const showQuantityErrorMessage = function (roomsValue) {
  switch (roomsValue) {
    case '1' :
      return '1 комната — «для 1 гостя»';
    case '2' :
      return '2 комнаты — «для 2 гостей» или «для 1 гостя»';
    case '3' :
      return '3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;';
    case '100' :
      return '100 комнат — «не для гостей»';
  }
};

//функция для события change на поле capacity(кол-во гостей)
// Вишенкой на торте можно сделать проверку количества в момент выбора другого размера. Это удобно, когда пользователь сперва ввёл количество, а потом решил изменить размер. Для этого достаточно добавить обработчики событий 'change' на выбор размера, а внутри обработчика вызывать валидацию pristine.validate(amountField).
//СВЯЗЬ ДВУХ ПОЛЕЙ!!!
const onCapacityChange = () => {
  pristine.validate(roomsQuantity);//НО отслеживаем внутри валидацию поля
  console.log(capacity.value)//отслеживаются
  console.log(roomsQuantity.value)//отслеживаются
};

//на событие change поля гости запускаем валидацию поля комнат
capacity.addEventListener('change',onCapacityChange);

//проверяем ключ количество комнат совпадает с capacity.value?
const validateRoomsQuantity = () => RATIO_ROOMS_GUESTS[roomsQuantity.value].includes(capacity.value);


const TIMEIN = adForm.querySelector('#timein');
const TIMEOUT = adForm.querySelector('#timeout');


const onChangeTimeIn = () => {
  if(TIMEIN.value !== TIMEOUT.value) {
    TIMEOUT.value = TIMEIN.value;
  }
};

const onChangeTimeOut = () => {
  if(TIMEOUT.value !== TIMEIN.value) {
    TIMEIN.value = TIMEOUT.value;
  }
};

TIMEIN.addEventListener('change',onChangeTimeIn);
TIMEOUT.addEventListener('change',onChangeTimeOut);

//.addValidator() мы вызовем на обоих выпадающих списках, ведь ошибку нужно показать всё равно, не важно, что первым выбрал пользователь.
  pristine.addValidator(roomsQuantity,validateRoomsQuantity,showQuantityErrorMessage);
  pristine.addValidator(capacity,validateRoomsQuantity,showQuantityErrorMessage);


adForm.addEventListener('submit',(evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if(isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Нельзя');
  }
});

//ВАЛИДАЦИЮ ПОШЛЯ ТITLЕ РЕАЛИЗОВАЛА С ПОМОЩЬЮ ДАТА АТРИБУТОВ. соОБЩЕНИЕ О ПУСТОМ ПОЛЕ НЕ ВЫВОДИЛОСЬ...ПРИЧИНА???
// let message = '';
// const getErrorMessage = () => message;
// const validateTitle = function (value) {
//   if (value.length) {
//     return true;
//   }
//   return false;
// };
//


// pristine.addValidator(adForm.querySelector('#title'),
//   validateTitle,'The first character must be capitalized', 2, false);

  // if(value & value.length >= 30 && value.length <= 100) {
  //   return true;
  // } else {
  //   if(!value) {
  //     message = errorMessage.heading.REQUIRED__FIELD;
  //     console.log('но вэлью')
  //     console.log(value.length)
  //     return false;
  //   }
  //   if(!(value.length >= 30 && value.length <= 100)) {
  //     message = errorMessage.heading.HEADING_LENGTH;
  //     console.log('не меньше не больше');
  //     return false;
  //   }
  // }
//}
  // if(!(value.length >= 30 && value.length <= 100)) {
  //   message = errorMessage.heading.HEADING_LENGTH;
  //   console.log(value)
  //   return false;
  // }
  // if(!value) {
  //   message = errorMessage.heading.REQUIRED__FIELD;
  //   console.log('тут')
  //   return false;
  // }
//};
// console.log(validateTitle('asdfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasdffff'))

// pristine.addValidator(adForm.querySelector('#title'),
//   validateTitle,getErrorMessage);
//let message = '';
// const getMessage = () => message;
// console.log(message);

// const title = adForm.querySelector('#title')
// console.log(title)
// const validateF = (value) => {
//   console.log(value)
//   if (value){
//     console.log('длина')
//     return true;
// }
//   message = 'The first character must be capitalized';
//   return false;
// };
//pristine.addValidator(title, validateF, getMessage);
//let message = '';

// const errorMessage = {
//   price: {
//     REQUIRED__FIELD: 'обязательное поле',
//     MAXIMUM_VALUE: `Максимальное значение ${MAX_PRICE} символов`,
//     NUMERIC_FIELD:'Вводятся только числа'
//   },
//   heading: {
//     REQUIRED__FIELD: 'обязательное поле',
//     HEADING_LENGTH:`минимальная длина ${MIN_LENGTH} максимальная ${MAX_LENGTH} символов`,
//   }
// };


// const roomsQuantityErrorMessage = function (roomsQuantitySelect) {
//     switch (roomsQuantitySelect) {
//       case '1' :
//         console.log('1 комната «для 1 гостя»');
//       return '1 комната «для 1 гостя»';

//       case '2' :
//         console.log('2 комната «для 2,1 гостя»') ;
//         return '2 комнаты «для 2 гостей» или «для 1 гостя»';
//       case '3' :
//         console.log('3 комнаты «для 3 гостей», «для 2 гостей» или «для 1 гостя»') ;
//         return '3 комнаты «для 3 гостей», «для 2 гостей» или «для 1 гостя»';
//         case '100':
//           return '100 комнат — «не для гостей»';
//     }
//   };

//   //СООТНОШЕНИЕ КОМНАТЫ : ГОСТИ
//   const RATIO_ROOMS_GUESTS = {
//     '1': ['1'],
//     '2': ['1', '2'],
//     '3': ['1', '2', '3'],
//     '100': ['0'],
//   };

//   // СООТНОСИМ: ключ[инпут количества комнат] включает вэлью селекта количества гостей(отслеживаю изменения в onCapacityChange при помощи  pristine.validate(roomsQuantity))
//   const validateRoomsQuantity = () => RATIO_ROOMS_GUESTS[roomsQuantity.value].includes(capacity.value);


//   // Для синхронизации двух полей (количество гостей и количество комнат), чтробы при изменении одного поля проверялось другое
//   const onCapacityChange = () => {
//     pristine.validate(roomsQuantity);//валидируем поле количество комнат, но отдаем в change поля кол-ва гостей capacity.addEventListener('change', onCapacityChange);
//   };
//   // Обработчик изменения выбора количества гостей, чтобы последовывательность изменений не была важна
//   capacity.addEventListener('change', onCapacityChange);

//   pristine.addValidator(roomsQuantity,validateRoomsQuantity,roomsQuantityErrorMessage);
//   pristine.addValidator(capacity,validateRoomsQuantity,roomsQuantityErrorMessage);


// const showTypeErrorMessage = () => `Стоимость ниже допустимой ${priceInput.getAttribute('min')}`;


// const typeErrorMessages = {
//   minimum: () => `Стоимость ниже допустимой ${priceInput.getAttribute('min')}`,
//   maximum: () => `Стоимость должна быть не выше ${MAX_PRICE}`,

// };
// const errorMessage = {
//   minimum: `Стоимость ниже допустимой ${priceInput.getAttribute('min')}`,
//   maximum: `Не больше ${MAX_PRICE}`
// }
