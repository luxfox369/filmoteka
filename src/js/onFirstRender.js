import{ scrollFunction} from './btnUp'
import { apiMovie } from './api';
import insertCardMarkup from './cardMarkup';
import insertSliderMarkup from './sliderMarkup';
import { refs }  from './refs';
import storage     from './storage';
import { language }  from './language';
import Paginator from './paginator';
import Loader from './loader';
import { getGenresNames } from './getGenresNames';

import Notiflix from 'notiflix';


const paginator = new Paginator();
const loader = new Loader();
const moviesContainer = refs.homeContainer;
export let allGenres = [];
let LANG, langAtr;
if (!storage.loadLang()) {
  LANG = language.LANG.eng;
  langAtr = language.langAtr.eng;
  getArrGenres();
}
else  langAtr = storage.loadLang();

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

if (refs.switch) {
  refs.switch.addEventListener("click", onChecked);
}
function  onChecked(e) {
  let element = e.currentTarget;
 
  if (element.checked) {
    //тут змінити текст кнопок HOME/MY LIBRARY
    console.log('element.checked', element.checked);
    LANG = "uk-UA";
    langAtr = 'uk';
    storage.saveLang(langAtr );
    Notiflix.Notify.info('Мова сторінки: UA');
   
    getArrGenres();
    onLoad('load');
   
  }
  else {
    console.log('element.checked', element.checked);
    LANG = "en-EN";
    langAtr = 'eng';
    storage.saveLang(langAtr );
    Notiflix.Notify.info('Site language:  EN ');
    
    getArrGenres();
    onLoad('load');
  }
   
}
//************************* */
async function onLoad(e) {
   if (!storage.loadLang()) storage.saveLang(langAtr);
  if (storage.loadLang() === "uk" && refs.switch) refs.switch.checked = true;
  else 
  if (storage.loadGenres().length < 1)  getArrGenres();
   
//перемальовування написів
  refs.homeBtn.textContent = language.homeBtn[langAtr];
  refs.libraryBtn.textContent = language.libraryBtn[langAtr];
  if (refs.input) refs.input.placeholder = language.searchPlaceHolder[langAtr];
  refs.headerTitle.textContent = language.headerTitle[langAtr];
  //refs.headerRights.textContent = language.headerRights[langAtr];
  
    //якщо library затягаємо queue
  if (refs.libraryBtn.classList.contains('current')) {
    //тут змінити текст кнопок add/remove watched/queue
    refs.libWatchedBtn.textContent = language.libWatched[langAtr]; //watched
    refs.libQueueBtn.textContent = language.libQueue[langAtr]; // queue
    
     const queueMovies = storage.loadFromQueue();
     insertCardMarkup(queueMovies, refs.libraryContainer);
     refs.libQueueBtn.classList.add('active');
    return;
  }
  //якщо home
  try {
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

    
     
    insertCardMarkup(results, moviesContainer);
    paginator.makeMarkup();
  } catch (error) {
    console.log(error);
  }
}
export { LANG, langAtr };