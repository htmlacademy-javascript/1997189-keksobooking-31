import {PRICE} from './constants.js';

export const filterByType = (obj) => {
  const newArr = obj.filter ((card) => card.offer.type === 'flat');
  console.log(newArr);//массив объектов отсортированный по флэт 10 штук
};

export const filterByPrice = (obj) => {
  const newArr = obj.filter((card) => card.offer.price < 10000);
  console.log(newArr)//4
  const newArr1 = obj.filter((card) => card.offer.price > 50000);
  console.log(newArr1)
  const newArr2 = obj.filter((card) => card.offer.price <= 50000 && card.offer.price >= 10000);
  console.log(newArr2);//22
};

export const filterByRooms = (obj) => {
  const newArr = obj.filter((card) => card.offer.rooms)
}


const fieldType = document.querySelector('#housing-type');
console.log(fieldType.children[0].selected)
const fieldPrice = document.querySelector('#housing-price');
const fieldRooms = document.querySelector('#housing-rooms');
const fieldQuests = document.querySelector('#housing-guests');
const fielsFeatures = document.querySelector('#housing-features');
// selectFieldType.addEventListener('change',() => {
//   console.log(selectFieldType.value)
// })
// console.log(selectFieldType.value)

const filterForm = document.querySelector('.map__filters');


const makeArrayFromFeatures = () => Array.from(filterForm.querySelectorAll('input[name ="features"]:checked'), (input) => input.value);


export const filterCards = (cards) => {

  filterForm.addEventListener('change',() => {
    const checkedFeatures = makeArrayFromFeatures();
    const newArr = cards
      .filter((card) => fieldType.children[0].selected || card.offer.type === fieldType.value)
      .filter((card) => fieldPrice.children[0].selected || (card.offer.price >= PRICE[fieldPrice.value].min) && (card.offer?.price <= PRICE[fieldPrice.value].max))
      .filter((card) => fieldRooms.children[0].selected || card.offer.rooms === Number(fieldRooms.value))
      .filter((card) => fieldQuests.children[0].selected || card.offer.guests === Number(fieldQuests.value))
      .filter((card) => checkedFeatures.every((feature) => card.offer.features?.includes(feature)));
      // .filter((card) => card.offer.features?.every((feature) => checkedFeatures.includes(feature)));
      console.log(newArr);
  });
};


// card.offer.features?.every((featureFromServer) => {

//   const checkedfeatures = makeArrayFromFeatures();
//   console.log(checkedfeatures);
//   if(checkedfeatures.length) {
//     checkedfeatures.includes(featureFromServer);
//   }
// }
