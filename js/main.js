import './form.js';

import {getArrayOfAdvertisements} from './data.js';
import {createCard} from './generate-cards.js';

const data = getArrayOfAdvertisements();

createCard(data[0]);
console.log(data[0])
