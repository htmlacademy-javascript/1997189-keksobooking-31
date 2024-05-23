import {PRICE,MAX_QUANTITY_ADVERTISEMENTS} from './constants.js';
import {createMarkers,markerGroup,createMarker} from './map.js';
import {debounce,throttle} from './utils.js';
import {returnMarkerToStart,returnMapToInitialState} from './map.js';

const fieldType = document.querySelector('#housing-type');
const fieldPrice = document.querySelector('#housing-price');
const fieldRooms = document.querySelector('#housing-rooms');
const fieldQuests = document.querySelector('#housing-guests');

const filterForm = document.querySelector('.map__filters');


const makeArrayFromFeatures = () => Array.from(filterForm.querySelectorAll('input[name ="features"]:checked'), (input) => input.value);


//чистит поля формы селекты
export const resetFilterForm = (obj,maxQuantity) => {
  filterForm.reset();
  returnMarkerToStart();
  returnMapToInitialState();
  createMarkers(obj,maxQuantity);//добавила отрисовку маркеров в функцию сброса фильтров
};

const clearCreateMarkers = (newArr,quantity) => {
  markerGroup.clearLayers();
  createMarkers(newArr,quantity);
};

const filterAdvertisementCards = (cards,features) => {
  const newArr = cards
    .filter((card) => fieldType.children[0].selected || card.offer.type === fieldType.value)
    .filter((card) => fieldPrice.children[0].selected || (card.offer.price >= PRICE[fieldPrice.value].min) && (card.offer?.price <= PRICE[fieldPrice.value].max))
    .filter((card) => fieldRooms.children[0].selected || card.offer.rooms === Number(fieldRooms.value))
    .filter((card) => fieldQuests.children[0].selected || card.offer.guests === Number(fieldQuests.value))
    .filter((card) => features.every((feature) => card.offer.features?.includes(feature)));
  return newArr;
};

export const localData = [];

export const showCards = (cards) => {
  localData.push(...cards.slice(0,10));
  resetFilterForm(cards,MAX_QUANTITY_ADVERTISEMENTS);//добавила отрисовку маркеров в функцию сброса фильтров

  filterForm.addEventListener('change',() => {
    const checkedFeatures = makeArrayFromFeatures();
    const filteredCards = filterAdvertisementCards(cards,checkedFeatures);
    // const debounceFunction = (debounce(() => clearCreateMarkers(filteredCards,MAX_QUANTITY_ADVERTISEMENTS),1000));
    // debounceFunction();

    const throttleFunction = (throttle(() => clearCreateMarkers(filteredCards,MAX_QUANTITY_ADVERTISEMENTS),2000));
    throttleFunction();
  });
};
