import {getRandomInteger,getRandomFractional,getUniqueInteger,getAuthorCount} from './utils.js';
import {
  FEATURES,
  MIN_LATITUDE,
  MAX_LATITUDE,
  MIN_LONGITUDE,
  MAX_LONGITUDE,
  TITLE,
  MIN_PRICE,
  MAX_PRICE,
  TYPE,
  ROOM_MIN_COUNT,
  ROOM_MAX_COUNT,
  MIN_GUESTS,
  MAX_GUESTS,
  CHECKIN,
  DESCRIPTION,
  PHOTOS,
  MAX_LENGTH_ADVERTISEMENT_ARR} from './constance.js';


const getLatitude = getRandomFractional;
const getLongitude = getRandomFractional;

const uniqueArrFeatures = getUniqueInteger(0,FEATURES.length - 1);
const getRandomArrayElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];
const authorCount = getAuthorCount();
//const getUniqueArrayElement = (arr) => arr[uniqueArrFeatures(0,arr.length - 1)];

const createAuthor = () => ({
  avatar:`img/avatars/user${authorCount()}.png`,
});

const createLocation = () => ({
  lat: getLatitude(MIN_LATITUDE,MAX_LATITUDE),
  lng: getLongitude(MIN_LONGITUDE,MAX_LONGITUDE)
});

const createOffer = () => ({
  title: getRandomArrayElement(TITLE),
  address: createLocation(),
  price: getRandomInteger(MIN_PRICE,MAX_PRICE),
  type: getRandomArrayElement(TYPE),
  rooms: getRandomInteger(ROOM_MIN_COUNT,ROOM_MAX_COUNT),
  guests: getRandomInteger(MIN_GUESTS,MAX_GUESTS),
  checkin: getRandomArrayElement(CHECKIN),
  checkout: getRandomArrayElement(CHECKIN),
  features: FEATURES,//FEATURES[uniqueArrFeatures()],//дз 2 знач не должн повтор
  description:getRandomArrayElement(DESCRIPTION),
  photos: PHOTOS//getRandomArrayElement(PHOTOS),
});

const createAdvertisement = () => ({
  author: createAuthor(),
  offer: createOffer(),
  location: createLocation()
});

const getArrayOfAdvertisements = () => Array.from({length: MAX_LENGTH_ADVERTISEMENT_ARR}, createAdvertisement);

export{getArrayOfAdvertisements};
