import {getData} from './api.js';
import {createMarkers} from './map.js';
import {showDataErrorMessage} from './utils.js';


getData((cards) => {
  createMarkers(cards);
},showDataErrorMessage);
