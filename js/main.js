import './form.js';
import './slider.js';
//import {getData} from './api.js';
import {createMarkers} from './map.js';
//import {getArrayOfAdvertisements} from './data.js';
import {ErrorText} from './constants.js';
import {BASE_URL,Route} from './constants.js';
//import{createCard} from './generate-cards.js';
import {makeActiveForm} from './utils.js';

const mapFeaturesElem = [...document.querySelectorAll('.map__filters fieldset')];//филдсет в форме 1 чекбоксы
const mapFiltersForm = document.querySelector('.map__filters');//форма1
const mapFilterInteractiveElements = [...document.querySelectorAll('.map__filters select')];//все селекты форма 1

const ALERT_SHOW_TIME = 5000;
// const data = getArrayOfAdvertisements();

// createCard(data);
//console.log(data)
//console.log(L)

// getData((cards) => {
//   createMarkers(cards);
// });

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const errorMessage = dataErrorTemplate.cloneNode(true);
const showDataErrorMessage = () => {
  document.body.append(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  },ALERT_SHOW_TIME);
};

fetch('https://31.javascript.htmlacademy.pro/keksobooking/dat')
  .then((response) => {
    if (!response.ok) {
      console.log(ErrorText.GET_DATA)
      throw new Error(ErrorText.GET_DATA);//почему не выбрасывается ошибка???
    }
    makeActiveForm(mapFiltersForm,mapFilterInteractiveElements,mapFeaturesElem);//Передаем ФОРМу1
    console.log(response.json)
    return response.json();
  })
  .then((cards) => {
    console.log('в зен');
    createMarkers(cards);
  })
  .catch(() => {
    console.log('я в кетч');
    showDataErrorMessage();
  });
