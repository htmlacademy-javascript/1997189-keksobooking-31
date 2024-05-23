import {RATIO_ROOMS_GUESTS, RATIO_TYPE_MIN_PRICE,MAX_PRICE_ROOM,ErrorText,FILE_TYPES} from './constants.js';
import {returnMarkerToStart,setStartingAddress,returnMapToInitialState} from './map.js';
import {isEscapeKey,makeActiveForm,resetPhotoSrc} from './utils.js';
import {resetSliderPrice} from './slider.js';
import {sendData} from './api.js';
import {avatarPreview} from './avatar.js';
import {resetFilterForm} from './filters.js';

const filterForm = document.querySelector('.map__filters');

const mapFeaturesElem = [...document.querySelectorAll('.map__filters fieldset')];//филдсет в форме 1 чекбоксы
const mapFiltersForm = document.querySelector('.map__filters');//форма1
const mapFilterInteractiveElements = [...document.querySelectorAll('.map__filters select')];//все селекты форма 1

// import {showSuccessMessage,resetForm,showErrorMessageForSending,unBlockSubmitBtn} from './form.js';

const adForm = document.querySelector('.ad-form');//форма 2
const resetButton = document.querySelector('.ad-form__reset');
const priceInput = adForm.querySelector('#price');
export const typeInput = adForm.querySelector('#type');

const advertisementPhotoInput = adForm.querySelector('#images');

const adFormPhoto = adForm.querySelector('.ad-form__photo');

// const advertisementPhotoImg = document.createElement('img');
// advertisementPhotoImg.className = 'ad-form__img';
// advertisementPhotoImg.alt = 'Фотография жилья';
// advertisementPhotoImg.width = '70';
// advertisementPhotoImg.height = '70';

// adFormPhoto.append(advertisementPhotoImg);

advertisementPhotoInput.addEventListener('change',() => {
  const file = advertisementPhotoInput.files[0];
  const fileName = file.name;
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if(matches) {
    adFormPhoto.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  }
});

const roomsQuantity = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const TIMEIN = adForm.querySelector('#timein');
const TIMEOUT = adForm.querySelector('#timeout');
const body = document.querySelector('body');

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successMessageTemplate.cloneNode(true);
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageForSending = errorMessageTemplate.cloneNode(true);


const closeSuccessMessage = () => {
  successMessage.remove();
  document.removeEventListener('keydown', onDocumentKeyDown);
};

function onDocumentKeyDown (evt) {
  if(isEscapeKey(evt)) {
    closeSuccessMessage();
  }
}

const closeErrorMessageForSending = () => {
  errorMessageForSending.remove();
  document.removeEventListener('keydown', onDocumentErrorKeyDown);
};

export const showErrorMessageForSending = () => {
  body.append(errorMessageForSending);
  const errorMessageBtn = errorMessageForSending.querySelector('.error__button');

  errorMessageBtn.addEventListener('click', () => {
    errorMessageForSending.remove();
  });
  document.addEventListener('keydown', onDocumentErrorKeyDown);
  const errorOverlay = document.querySelector('.error');
  errorOverlay.addEventListener('click',closeErrorMessageForSending);
};

function onDocumentErrorKeyDown (evt) {
  if(isEscapeKey(evt)) {
    closeErrorMessageForSending();
  }
}

export const showSuccessMessage = () => {
  body.append(successMessage);
  const successOverlay = document.querySelector('.success');
  successOverlay.addEventListener('click',closeSuccessMessage);
  document.addEventListener('keydown', onDocumentKeyDown);
};

//makeActiveForm(mapFiltersForm,mapFilterInteractiveElements,mapFeaturesElem);//Передаем ФОРМу1
//makeActiveForm(adForm,setOfAdFormInteractiveElements);//Передаем ФОРМу 2


export const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',//на кот доб классы
  errorTextParent: 'ad-form__element',//куда  б. добавляться текст с ошибкой
  errorTextClass:'ad-form__element--invalid'//класс для эл с текстом ошибки
});

let message = '';

export const showTypeErrorMessage = () => message;

const addAttributeToPrice = () => {
  priceInput.setAttribute('min',RATIO_TYPE_MIN_PRICE[typeInput.value]);
  priceInput.placeholder = RATIO_TYPE_MIN_PRICE[typeInput.value];
};

const errorMessage = (value) => ({
  minimum: `Стоимость ниже допустимой ${value}`,
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

const onPriceInputChange = () => {
  pristine.validate(priceInput);//НО отслеживаем внутри поле цена жилья
};

typeInput.addEventListener('change',onPriceInputChange);

pristine.addValidator(typeInput,validateTypeMinPrice);//,showTypeErrorMessage);//showTypeErrorMessage); //убрала сообщение, чтоб не дубль. одинаовые как в инпуте цены рядом
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

const submitBtn = document.querySelector('.ad-form__submit');

const blockSubmitBtn = () => {
  submitBtn.disabled = true;
};

export const unBlockSubmitBtn = () => {
  submitBtn.disabled = false;
};

//При успешной отправке формы или её очистке (нажатие на кнопку .ad-form__reset) страница, не перезагружаясь, переходит в состояние
export const resetForm = () => {
  adForm.reset();
  pristine.reset();//В СЛУЧАЕ УДАЧНОЙ ОТПРАВКИ, ЧИСТИМ ПРИСТИН
  returnMarkerToStart();
  returnMapToInitialState();
  resetSliderPrice();
  setStartingAddress();
  resetPhotoSrc(avatarPreview);
  resetPhotoSrc(adFormPhoto);
  //marker.closePopup();

  // все заполненные поля возвращаются в изначальное состояние;
  // фильтрация (состояние фильтров и отфильтрованные метки) сбрасывается;???
  // метка адреса возвращается в исходное положение;
  // значение поля адреса корректируется соответственно исходному положению метки;
  // если на карте был показан балун, то он должен быть скрыт.???
};
const onResetBtn = (e) => {
  e.preventDefault();
  resetForm();
  resetFilterForm();
  console.log('tet')
};
resetButton.addEventListener('click',onResetBtn);

adForm.addEventListener('submit',(evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if(isValid) {
    blockSubmitBtn();
    const formData = new FormData(evt.target);

    sendData(formData)
      .then(() => {
        console.log('в then')
        resetForm();
        filterForm.reset();
        returnMarkerToStart();
        returnMapToInitialState();
        //resetFilterForm();
        showSuccessMessage();
        makeActiveForm(mapFiltersForm,mapFilterInteractiveElements,mapFeaturesElem);//Передаем ФОРМу1 КУДА ПОСТАВИТЬ АКТИВАЦИЮ ФОРМЫ? ТРЕТИМ ПАРАМЕТРОМ ИЛИ УБРАТЬ ОТСЮДА ВООБЩЕ?

      })
      .catch(() => {
        //throw new Error(err.message);
        showErrorMessageForSending();
        console.log('в кетч')
        throw new Error(ErrorText.SEND_DATA);
      })
      .finally(() => {
        unBlockSubmitBtn();
      });
  }
});
