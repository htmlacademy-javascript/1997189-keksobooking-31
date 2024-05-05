import './form.js';
import './slider.js';
import {createMarkers} from './map.js';

import {getArrayOfAdvertisements} from './data.js';


const data = getArrayOfAdvertisements();

//createCard(data[0]);
console.log(data)
console.log(L)

createMarkers(data);
