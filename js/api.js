
import {ErrorText,BASE_URL,Method,Route} from './constants.js';
import {showSuccessMessage,resetForm,showErrorMessageForSending,unBlockSubmitBtn} from './form.js';

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        console.log('в ноу респонс');
        throw new Error(errorText);
      }
      console.log('в респонс');
      return response.json();
    })
    .catch(() => {
      console.log('в кетч')
      throw new Error(errorText);
    });

export const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

export const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

// export const sendData = (body) => {
//   fetch(
//     `${BASE_URL}${Route.SEND_DATA}`,
//     {
//       method: 'POST',
//       body,
//     },
//   ).then((response) => {
//     if(response.ok) {
//       resetForm();
//       showSuccessMessage();
//     } else {
//       showErrorMessageForSending();
//       throw new Error(ErrorText.SEND_DATA);
//     }
//   })
//     .catch((err) => {
//       throw new Error(err.message);
//     })
//     .finally(() => {
//       unBlockSubmitBtn();
//     });
// };

// export const getData = (onSuccess,onError) => {
//   fetch(`${BASE_URL}${Route.GET_DATA}`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(ErrorText.GET_DATA);//почему не выбрасывается ошибка???
//       }
//      // makeActiveForm(mapFiltersForm,mapFilterInteractiveElements,mapFeaturesElem);//Передаем ФОРМу1 КУДА ПОСТАВИТЬ АКТИВАЦИЮ ФОРМЫ? ТРЕТИМ ПАРАМЕТРОМ ИЛИ УБРАТЬ ОТСЮДА ВООБЩЕ?
//       return response.json();
//     })
//     .then((cards) => {
//       onSuccess(cards);
//     })
//     .catch(() => {
//       onError();
//       throw new Error(ErrorText.GET_DATA);
//     });
// };

// export const sendData = (body) => {
//   fetch(
//     `${BASE_URL}${Route.SEND_DATA}`,
//     {
//       method: 'POST',
//       body,
//     },
//   ).then((response) => {
//     if(response.ok) {
//       resetForm();
//       showSuccessMessage();
//     } else {
//       showErrorMessageForSending();
//       throw new Error(ErrorText.SEND_DATA);
//     }
//   })
//     .catch((err) => {
//       throw new Error(err.message);
//     })
//     .finally(() => {
//       unBlockSubmitBtn();
//     });
// };



//const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);




// export const getData = (onSuccess,onError) => {
//   fetch(`${BASE_URL}${Route.GET_DATA}`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(ErrorText.GET_DATA);//почему не выбрасывается ошибка???
//       }
//      makeActiveForm(mapFiltersForm,mapFilterInteractiveElements,mapFeaturesElem);//Передаем ФОРМу1 КУДА ПОСТАВИТЬ АКТИВАЦИЮ ФОРМЫ? ТРЕТИМ ПАРАМЕТРОМ ИЛИ УБРАТЬ ОТСЮДА ВООБЩЕ?
//       return response.json();
//     })
//     .then((cards) => {
//       onSuccess(cards);
//     })
//     .catch(() => {
//       onError();
//       throw new Error(ErrorText.GET_DATA);
//     });
// };
