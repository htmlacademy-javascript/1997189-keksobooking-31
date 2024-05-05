import {makeInactiveForm,makeActiveForm} from './utils.js';
import {createCard} from './generate-cards.js';
const mapFiltersForm = document.querySelector('.map__filters');//форма1
const mapFilterInteractiveElements = [...document.querySelectorAll('.map__filters select')];//все селекты форма 1
const mapFeaturesElem = [...document.querySelectorAll('.map__filters fieldset')];//филдсет в форме 1 чекбоксы
//const adForm = document.querySelector('.ad-form');//форма 2
const setOfAdFormInteractiveElements = [...document.querySelectorAll('.ad-form fieldset')];//все филдсеты в форме 2
const adForm = document.querySelector('.ad-form');//форма 2

//const baloonCardTemplate = document.querySelector('#card').content.querySelector('.popup');

//Настройки из документации openstreetmap
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//ЗУМ
const ZOOM = 10;

//КООРДИНАТЫ ЦЕНТРА ТОКИО
const cityCenter = {
  lat: 35.68948,
  lng: 139.69170,
};
makeInactiveForm(mapFiltersForm,mapFilterInteractiveElements,mapFeaturesElem);//Передаем ФОРМу1
makeInactiveForm(adForm,setOfAdFormInteractiveElements);//Передаем ФОРМу 2

//создаем объект карты, в него передаем элемент map-canvas, куда нужно поместить карту, координаты
const map = L.map('map-canvas')
  .on('load',() => {
    makeActiveForm(mapFiltersForm,mapFilterInteractiveElements,mapFeaturesElem);//Передаем ФОРМу1
    makeActiveForm(adForm,setOfAdFormInteractiveElements);//Передаем ФОРМу 2
  })
  .setView(cityCenter,ZOOM);
L.tileLayer(TILE_LAYER, {
  attribution: COPYRIGHT
}).addTo(map);//метод для добавления всего, что насоздовалось в OpenStreetMap в нашу оболочку для карты Leaflet
const address = adForm.querySelector('#address');
const START_COORDINATE = {
  lat: 35.68948,
  lng: 139.69170,
};

const mainIconConfig = {
  url: './img/main-pin.svg',
  width: 52,
  height: 52,
  anchorX: 26,
  anchorY: 52,
};

const mainPinIcon = L.icon({
  iconUrl: mainIconConfig.url,
  iconSize: [mainIconConfig.width, mainIconConfig.height],
  iconAnchor: [mainIconConfig.anchorX, mainIconConfig.anchorY],
});

//создаем маркер; указываем старт координат
const mainPinMarker = L.marker (START_COORDINATE,
  {
    draggable: true,//маркер перемещаем
    icon: mainPinIcon,
  },
);

const {lat:latForMainPin,lng:lngForMainPin} = mainPinMarker.getLatLng();
address.value = `${latForMainPin},${lngForMainPin}`;

mainPinMarker.addTo(map);//доб маркер на карту
//коненые Координаты перемещенной мыши

mainPinMarker.on('moveend',(evt) => {
  const {lat:latForInput,lng:lngForInput} = evt.target.getLatLng();
  address.value = `${latForInput},${lngForInput}`;//ОБРАБОТАТЬ КООРДИНАТЫ В ПОЛЕ АДРЕС!!!
});

//добавила свой пин на карту
mainPinMarker.addTo(map);

const pinIconsConfig = {
  url: './img/pin.svg',
  width: 40,
  height: 40,
  anchorX: 20,
  anchorY: 40,
};


const pinIcons = L.icon({
  iconUrl: pinIconsConfig.url,
  iconSize: [pinIconsConfig.width, pinIconsConfig.height],
  iconAnchor: [pinIconsConfig.anchorX, pinIconsConfig.anchorY],
});
const markerGroup = L.layerGroup().addTo(map);
console.log(markerGroup)

const createMarker = (datum) => {
  const {lat,lng} = datum.location;
  //createCard(datum);

  const marker = L.marker({
    lat,
    lng,
  },
  {
    icon: pinIcons,
  });
  marker.addTo(markerGroup)
    .bindPopup(createCard(datum));
  //return marker;//зачем здесь ретерн работает без него
};

export const createMarkers = (data) => {
  data.forEach((datum) => {
    createMarker(datum);
  });

};
const btn = document.querySelector('.btn');
console.log(btn)
btn.addEventListener('click', (evt) => {

  markerGroup.clearLayers();
})
//debugger;

//markerGroup.clearLayer();
console.log(markerGroup);


/*export const createCustomPopup = (datumForPopup) => {
  const popup = baloonCardTemplate.cloneNode(true);
  console.log(popup);
  const popupImg = popup.querySelector('.popup__avatar');
  const popupTitle = popup.querySelector('.popup__title');
  const popupText = popup.querySelector('.popup__text--address');
  const popupPrice = popup.querySelector('.popup__text--price');
  const popupType = popup.querySelector('.popup__type');
  const popupCapacity = popup.querySelector('.popup__text--capacity');
  const popupTime = popup.querySelector('.popup__text--time');
  console.log(popupTime);
  console.log(popupCapacity);

  popupImg.src = datumForPopup.author.avatar;
  popupTitle.textContent = datumForPopup.offer.title;
  popupText.textContent = Object.values(datumForPopup.offer.address);
  popupPrice.firstChild.textContent = datumForPopup.offer.price;
  popupType.textContent = translateType(datumForPopup.offer.type);
  popupCapacity.textContent = `${datumForPopup.offer.rooms} комнаты для ${datumForPopup.offer.guests} гостей`;
  popupTime.textContent = `Заезд после ${datumForPopup.offer.checkin}, выезд до ${datumForPopup.offer.checkout}`;





  console.log(popupTitle)
  console.log(datumForPopup);
};
*/

// export const findAdressForMarker = (data) => data.forEach((datum) => {
//   const {lat,lng} = datum.location;

//   //createCustomPopup(datum);
//   createCard(datum);

//   const marker = L.marker({
//     lat,
//     lng,
//   },
//   {
//     icon: pinIcons,
//   });

//   marker.addTo(map)
//     .bindPopup(createCard(datum));
// });
//export const findAdressForMarker = (data) => data.forEach
//});
