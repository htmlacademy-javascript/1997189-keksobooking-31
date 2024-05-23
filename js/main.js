import {getData} from './api.js';
//import {createMarkers} from './map.js';
import {showDataErrorMessage,makeActiveForm} from './utils.js';
import {showCards} from './filters.js';
import './avatar.js';


const mapFeaturesElem = [...document.querySelectorAll('.map__filters fieldset')];//филдсет в форме 1 чекбоксы
const mapFiltersForm = document.querySelector('.map__filters');//форма1
const mapFilterInteractiveElements = [...document.querySelectorAll('.map__filters select')];//все селекты форма 1



console.log(L)

getData(showDataErrorMessage)
  .then((cards) => {
    console.log(cards);
    makeActiveForm(mapFiltersForm,mapFilterInteractiveElements,mapFeaturesElem);
    showCards(cards);
  })
  .catch(() => {
    showDataErrorMessage();
  });
