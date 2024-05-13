export const MAX_AUTHOR_QUANTITY = '10';
export const MIN_LATITUDE = 35.65000;
export const MAX_LATITUDE = 35.70000;

export const MIN_LONGITUDE = 139.70000;
export const MAX_LONGITUDE = 139.80000;

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


//СООТНОШЕНИЕ КОЛ-ВО КОМНАТ: КОЛИЧЕСТВО ГОСТЕЙ
export const RATIO_ROOMS_GUESTS = {
  '1': ['1'],
  '2' : ['1','2'],
  '3' : ['1','2','3'],
  '100': ['0'],
};

//соотношение типа жилья и стоимости
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

export const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};


