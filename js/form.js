
const mapFilterInteractiveElements = [...document.querySelectorAll('.map__filter')];
const adForm = document.querySelector('.ad-form');
//form.classList.add('ad-form--disabled');
const setOfInteractiveElements = [...document.querySelectorAll('.ad-form__element')];
const mapFiltersForm = document.querySelector('.map__filters');
const mapFeaturesElem = document.querySelector('.map__features');
const adFormHeaderInput = document.querySelector('.ad-form-header');

/*слайдер тоже должен быть заблокирован? это див ad-form__slider. Его fieldset заблокирован, надо что = то еще?*/

const makeInactiveForm = () => {
  [adForm,mapFiltersForm,mapFeaturesElem].forEach((form) => form.classList.add('ad-form--disabled'));

  [setOfInteractiveElements,mapFilterInteractiveElements, adFormHeaderInput].forEach((element) => {
    if(Array.isArray(element)) {
      element.forEach((interactiveElement) => interactiveElement.setAttribute('disabled', ''));
    } else {
      element.setAttribute('disabled', '');
    }
  });
};

//makeInactiveForm()

const makeActiveForm = () => {
  [adForm,mapFiltersForm,mapFeaturesElem].forEach((form) => form.classList.remove('ad-form--disabled'));

  [setOfInteractiveElements,mapFilterInteractiveElements, adFormHeaderInput].forEach((element) => {
    if(Array.isArray(element)) {
      element.forEach((interactiveElement) => interactiveElement.removeAttribute('disabled'));
    } else {
      element.removeAttribute('disabled');
    }
  });
};

//makeActiveForm()


 // setOfInteractiveElements.forEach((interactiveElement) => interactiveElement.setAttribute('disabled', ''));
  // mapFilterInteractiveElements.forEach((element) => element.setAttribute('disabled',''));
  // adFormHeaderInput.setAttribute('disabled', '');
