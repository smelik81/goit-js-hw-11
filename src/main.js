
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { searchPhoto } from "./js/pixabay-api";
import { createMarkup } from './js/render-functions';

let lightbox = new SimpleLightbox('.gallery a', {
  sourceAttr: 'href',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

const formSearch = document.querySelector('.js__search-form');
const list = document.querySelector('.js__list');
const loader = document.querySelector('.js__loader');

formSearch.addEventListener('submit', onHandleSubmit);
function onHandleSubmit(event) {
    event.preventDefault();
    const { picture } = event.currentTarget.elements;
    const searchStr = picture.value.trim();
    list.innerHTML = "";
    loader.classList.remove('hide');
  
    if (!searchStr) {
        iziToast.error({
            title: 'Error',
            message: 'Please enter details'
        })
      loader.classList.add('hide');
        return;
    }
   
    searchPhoto(picture.value)
        .then(data => {
          if (!data.hits.length) {  
            iziToast.error({
              title: 'Error',
              message:
                'Sorry, there are no images matching your search query. Please try again!',
              position: 'bottomCenter',
              transitionIn: 'bounceInUp',
              messageColor: 'white',
              timeout: 5000,
            })
          } 
          else {
            setTimeout(() => {
              list.insertAdjacentHTML(
                'beforeend',
                createMarkup(data.hits)
              );
              lightbox.refresh();
            }, 1000)
          }
        })
      
        .catch(error => {
          iziToast.error({
            title: 'Error',
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            position: 'bottomCenter',
            transitionIn: 'bounceInUp',
            messageColor: 'white',
            timeout: 2000,
          });
            loader.classList.add('hide');
      })
      .finally(() => {
        loader.classList.add('hide');  
        formSearch.reset();
        })
  
};


