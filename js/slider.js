import{onPriceInputChange} from './form.js';
const sliderContainer = document.querySelector('.ad-form__slider');
const priceInput = document.querySelector('#price');

priceInput.value = 80000;

noUiSlider.create(sliderContainer, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 80000,
  step: 1,
  connect: 'lower',
});

sliderContainer.noUiSlider.on('update', () => {
  //console.log(rest);
  if (priceInput.value > 100000) {
    sliderContainer.noUiSlider.set(100000);
    throw new Error('Значение может быть не больше 100000');//ПОДУМАТЬ , ЧТО ДЕЛАТЬ, ЕСЛИ ПОЛЬЗОВАТЕЛЬ ВВЕЛ ЗНАЧЕНИЕ БОЛЬШЕ 100 000 ОШИБКА ВЫХОДИТ
  }
  priceInput.value = sliderContainer.noUiSlider.get();
});

priceInput.addEventListener('change', (evt) => {
  if(evt.target.value > 100000) {
    // sliderContainer.noUiSlider.set(100000);//для уравнения
    // priceInput.value += priceInput.value;//для уравнения
    //console.log(priceInput.value);

  } else {
    sliderContainer.noUiSlider.set(evt.target.value);
  }


});


// export const getInputValueToSlider = (evt) => sliderContainer.noUiSlider.set(evt.target.value);


// priceInput.addEventListener('change',getInputValueToSlider);
