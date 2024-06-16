import { apiMovie } from './api';
import { refs } from './refs';
import storage from './storage';
import { getGenresNames } from './getGenresNames';
import imagePlaceholder from '../images/image-placeholder.png';
import { LANG } from './onFirstRender';
import Notiflix from 'notiflix';

//import fetchTrailer   from './trailers';


 const containerHome = document.querySelector('.home__container'); // 
 const containerLibrary  = document.querySelector('.library__container');//  
 const modalTrailer = document.querySelector('.overlay--trailer');
 let modalTrailerBtn ='';

if (containerHome) {
  containerHome.addEventListener('click', openModalMovie);
}
if (containerLibrary ) {
  containerLibrary .addEventListener('click', openModalMovie);
}
const addWatched = 'ADD TO WATCHED';
const removeWatched = 'REMOVE FROM WATCHED';
const addQueue = 'ADD TO QUEUE';
const removeQueue = 'REMOVE FROM QUEUE';

let saveDataMovie ;
let textButtonTrailer = 'WATCH TRAILER';
let moviesWatched, moviesQueue;

function openModalMovie(e) {
  e.preventDefault();
  let movies = [];

  openModalView();
  //якщо home берем фільми з ключа  current
   movies = storage.loadCurrentPage();
  //якщо library+watched берем з ключа watched
  if (refs.libWatchedBtn && refs.libWatchedBtn.classList.contains('active')) {
    movies = storage.loadFromWatched();
  }
  //якщо library+queue берем з ключа queue
  if (refs.libQueueBtn && refs.libQueueBtn.classList.contains('active')) {
    movies = storage.loadFromQueue();
  }
  
  const movieData = movies.find(movie => movie.id === Number(e.target.closest('.film_card').id)
  );
  console.log('movieData from film_card', movieData);
  
  let textButtonWatched = '';
  let textButtonQueue = '';
  //====WATCHED=====
  //Виясняємо що має бути на кнопці WATCHED
  let moviesInWatched = storage.loadFromWatched();
  isWatched(movieData, moviesInWatched); //дивимось чи він є в масиві з локалСторедж

  function isWatched(movieData, moviesInWatched) {
    if (moviesInWatched.findIndex(movie => movie.id === movieData.id) < 0) {
      return textButtonWatched = addWatched;
    } else {
      return (textButtonWatched = removeWatched);
    }
  }
  // ==== QUEUE ====
  //Виясняємо що має бути на кнопці QUEUE 
  let moviesInQuery = storage.loadFromQueue();
  isQueue(movieData, moviesInQuery);
  
  function isQueue(movieData, moviesInQuery) {
    if (moviesInQuery.findIndex(movie => movie.id === movieData.id) < 0) {
      return textButtonQueue = addQueue;
    } else {
      return (textButtonQueue = removeQueue);
    }
  }
  // ====рендеримо дані про фільм

  renderMovieDataToModal(movieData, textButtonWatched, textButtonQueue, textButtonTrailer);
  //знаходимо кнопки в модалці
  const buttonWatched = document.querySelector('.watched');
  const buttonQueue = document.querySelector('.queue');
  modalTrailerBtn = document.querySelector('.trailer-btn');
    
  //призначаємо дії кнопок в модалці
  buttonWatched.addEventListener('click', fWatched); //libWatchedBtn
  buttonQueue.addEventListener('click', fQueue);     //libQueueBtn
  modalTrailerBtn.addEventListener('click',  fetchTrailer );
  
  //saveDataMovie = movieData;
 
  //зміна localStorage при натисненні ADD/REMOVE WATCHED
  function fWatched(e) {
    moviesWatched = storage.loadFromWatched();
    
    if (e.target.textContent === 'ADD TO WATCHED') {
      moviesWatched.push(movieData);       // додає в масив
      e.target.textContent = 'REMOVE FROM WATCHED';
             
    } else {
      moviesWatched = moviesWatched.filter(
        ({ id }) => id !== movieData.id
      );                                     // видаляє  з масиву
      e.target.textContent = 'ADD TO WATCHED';
    }
    storage.saveToWatched(moviesWatched); //записує зміни в локалСторедж
    /* if (
       refs.libraryBtn.classList.contains('current') &&
        buttonWatched.classList.contains('active')
     ) {
       moviesWatched = storage.loadFromWatched();*/
    if (moviesWatched.length < 1) {
      refs.libraryContainer.innerHTML = '';
    }
    //renderLibraryCards(moviesWatched, refs.libraryContainer);
    //insertCardMarkup(moviesWatched, refs.libraryContainer);
    return;
  } //кінець
    
  
  //зміна localStorage при натисненні ADD/REMOVE QUEUE
  function fQueue(e) {
    moviesQueue = storage.loadFromQueue();
    
    if (e.target.textContent === 'ADD TO QUEUE') {
      moviesQueue.push(movieData);
      e.target.textContent = 'REMOVE FROM QUEUE';
    }
    else {
      moviesQueue = moviesQueue.filter(({ id }) => id !== movieData.id);
      e.target.textContent = 'ADD TO QUEUE';
    }
    storage.saveToQueue(moviesQueue);
    /* if (
       refs.libraryBtn.classList.contains('current') ||
       refs.buttonQueue.classList.contains('active')
     ) {
        moviesQueue = storage.loadFromQueue();*/
    if (moviesQueue.length < 1) {
      refs.libraryContainer.innerHTML = '';
    }
    //insertCardMarkup = (moviesQueue, refs.libraryContainer)
    //renderLibraryCards(moviesQueue, refs.libraryContainer);
    return;
    //}
    
  } //кінець fQueue

  function renderMovieDataToModal(
    {
      poster_path,
      title,
      vote_average,
      vote_count,
      popularity,
      original_title,
      genre_ids,
      overview,
      release_date,

    },
    textButtonWatched,
    textButtonQueue,
    textButtonTrailer
  ) {
    console.log('genre_ids', genre_ids);

    let genresData = getGenresNames(genre_ids);
   // console.log(LANG);
    if (genresData.length <1 && LANG==='"en-EN"') genresData = 'Not specified genres';
    if (genresData.length <1 && LANG ==='uk-UA') genresData = 'Невизначений жанр';


    console.log('genresData', genresData);
    refs.modal.innerHTML = `
    <div class="modal__poster-box">
      <img class="modal__poster" src="${poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : imagePlaceholder
      }" alt="${title}"  />

    </div>
    <div class="modal__film-descr">
      <h2 class="modal__film-name">${title}</h2>
      <ul class="modal__film-info-list">
        <li class="modal__film-info-item">
          <p class="modal__film-info">Vote / Votes</p>
          <p class="modal__film-info-value">
            <span class="modal__film-info-value--color">${vote_average}</span> / ${vote_count}
          </p>
        </li>
        <li class="modal__film-info-item">
          <p class="modal__film-info">Popularity</p>
          <p class="modal__film-info-value">${popularity}</p>
        </li>
        <li class="modal__film-info-item">
          <p class="modal__film-info">Original Title</p>
          <p class="modal__film-info-value">${original_title}</p>
        </li>
        <li class="modal__film-info-item">
          <p class="modal__film-info">Release_date</p>
          <p class="modal__film-info-value">${release_date}</p>
        </li> 
        <li class="modal__film-info-item">
          <p class="modal__film-info">Genre</p>
          <p class="modal__film-info-value">${genresData}</p>
        </li> 
       </ul>
      <h3 class="modal__film-about">About...</h3>
      <p class="modal__film-plot">${overview}
      </p>
      <ul class="modal__film-btn-List">
      <li class="modal__film-btn-item">
          <button type="button" class="modal__film-btn trailer-btn">${textButtonTrailer}</button>
        </li>
        <li class="modal__film-btn-item">
          <button type="button" class="modal__film-btn watched">${textButtonWatched}</button>
        </li>
        <li class="modal__film-btn-item">
          <button type="button" class="modal__film-btn queue">${textButtonQueue}</button>
        </li>
      </ul>
      <div>
        <button class="button-close btn js-modal-close">
          <svg class="icon-cross" width="20" height="20">
            <use href="../images/symbol-defs.svg#icon-modal-cross"></use>
          </svg>
        </button>
      </div>
    </div>

  `;
  }

  function openModalView() {
    refs.modal.classList.add('active');
    refs.overLay.classList.add('active');
  
  }

  async function fetchTrailer(e) { //
   try {
     const video = await apiMovie.fetchTrailerById(movieData.id);

     console.log('trailer', `https://www.youtube.com/embed/${video.results[0].key}?rel=0&showinfo=0&autoplay=1`);
     modalTrailer.innerHTML = `
   <iframe
     class="iframe"
     width="560"
     height="315"
     src="https://www.youtube.com/embed/${video.results[0].key}?rel=0&showinfo=0&autoplay=1"
     title="YouTube video player"
     frameborder="0"
     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
     allowfullscreen
   ></iframe>`;
       
   }
    
   catch {e=>
     Notiflix.Notify.failure(e);
   }
   finally {
     if (e.target === modalTrailerBtn)
       modalTrailer.classList.add('active');
     else {
       modalTrailer.classList.remove('active');
       modalTrailer.innerHTML = '';
     }
   }
 
  
 }
 window.addEventListener('keydown', e => {
   if (modalTrailer.classList.contains('active')) {
     function handleKeyDown(e) {
       if (e.code === 'Escape') {
         modalTrailer.classList.remove('active');
         modalTrailer.innerHTML = '';
       }
     }
     handleKeyDown(e);
   }
 });

 modalTrailer.addEventListener('click', e => {
   function handleClickTrailer(e) {
     if (e.currentTarget === e.target) {
       modalTrailer.classList.remove('active');
       modalTrailer.innerHTML = '';
     }
   }
   handleClickTrailer(e);
 });
}
  

export {  movieData, moviesQueue, moviesWatched };
