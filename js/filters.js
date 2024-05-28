import {
  PRICE,
  MAX_QUANTITY_ADVERTISEMENTS,
  THROTTLE__TIMEOUT,
  MAX_INITIAL_CARDS} from './constants.js';

import {
  createMarkers,
  returnMarkerMapToInitialState,
  clearCreateMarkers
} from './map.js';

import {throttle} from './utils.js';

const fieldType = document.querySelector('#housing-type');
const fieldPrice = document.querySelector('#housing-price');
const fieldRooms = document.querySelector('#housing-rooms');
const fieldQuests = document.querySelector('#housing-guests');

const filterForm = document.querySelector('.map__filters');
const localData = [];


const makeArrayFromFeatures = () => Array.from(filterForm.querySelectorAll('input[name ="features"]:checked'), (input) => input.value);

const resetFilterForm = (obj,maxQuantity) => {
  filterForm.reset();
  returnMarkerMapToInitialState();
  createMarkers(obj,maxQuantity);
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

const throttleActions = (cards) => {
  const checkedFeatures = makeArrayFromFeatures();
  const filteredCards = filterAdvertisementCards(cards,checkedFeatures);
  clearCreateMarkers(filteredCards,MAX_QUANTITY_ADVERTISEMENTS);
};

const showCards = (cards) => {
  localData.push(...cards.slice(0,MAX_INITIAL_CARDS));
  resetFilterForm(cards,MAX_QUANTITY_ADVERTISEMENTS);

  const onFilterChange = throttle(() => throttleActions(cards),THROTTLE__TIMEOUT);
  filterForm.addEventListener('change',onFilterChange);
};

export {showCards,resetFilterForm,localData};
