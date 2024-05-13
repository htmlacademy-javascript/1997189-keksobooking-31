export const MAX_AUTHOR_QUANTITY = '10';

export const TITLE = [
  'Заголовок объявления',
  'Заголовок объявления2',
  'Заголовок объявления3',
  'Заголовок объявления4',
  'Заголовок объявления5',
  'Заголовок объявления6',
  'Заголовок объявления7',
  'Заголовок объявления8',
  'Заголовок объявления9',
  'Заголовок объявления10',
];

export const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  // 'conditioner'
];

export const MIN_LATITUDE = 35.65000;
export const MAX_LATITUDE = 35.70000;

export const MIN_LONGITUDE = 139.70000;
export const MAX_LONGITUDE = 139.80000;

export const DESCRIPTION = [
  'Строка, заполнить самостоятельно1',
  'Строка, заполнить самостоятельно2',
  'Строка, заполнить самостоятельно3',
  'Строка, заполнить самостоятельно4',
  'Строка, заполнить самостоятельно5',
  'Строка, заполнить самостоятельно6',
  'Строка, заполнить самостоятельно7',
];

export const MIN_PRICE = 30;//САМА ПРИДУМАЛА ЦЕНУ
export const MAX_PRICE = 100;//САМА ПРИДУМАЛА ЦЕНУ

export const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

export const ROOM_MIN_COUNT = 1;
export const ROOM_MAX_COUNT = 10;

export const MIN_GUESTS = 1;
export const MAX_GUESTS = 10;

export const CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];


export const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

export const MAX_LENGTH_ADVERTISEMENT_ARR = 10;

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


