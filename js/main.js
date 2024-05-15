import {getData} from './api.js';
import {createMarkers} from './map.js';
import {showDataErrorMessage} from './utils.js';
import {makeActiveForm} from './utils.js';

const mapFeaturesElem = [...document.querySelectorAll('.map__filters fieldset')];//филдсет в форме 1 чекбоксы
const mapFiltersForm = document.querySelector('.map__filters');//форма1
const mapFilterInteractiveElements = [...document.querySelectorAll('.map__filters select')];//все селекты форма 1


getData(createMarkers,showDataErrorMessage)
  .then((cards) => {
    makeActiveForm(mapFiltersForm,mapFilterInteractiveElements,mapFeaturesElem);
    createMarkers(cards);
  })
  .catch(() => {
    showDataErrorMessage();
  });

// getData((cards) => {
//   createMarkers(cards);
// },showDataErrorMessage);
