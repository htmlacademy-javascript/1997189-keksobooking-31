import {RATIO_ROOMS_GUESTS, RATIO_TYPE_MIN_PRICE,MAX_PRICE_ROOM} from './constance.js';
//import {getInputValueToSlider} from './slider.js';
const adForm = document.querySelector('.ad-form');//форма 2


const priceInput = adForm.querySelector('#price');
const typeInput = adForm.querySelector('#type');

const roomsQuantity = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

const TIMEIN = adForm.querySelector('#timein');
const TIMEOUT = adForm.querySelector('#timeout');


//makeActiveForm(mapFiltersForm,mapFilterInteractiveElements,mapFeaturesElem);//Передаем ФОРМу1
//makeActiveForm(adForm,setOfAdFormInteractiveElements);//Передаем ФОРМу 2


const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',//на кот доб классы
  errorTextParent: 'ad-form__element',//куда  б. добавляться текст с ошибкой
  errorTextClass:'ad-form__element--invalid'//класс для эл с текстом ошибки
});

let message = '';

const showTypeErrorMessage = () => message;

const addAttributeToPrice = () => {
  priceInput.setAttribute('min',RATIO_TYPE_MIN_PRICE[typeInput.value]);
  priceInput.placeholder = RATIO_TYPE_MIN_PRICE[typeInput.value];
};

const errorMessage = (value) => ({
  minimum: `Стоимость ниже допустимой ${value}`,//откорректировала вывод, работает
  maximum: `Не больше ${MAX_PRICE_ROOM}`
});

const validateTypeMinPrice = () => {
  addAttributeToPrice(priceInput.value);
  const priceInputMin = priceInput.getAttribute('min');

  if(priceInput.value < Number(priceInputMin)) {
    message = errorMessage(priceInputMin).minimum;
    return false;
  } else if (priceInput.value > MAX_PRICE_ROOM) {
    message = errorMessage().maximum;
    return false;
  }
  return true;
};

export const onPriceInputChange = () => {
  pristine.validate(priceInput);//НО отслеживаем внутри поле цена жилья
  // addAttributeToPrice(typeInput.value);
};

typeInput.addEventListener('change',onPriceInputChange);

pristine.addValidator(typeInput,validateTypeMinPrice,showTypeErrorMessage);//showTypeErrorMessage); //убрала сообщение, чтоб не дубль. одинаовые как в инпуте цены рядом
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

//СВЯЗЬ ДВУХ ПОЛЕЙ!!!
const onCapacityChange = () => {
  pristine.validate(roomsQuantity);//НО отслеживаем внутри валидацию поля
  console.log(capacity.value)//отслеживаются
  console.log(roomsQuantity.value)//отслеживаются
};

//на событие change поля гости запускаем валидацию поля комнат
capacity.addEventListener('change',onCapacityChange);

//проверяем [ключ] количество комнат совпадает с capacity.value?
const validateRoomsQuantity = () => RATIO_ROOMS_GUESTS[roomsQuantity.value].includes(capacity.value);

//Отслеживаем время заезда, корректируем
const onChangeTimeIn = () => {
  TIMEOUT.value = TIMEIN.value;
};

//Отслеживаем время выезда, корректируем
const onChangeTimeOut = () => {
  TIMEIN.value = TIMEOUT.value;
};

TIMEIN.addEventListener('change',onChangeTimeIn);
TIMEOUT.addEventListener('change',onChangeTimeOut);

//.addValidator() вызываем на обоих выпадающих списках, т.к ошибку нужно показать вне зависимости от того,что ПЕРВЫМ выбрал пользователь.
pristine.addValidator(roomsQuantity,validateRoomsQuantity,showQuantityErrorMessage);
pristine.addValidator(capacity,validateRoomsQuantity,showQuantityErrorMessage);


adForm.addEventListener('submit',(evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  //const isValid2 = pristineAvatar.validate();
  if(isValid) {
    /// if(isValid && isValid2) {
    console.log('Можно отправлять');
    pristine.reset();//В СЛУЧАЕ УДАЧНОЙ ОТПРАВКИ, ЧИСТИМ ПРИСТИН
    pristineAvatar.reset();
  } else {
    console.log('Нельзя');
  }
});
// const priceInput = adForm.querySelector('#price');
// const typeInput = adForm.querySelector('#type');

// const roomsQuantity = adForm.querySelector('#room_number');
// const capacity = adForm.querySelector('#capacity');

// const TIMEIN = adForm.querySelector('#timein');
// const TIMEOUT = adForm.querySelector('#timeout');

// const pristineAvatar = new Pristine(adForm, {
//   classTo: 'ad-form-header',//на кот доб классы
//   errorTextParent: 'ad-form-header',//куда  б. добавляться текст с ошибкой
//   errorTextClass:'ad-form__element--invalid'//класс для эл с текстом ошибки
// });

//const sliderContainer = document.querySelector('.ad-form__slider');


// const mapFiltersForm = document.querySelector('.map__filters');//форма1
// const mapFilterInteractiveElements = [...document.querySelectorAll('.map__filters select')];//все селекты форма 1
// const mapFeaturesElem = [...document.querySelectorAll('.map__filters fieldset')];//филдсет в форме 1 чекбоксы


// //const adForm = document.querySelector('.ad-form');//форма 2
// const setOfAdFormInteractiveElements = [...document.querySelectorAll('.ad-form fieldset')];//все филдсеты в форме 2
//валидация аватара
//const onAvatarChange = () => pristineAvatar.validate();
//const avatarInput = document.querySelector('#avatar');
//avatarInput.addEventListener('change',onAvatarChange);
