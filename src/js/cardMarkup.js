import { getGenresNames } from './getGenresNames';
import { LANG, langAtr} from './onFirstRender';

const movieContainer = document.querySelector('.home__container');
const insertCardMarkup = (movies, container) => {
  const cardMarkup = movies
    .map(
      ({ id, title, release_date, poster_path, genre_ids, first_air_date }) => {
        let genreNames = getGenresNames(genre_ids);
        //console.log('');
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
    <li id=${id} class='film_card'>
    <div class='img__wrapper'><img class='film_poster' src=https://image.tmdb.org/t/p/original${poster_path} width= 50 height= 50 alt= ${title}/></div>
    <div class="film_info">
    <p class='film_name'>${title}</p>
    <div class="overlay--trailer" ><button class= "library__nav-btn">Watch trailer</button></div> 
    <p class='film_genre'>${genreNames} <span class='line'>|<span> ${releaseDate}</p>
    </div>
     </li>`;
      }
    )
    .join('');

  container.innerHTML = cardMarkup;
};

export default insertCardMarkup;
