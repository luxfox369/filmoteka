

import{ scrollFunction} from './btnUp'
import { apiMovie } from './api';
import insertCardMarkup from './cardMarkup';
import insertSliderMarkup from './sliderMarkup';
import storage from './storage';
import { refs } from './refs';
import Paginator from './paginator';
import Loader from './loader';
import { getGenresNames } from './getGenresNames';
import { language } from './language';

const paginator = new Paginator();
const loader = new Loader();
const moviesContainer = refs.cardContainer;
export let allGenres = [];
let LANG = 'en-EN';
let langAtr ='eng';
    

if (paginator.pagination) {
  paginator.pagination.addEventListener('click', onClickPagination);
}
export function onClickPagination(e) {
  paginator.getNumber(e);
  loader.enable();
  render(paginator.currentPage);
}
async function getArrGenres() {
    try {
      const { genres } = await apiMovie.fetchGenres();
     // const genresToSave = genres.reduce((acc, { id, name }) => {
    //    acc[id] = name;
    //    return acc;
    //  }, {});
      // window.localStorage.setItem('genres', JSON.stringify(genresToSave));
      storage.saveGenres(genres);
      allGenres = storage.loadGenres();
    } catch (error) { }
  }

async function render(page) {
  const { results } = await apiMovie.fetchAllMovie(page);
  storage.saveCurrentPage(results);
  insertCardMarkup(results, moviesContainer);
  loader.disable();
}



window.addEventListener('load', onLoad);
 
//********вибір мови
console.log('LANG from onFirstRender до вибору',LANG);
console.log('langAtr from onFirstRender до вибору', langAtr);
//console.log('refs.switch', refs.switch);
if (refs.switch) {
  refs.switch.addEventListener("click", onChecked);
}
function  onChecked(e) {
  let element = e.currentTarget;
 
  if (element.checked) {
    console.log('element.checked', element.checked);
    LANG = "uk-UA";
    langAtr = 'ua';
    console.log('langAtr from onFirstRender після вибору', langAtr);
    getArrGenres();
    onLoad('load');
   
  }
  else {
    LANG = "en-EN";
    langAtr = 'eng';
    console.log('langAtr from onFirstRender після вибору', langAtr);
    getArrGenres();
    onLoad('load');
  }
   
}
//************************* */
async function onLoad(e) {
  //e.preventDefault();
  //if (storage.loadGenres().length < 1)
    getArrGenres();
  
  //якщо library затягаємо queue
  if (refs.libraryBtn.classList.contains('current')) {
     //тут змінити текст кнопок add/remove watched/queue
     const queueMovies = storage.loadFromQueue();
     insertCardMarkup(queueMovies, refs.libraryContainer);
     refs.libQueueBtn.classList.add('active');
    return;
  }
  //якщо home
  try {
    //тут змінити текст кнопок home/my library
    const { results } = await apiMovie.fetchMovieWeek(); //затягаємо топ за тиджень для слайдера
    insertSliderMarkup(results);
  } catch (error) {
    console.log(error);
  }
  try {
    const { page, results, total_pages } = await apiMovie.fetchAllMovie(paginator.currentPage=1);//1шу стор затягаємо всіх фільми
    storage.saveCurrentPage(results);
    storage.savePage(page);
    storage.saveTotalPages(total_pages);
    paginator.totalPages = total_pages;
    if (!storage.loadFromWatched()) storage.saveToWatched([]);
    if (!storage.loadFromQueue()) storage.saveToQueue([]);

    /*if (!localStorage.getItem('wathedArr')) {
      localStorage.setItem('wathedArr', JSON.stringify([]));
    }
    if (!localStorage.getItem('queueArr')) {
      localStorage.setItem('queueArr', JSON.stringify([]));
    }*/
     
    insertCardMarkup(results, moviesContainer);
    paginator.makeMarkup();
  } catch (error) {
    console.log(error);
  }
}
export { LANG, langAtr };