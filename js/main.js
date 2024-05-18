import {getData} from './api.js';
import {createMarkers} from './map.js';
import {showDataErrorMessage,makeActiveForm} from './utils.js';
import {filterByType,filterByPrice,filterByRooms,filterCards} from './filters.js';
import './filters.js';


const mapFeaturesElem = [...document.querySelectorAll('.map__filters fieldset')];//филдсет в форме 1 чекбоксы
const mapFiltersForm = document.querySelector('.map__filters');//форма1
const mapFilterInteractiveElements = [...document.querySelectorAll('.map__filters select')];//все селекты форма 1


getData(createMarkers,showDataErrorMessage)
  .then((cards) => {
    console.log(cards);
    makeActiveForm(mapFiltersForm,mapFilterInteractiveElements,mapFeaturesElem);
    createMarkers(cards);
    filterByType(cards);
    filterByPrice(cards)
    filterCards(cards)
  })
  .catch(() => {
    showDataErrorMessage();
  });

// getData((cards) => {
//   createMarkers(cards);
// },showDataErrorMessage);
