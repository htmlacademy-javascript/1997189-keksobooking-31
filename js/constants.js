export const MAX_AUTHOR_QUANTITY = '10';
export const MIN_LATITUDE = 35.65000;
export const MAX_LATITUDE = 35.70000;
export const MIN_LONGITUDE = 139.70000;
export const MAX_LONGITUDE = 139.80000;
export const MAX_QUANTITY_ADVERTISEMENTS = 10;

export const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

export const CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];

export const RATIO_ROOMS_GUESTS = {
  '1': ['1'],
  '2' : ['1','2'],
  '3' : ['1','2','3'],
  '100': ['0'],
};

export const RATIO_TYPE_MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

export const MAX_PRICE_ROOM = 100000;

export const BASE_URL = 'https://31.javascript.htmlacademy.pro/keksobooking';

export const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

export const Method = {
  GET: 'GET',
  POST: 'POST',
};

export const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

export const PRICE = {
  'any' : {min: 0, max: 100000},
  'low' : {min: 0, max: 10000},
  'middle' : {min: 10000, max: 50000},
  'high' : {min: 50000, max: 100000},
};

export const THROTTLE__TIMEOUT = 1000;
export const MAX_INITIAL_CARDS = 10;

export const FILE_TYPES = ['jpg', 'jpeg', 'png'];
