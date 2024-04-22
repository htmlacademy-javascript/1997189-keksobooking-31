const translateType = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
    default:
      return type;
  }
};

// const checkQuantityOfGuests = (guests) => {
//   String(guests);
//   if(String(guests).match(/^1$/)) {
//     return console.log(`${guests} комната`);
//   } else if (String(guests).match(/[2-4]$/)) {
//     return console.log(`${guests} комнаты`);
//   }
//   return console.log(`${guests} комнат`);
// };

// checkQuantityOfGuests('102');
// checkQuantityOfGuests('1');
// checkQuantityOfGuests('2');
// checkQuantityOfGuests('3');
// checkQuantityOfGuests('4');
// checkQuantityOfGuests('5');
// checkQuantityOfGuests('6');
// checkQuantityOfGuests('11');
// checkQuantityOfGuests('12');
// checkQuantityOfGuests('22');
// checkQuantityOfGuests('21');


const renderPhotos = (arrOfPhotos,elemForRender,elemContainer) => {
  const fragment = document.createDocumentFragment();
  arrOfPhotos.forEach((element) => {
    const photoCard = elemForRender.cloneNode(true);
    elemForRender.remove();
    photoCard.src = element;
    fragment.appendChild(photoCard);
  });
  elemContainer.appendChild(fragment);
};


    // const renderFeatures = (arrOfFeatures) => {

    // }

    // const findFeature = (arrOfFeatures,feature) => {
    // //arrOfFeatures.find(feature) ? renderFeatures() :
    // }

const advertisementCardTemplate = document.querySelector('#card').content.querySelector('.popup');

const map = document.querySelector('#map-canvas');

const createCard = (cards) => {
  const fragment = document.createDocumentFragment();
  cards.forEach((card) => {
    console.log(card);
    const cardElement = advertisementCardTemplate.cloneNode(true);

    const title = cardElement.querySelector('.popup__title');
    title.textContent = card.offer.title;

    const address = cardElement.querySelector('.popup__text--address');
    address.textContent = `${card.offer.address.lat} ${card.offer.address.lat}`;

    const price = cardElement.querySelector('.popup__text--price');
    price.textContent = `${card.offer.price} ₽/ночь`;

    const quantityOfGuests = cardElement.querySelector('.popup__text--capacity');
    quantityOfGuests.textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;// КОРРЕКЦИЯ ОКОНЧАНИЙ СУЩЕСТВИТЕЛЬНЫХ!

    const type = cardElement.querySelector('.popup__type');
    type.textContent = translateType(card.offer.type);

    const time = cardElement.querySelector('.popup__text--time');
    time.textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;

    const featuresList = [...cardElement.querySelector('.popup__features').children];
    //renderFeatures(card.offer.features);
    //console.log(featuresList);
    // featuresList.forEach((elem) => {
    //   console.log(elem)
    // });
    const offerDescription = cardElement.querySelector('.popup__description');
    offerDescription.textContent = card.offer.description;

    const offerPhotos = cardElement.querySelector('.popup__photos');
    const offerPhotosImage = cardElement.querySelector('.popup__photos img');

    renderPhotos(card.offer.photos,offerPhotosImage,offerPhotos);

    const avatar = cardElement.querySelector('.popup__avatar');
    avatar.src = card.author.avatar;

    fragment.appendChild(cardElement);
  });
  map.appendChild(fragment);
  console.log(map);
};

export {createCard };
