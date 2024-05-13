import {makeInactiveForm,makeActiveForm} from './utils.js';
import {createCard} from './generate-cards.js';
const mapFiltersForm = document.querySelector('.map__filters');//форма1
const mapFilterInteractiveElements = [...document.querySelectorAll('.map__filters select')];//все селекты форма 1
const mapFeaturesElem = [...document.querySelectorAll('.map__filters fieldset')];//филдсет в форме 1 чекбоксы
//const adForm = document.querySelector('.ad-form');//форма 2
const setOfAdFormInteractiveElements = [...document.querySelectorAll('.ad-form fieldset')];//все филдсеты в форме 2
const adForm = document.querySelector('.ad-form');//форма 2


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

    makeActiveForm(adForm,setOfAdFormInteractiveElements);//Передаем ФОРМу 2
  })
  .setView(cityCenter,ZOOM);
L.tileLayer(TILE_LAYER, {
  attribution: COPYRIGHT
}).addTo(map);//метод для добавления всего, что насоздовалось в OpenStreetMap в нашу оболочку для карты Leaflet

export const setStartingAddress = () => {
  address.value = `${latForMainPin},${lngForMainPin}`;
  return address.value;
 // console.log(address.value)
  //address.value = `${cityCenter.lat},${cityCenter.lng}`;
};
//присвоение полю адреса изначальных координат
setStartingAddress();

mainPinMarker.addTo(map);//доб маркер на карту

//конечные Координаты перемещенной мыши
//координаты нужно привести к числу?
mainPinMarker.on('moveend',(evt) => {
  const {lat:latForInput,lng:lngForInput} = evt.target.getLatLng();
  address.value = `${latForInput.toFixed(5)} ${lngForInput.toFixed(5)}`;
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

const createMarker = (datum) => {
  const {lat,lng} = datum.location;

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
btn.addEventListener('click', () => {
  markerGroup.clearLayers();
});


export const returnMarkerToStart = () => mainPinMarker.setLatLng(START_COORDINATE);
//Возвращение красной метки на место по нажатию на кнопку очистить

