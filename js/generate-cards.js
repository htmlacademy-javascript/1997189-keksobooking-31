import{translateType} from './utils.js';

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

const createCard = (datum) => {
  const {author,offer} = datum;
  const {title,address,guests,price,rooms,type,checkin,checkout,description,features,photos} = offer;
  const {avatar} = author;
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

  popupTitle.textContent = title;
  popupAdress.textContent = address;
  popupPrice.textContent = `${price} ₽/ночь`;
  quantityOfGuests.textContent = `${rooms} комнаты для ${guests} гостей`;
  popupType.textContent = translateType(type);
  time.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;

  if(!description) {
    hideElement(offerDescription);
  } else {
    offerDescription.textContent = description;
  }

  if (!avatar) {
    hideElement(popupAvatar);
  } else {
    popupAvatar.src = avatar;
  }

  if (!photos) {
    hideElement(offerPhotosImage);
  } else {
    renderPhotos(photos,offerPhotosImage,offerPhotos);
  }

  if(features) {
    renderFeatures(featuresListItems,features);
  }

  return cardElement;
};

export {createCard};
