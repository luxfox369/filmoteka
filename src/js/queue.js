import { refs }  from './refs';
import storage from './storage';
import { getGenresNames } from './getGenresNames';
import Notiflix from 'notiflix';
import insertCardMarkup from './cardMarkup'


//console.log('moviesQueue', moviesQueue);
if (refs.libQueueBtn) {
  refs.libQueueBtn.addEventListener('click', showQueue);
}
export function showQueue() {
  refs.libQueueBtn.classList.add('active');
  refs.libWatchedBtn.classList.remove('active');
 const moviesQueue = storage.loadFromQueue() || [];
  
  if (!moviesQueue || !moviesQueue.length) {
    Notiflix.Notify.info('Oops queue is empty!');
    refs.libraryContainer.innerHTML = '';
    return;
  } else
    return insertCardMarkup(moviesQueue, refs.libraryContainer)
    
    //if (moviesQueue.length < 1) {
    //  refs.libraryContainer.innerHTML = '';
    //}
    
     //renderLibraryCards(moviesQueue, refs.libraryContainer);
  
}

/*function renderLibraryCards(moviesQueue, ref) {F
    const cardMarkup = moviesQueue
    .map(
      ({ id, title, release_date, poster_path, genre_ids, first_air_date }) => {
        const getGenreNames = getGenresNames(genre_ids);
        const movieData = {
          release_date,
          first_air_date,
        };
        let releaseDate = '';
        if (movieData.release_date) {
          releaseDate = movieData.release_date.slice(0, 4);
        } else if (movieData.first_air_date) {
          releaseDate = movieData.first_air_date.slice(0, 4);
        }
        return `
        <li id=${id} class=film_card>
        <div class=img__wrapper><img class=film_poster src=https://image.tmdb.org/t/p/original${poster_path} width= 50 height= 50 alt= ${title}/></div>
        <div class="film_info">
        <p class=film_name>${title}</p>
        <div class="overlay--trailer" ><button class= "library__nav-btn">Watch trailer</button></div> 
        <p class=film_genre>${getGenreNames} <span class=line>|<span> ${releaseDate}</p>
                </div>

        </li>`;
      }
    )
    .join('');
  //  const LibaCont = document.querySelector('.library__container');
  ref.innerHTML = cardMarkup;
  return;
}*/
