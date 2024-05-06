//import{onPriceInputChange} from './form.js';
const sliderContainer = document.querySelector('.ad-form__slider');
const priceInput = document.querySelector('#price');

priceInput.value = 80000;

noUiSlider.create(sliderContainer, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 80000,
  step: 1000,
  connect: 'lower',
  format:
  {
    to: function (value) {
      return Number.isInteger(value)
        ? value.toFixed(0)
        : value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }
});

sliderContainer.noUiSlider.on('update', () => {
  if(priceInput.value > 100000) {
    return;
  }
  priceInput.value = sliderContainer.noUiSlider.get();
});

priceInput.addEventListener('change', (evt) => {
  if (priceInput.value > 100000) {
    sliderContainer.noUiSlider.reset();
  }
  sliderContainer.noUiSlider.set(evt.target.value);
});
