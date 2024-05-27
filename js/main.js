import {getData} from './api.js';
import {showDataErrorMessage,makeActiveForm} from './utils.js';
import {showCards} from './filters.js';

const mapFeaturesElem = [...document.querySelectorAll('.map__filters fieldset')];
const mapFiltersForm = document.querySelector('.map__filters');
const mapFilterInteractiveElements = [...document.querySelectorAll('.map__filters select')];

getData(showDataErrorMessage)
  .then((cards) => {
    makeActiveForm(mapFiltersForm,mapFilterInteractiveElements,mapFeaturesElem);
    showCards(cards);
  })
  .catch(() => {
    showDataErrorMessage();
  });
