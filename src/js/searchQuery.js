import { apiMovie } from './api';
import { refs } from './refs';
import insertCardMarkup from './cardMarkup';
import storage from './storage';
import { Notify } from 'notiflix';
import Loader from './loader';
import Paginator from './paginator';
import { LANG, langAtr } from './onFirstRender';


const loader = new Loader();
const paginator = new Paginator();
let searchValue = '';

const form = document.querySelector('.header__form');
const input = form.querySelector(`input`);
const container = refs.cardContainer;
const sliderContainer =  document.querySelector('.top-slider__section');
//console.log('sliderContainer',sliderContainer);
form.addEventListener(`submit`, onSearch);

function getQueryData(e) {
 // console.log('here');
  
  let nowPage = paginator.getNumber(e);
  if (nowPage) {
    async function fetchByQueryFromPag(value, page) {
      try {
        const res = await apiMovie.searchMovieByQuery(value, page);
        console.log(page);

        if (!res.results) {
          loader.disable();
          return Notify.failure(`Sorry, no movies were found for your search.`);
        }
        storage.saveCurrentPage(res.results);
        storage.savePage(page);
        sliderContainer.style.display = "none";
        insertCardMarkup(res.results, container);
        ifPosterOfMovieIsNotFound();

        loader.disable();
        paginator.makeMarkup();
      } catch (error) {
        console.log(error);
      }
    }

    fetchByQueryFromPag(searchValue, paginator.currentPage);
  }
}

function onSearch(e) {
  e.preventDefault();
  searchValue = e.currentTarget.elements.searchQuery.value.trim();
 if (!searchValue ) {
    return Notify.info(`The input field cannot be empty!`);
    return;
  }

  loader.enable();

  fetchByQuery(searchValue, 1);

  paginator.pagination.addEventListener('click', getQueryData);

  input.addEventListener('change', e => {
    console.log(e.target.value);
    if (e.target.value !== '') {
      return;
    }
    window.location.href = './index.html';
  });
}

async function fetchByQuery(value, page) {
  try {
    const res = await apiMovie.searchMovieByQuery(value, page);

    if (!res.results) {
      loader.disable();
      return Notify.failure(`Sorry, no movies were found for your search.`);
    }

    paginator.totalPages = res.total_pages;
    storage.savePage(page);
    storage.saveCurrentPage(res.results);
    console.log('res.results', res.results);
    sliderContainer.style.display = "none";
   // slider.style.display = `none`;

    insertCardMarkup(res.results, container);
    ifPosterOfMovieIsNotFound();

    loader.disable();
    paginator.pagination.innerHTML = '';

    paginator.makeMarkup();
  } catch (error) {
    console.log(error);
  }
}

// if poster of film is not found
function ifPosterOfMovieIsNotFound() {
  const filmPostersNodeList = document.querySelectorAll(`.film_poster`);
  const massiveOfFilmPosters = Array.from(filmPostersNodeList);
  massiveOfFilmPosters.map(e => {
    if (e.src === `https://image.tmdb.org/t/p/originalnull`) {
      e.src = `https://img.freepik.com/premium-vector/movie-neon-sign-bright-signboard-light-banner-movie-time-logo-neon-emblem-vector-illustration_191108-314.jpg?w=2000`;
    }
  });
}

