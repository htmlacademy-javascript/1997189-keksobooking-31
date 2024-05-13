import {makeActiveForm} from './utils.js';
import {ErrorText} from './constants.js';
import {showSuccessMessage,resetForm,showErrorMessageForSending,unBlockSubmitBtn} from './form.js';
import {BASE_URL,Route} from './constants.js';


const mapFeaturesElem = [...document.querySelectorAll('.map__filters fieldset')];//филдсет в форме 1 чекбоксы
const mapFiltersForm = document.querySelector('.map__filters');//форма1
const mapFilterInteractiveElements = [...document.querySelectorAll('.map__filters select')];//все селекты форма 1

export const getData = (onSuccess,onError) => {
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(ErrorText.GET_DATA);//почему не выбрасывается ошибка???
      }
      makeActiveForm(mapFiltersForm,mapFilterInteractiveElements,mapFeaturesElem);//Передаем ФОРМу1 КУДА ПОСТАВИТЬ АКТИВАЦИЮ ФОРМЫ? ТРЕТИМ ПАРАМЕТРОМ ИЛИ УБРАТЬ ОТСЮДА ВООБЩЕ?
      return response.json();
    })
    .then((cards) => {
      onSuccess(cards);
    })
    .catch(() => {
      onError();
      throw new Error(ErrorText.GET_DATA);
    });
};

export const sendData = (body) => {
  fetch(
    `${BASE_URL}${Route.SEND_DATA}`,
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if(response.ok) {
      resetForm();
      showSuccessMessage();
    } else {
      showErrorMessageForSending();
      throw new Error(ErrorText.SEND_DATA);
    }
  })
    .catch((err) => {
      throw new Error(err.message);
    })
    .finally(() => {
      unBlockSubmitBtn();
    });
};
