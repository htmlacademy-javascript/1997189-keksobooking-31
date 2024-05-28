import {FILE_TYPES} from './constants.js';

const avatarInput = document.querySelector('#avatar');

const avatarPreview = document.querySelector('.ad-form-header__preview img');

const avatarInputListener = () => {
  avatarInput.addEventListener('change',() => {
    const file = avatarInput.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if(matches) {
      avatarPreview.src = URL.createObjectURL(file);
    }
  });
};

export {avatarInputListener};
