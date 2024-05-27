import {makeInactiveForm,makeActiveForm} from './utils.js';
import {createCard} from './generate-cards.js';

const mapFiltersForm = document.querySelector('.map__filters');
const mapFilterInteractiveElements = [...document.querySelectorAll('.map__filters select')];
const mapFeaturesElem = [...document.querySelectorAll('.map__filters fieldset')];

const setOfAdFormInteractiveElements = [...document.querySelectorAll('.ad-form fieldset')];
const adForm = document.querySelector('.ad-form');
const address = adForm.querySelector('#address');

const START_COORDINATE = {
  lat: 35.68948,
  lng: 139.69170,
};

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const ZOOM = 10;

const cityCenter = {
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

const mainPinMarker = L.marker (START_COORDINATE,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const {lat:latForMainPin,lng:lngForMainPin} = mainPinMarker.getLatLng();

makeInactiveForm(mapFiltersForm,mapFilterInteractiveElements,mapFeaturesElem);
makeInactiveForm(adForm,setOfAdFormInteractiveElements);

const map = L.map('map-canvas')
  .on('load',() => {
    makeActiveForm(adForm,setOfAdFormInteractiveElements);//Передаем ФОРМу 2
  })
  .setView(cityCenter,ZOOM);
L.tileLayer(TILE_LAYER, {
  attribution: COPYRIGHT
}).addTo(map);

const setStartingAddress = () => {
  address.value = `${latForMainPin.toFixed(5)},${lngForMainPin.toFixed(5)}`;
  return address.value;
};

setStartingAddress();

mainPinMarker.addTo(map);

mainPinMarker.on('moveend',(evt) => {
  const {lat:latForInput,lng:lngForInput} = evt.target.getLatLng();
  address.value = `${latForInput.toFixed(5)} ${lngForInput.toFixed(5)}`;
});

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
};

const createMarkers = (data,maxQuantity) => {
  data.slice(0,maxQuantity).forEach((datum) => {
    createMarker(datum);
  });
};

const returnMarkerMapToInitialState = () => {
  mainPinMarker.setLatLng(START_COORDINATE);
  map.setView(START_COORDINATE, ZOOM);
};

const clearCreateMarkers = (newArr,quantity) => {
  markerGroup.clearLayers();
  createMarkers(newArr,quantity);
};

export {
  map,
  setStartingAddress,
  markerGroup,
  createMarker,
  createMarkers,
  returnMarkerMapToInitialState,
  clearCreateMarkers
};
