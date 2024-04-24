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

const renderFeatures = (listItems,arrOfFeatures) => {
  listItems.forEach((item) => {
    const hasFeature = arrOfFeatures.some((feature) => item.classList.contains(`popup__feature--${feature}`));
    if(!hasFeature) {
      item.remove();
    }
  });
};

const hideElement = (field) => {
  field.classList.add('hidden');
};

const advertisementCardTemplate = document.querySelector('#card').content.querySelector('.popup');

const map = document.querySelector('#map-canvas');

const createCard = ({author,offer:{title,address,guests,price,rooms,type,checkin,checkout,description,features,photos}}) => {
  const fragment = document.createDocumentFragment();
  //console.log({author,offer:{title,address,guests,price,rooms,type,checkin,checkout,description,features,photos}});
  const cardElement = advertisementCardTemplate.cloneNode(true);
  const popupTitle = cardElement.querySelector('.popup__title');
  const popupAdress = cardElement.querySelector('.popup__text--address');
  const popupPrice = cardElement.querySelector('.popup__text--price');
  const quantityOfGuests = cardElement.querySelector('.popup__text--capacity');
  const popupType = cardElement.querySelector('.popup__type');
  const time = cardElement.querySelector('.popup__text--time');
  const offerDescription = cardElement.querySelector('.popup__description');
  const offerPhotos = cardElement.querySelector('.popup__photos');
  const offerPhotosImage = cardElement.querySelector('.popup__photos img');
  const featuresListItems = [...cardElement.querySelectorAll('.popup__feature')];
  const popupAvatar = cardElement.querySelector('.popup__avatar');

  if(!title) {
    hideElement(popupTitle);
  } else {
    popupTitle.textContent = title;
  }

  if(Object.values(address).length === 0) {
    hideElement(popupAdress);
  } else {
    popupAdress.textContent = `${address.lat} ${address.lng}`;
  }

  if(!price) {
    hideElement(popupPrice);
  } else {
    popupPrice.textContent = `${price} ₽/ночь`;
  }

  if(!rooms || !guests) {
    hideElement(quantityOfGuests);
  } else {
    quantityOfGuests.textContent = `${rooms} комнаты для ${guests} гостей`;// КОРРЕКЦИЯ ОКОНЧАНИЙ СУЩЕСТВИТЕЛЬНЫХ!
  }

  if(!type) {
    hideElement(popupType);
  } else {
    popupType.textContent = translateType(type);
  }

  if(!checkin || !checkout) {
    hideElement(time);
  } else {
    time.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  }


  offerDescription.textContent = description;
  if(!author.avatar) {
    hideElement(popupAvatar);
  } else {
    popupAvatar.src = author.avatar;
  }

  renderFeatures(featuresListItems,features);

  if(photos.length === 0) {
    hideElement(offerPhotosImage);
  } else {
    renderPhotos(photos,offerPhotosImage,offerPhotos);
  }

  fragment.appendChild(cardElement);

  map.appendChild(fragment);

  console.log(map);
};

export {createCard };
