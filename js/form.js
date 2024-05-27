import {
  RATIO_ROOMS_GUESTS,
  RATIO_TYPE_MIN_PRICE,
  MAX_PRICE_ROOM,
  ErrorText,
  FILE_TYPES} from './constants.js';

import {
  setStartingAddress,
  returnMarkerMapToInitialState,
  map,
  createMarker} from './map.js';

import {
  isEscapeKey,
  makeActiveForm,
  resetPhotoSrc} from './utils.js';

import {resetSliderPrice} from './slider.js';
import {sendData} from './api.js';
import {avatarPreview,avatarInputListener} from './avatar.js';
import {localData} from './filters.js';

//const avatarInput = document.querySelector('#avatar');
//const avatarPreview = document.querySelector('.ad-form-header__preview img');

avatarInputListener();

const filterForm = document.querySelector('.map__filters');
const mapFeaturesElem = [...document.querySelectorAll('.map__filters fieldset')];
const mapFiltersForm = document.querySelector('.map__filters');

const mapFilterInteractiveElements = [...document.querySelectorAll('.map__filters select')];
const adForm = document.querySelector('.ad-form');
const resetButton = document.querySelector('.ad-form__reset');
const priceInput = adForm.querySelector('#price');

const typeInput = adForm.querySelector('#type');
const advertisementPhotoInput = adForm.querySelector('#images');
const adFormPhoto = adForm.querySelector('.ad-form__photo');
const roomsQuantity = adForm.querySelector('#room_number');

const capacity = adForm.querySelector('#capacity');
const TIMEIN = adForm.querySelector('#timein');
const TIMEOUT = adForm.querySelector('#timeout');
const body = document.querySelector('body');

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successMessageTemplate.cloneNode(true);
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageForSending = errorMessageTemplate.cloneNode(true);
const submitBtn = document.querySelector('.ad-form__submit');
let message = '';

advertisementPhotoInput.addEventListener('change',() => {
  const file = advertisementPhotoInput.files[0];
  const fileName = file.name;
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if(matches) {
    adFormPhoto.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  }
});

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

const showErrorMessageForSending = () => {
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

const showSuccessMessage = () => {
  body.append(successMessage);
  const successOverlay = document.querySelector('.success');
  successOverlay.addEventListener('click',closeSuccessMessage);
  document.addEventListener('keydown', onDocumentKeyDown);
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass:'ad-form__element--invalid'
});

const showTypeErrorMessage = () => message;

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
  pristine.validate(priceInput);
};

typeInput.addEventListener('change',onPriceInputChange);

pristine.addValidator(typeInput,validateTypeMinPrice);
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

const onCapacityChange = () => {
  pristine.validate(roomsQuantity);
};

capacity.addEventListener('change',onCapacityChange);

const validateRoomsQuantity = () => RATIO_ROOMS_GUESTS[roomsQuantity.value].includes(capacity.value);

const onChangeTimeIn = () => {
  TIMEOUT.value = TIMEIN.value;
};

const onChangeTimeOut = () => {
  TIMEIN.value = TIMEOUT.value;
};

TIMEIN.addEventListener('change',onChangeTimeIn);
TIMEOUT.addEventListener('change',onChangeTimeOut);

pristine.addValidator(roomsQuantity,validateRoomsQuantity,showQuantityErrorMessage);
pristine.addValidator(capacity,validateRoomsQuantity,showQuantityErrorMessage);

const blockSubmitBtn = () => {
  submitBtn.disabled = true;
};

const unBlockSubmitBtn = () => {
  submitBtn.disabled = false;
};

const showInitialCards = (cards) => {
  cards.forEach((card) => {
    createMarker(card);
  });
};

const resetForm = () => {
  adForm.reset();
  pristine.reset();
  returnMarkerMapToInitialState();
  resetSliderPrice();
  setStartingAddress();
  resetPhotoSrc(avatarPreview);
  resetPhotoSrc(adFormPhoto);
  filterForm.reset();
  map.closePopup();
  showInitialCards(localData);
};

const onResetBtn = (e) => {
  e.preventDefault();
  resetForm();
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
        resetForm();
        showSuccessMessage();
        makeActiveForm(mapFiltersForm,mapFilterInteractiveElements,mapFeaturesElem);
      })
      .catch(() => {
        showErrorMessageForSending();
        throw new Error(ErrorText.SEND_DATA);
      })
      .finally(() => {
        unBlockSubmitBtn();
      });
  }
});

export {
  showErrorMessageForSending,
  showSuccessMessage,
  pristine,
  showTypeErrorMessage,
  unBlockSubmitBtn
};
