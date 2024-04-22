//import './generate-cards.js';

import {getArrayOfAdvertisements} from './data.js';
import {FEATURES} from './constance.js';
import {createCard } from './generate-cards.js';

const data = getArrayOfAdvertisements();

createCard(data);


