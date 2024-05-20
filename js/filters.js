import {PRICE,MAX_QUANTITY_ADVERTISEMENTS} from './constants.js';
import {createMarkers,markerGroup} from './map.js';
import {debounce} from './utils.js';

const fieldType = document.querySelector('#housing-type');
const fieldPrice = document.querySelector('#housing-price');
const fieldRooms = document.querySelector('#housing-rooms');
const fieldQuests = document.querySelector('#housing-guests');

const filterForm = document.querySelector('.map__filters');


const makeArrayFromFeatures = () => Array.from(filterForm.querySelectorAll('input[name ="features"]:checked'), (input) => input.value);

const resetFilterForm = () => filterForm.reset();

export const filterCards = (cards) => {
  resetFilterForm();
  createMarkers(cards,MAX_QUANTITY_ADVERTISEMENTS);

  filterForm.addEventListener('change',() => {
    markerGroup.clearLayers();

    const checkedFeatures = makeArrayFromFeatures();

    const newArr = cards
      .filter((card) => fieldType.children[0].selected || card.offer.type === fieldType.value)
      .filter((card) => fieldPrice.children[0].selected || (card.offer.price >= PRICE[fieldPrice.value].min) && (card.offer?.price <= PRICE[fieldPrice.value].max))
      .filter((card) => fieldRooms.children[0].selected || card.offer.rooms === Number(fieldRooms.value))
      .filter((card) => fieldQuests.children[0].selected || card.offer.guests === Number(fieldQuests.value))
      .filter((card) => checkedFeatures.every((feature) => card.offer.features?.includes(feature)));
    // debounce(createMarkers(newArr,MAX_QUANTITY_ADVERTISEMENTS),
    //   1000,
    // );
    const debounceFunction = (debounce(() => createMarkers(newArr,MAX_QUANTITY_ADVERTISEMENTS),1000));

    debounceFunction();
  });
};
