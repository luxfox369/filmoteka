
import axios from 'axios';
import { refs } from './refs';
import { LANG } from './onFirstRender';
import { Notiflix } from 'notiflix';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

class ApiMovie {
    #API_KEY = '4e109f7b4b6a0194008b1b4e8c435cc1';
  query = '';
  genres = [];
    //отримати список жанрів з кодами
    //get  list of genres https://api.themoviedb.org/3/genre/movie/list?language=en'
    async fetchGenres() {
        const params = new URLSearchParams({
            api_key: this.#API_KEY,
            language: LANG,
        });
        try {
            const {data } = await axios('/genre/movie/list', { params })
            this.genres = data.genres;
            //console.log('масив this.genres :', this.genres)
            return data;
        }
        catch {
           Notiflix.Notify.failure('Oops, something went wrong: ');
        }
        
    }
    // отримати трендові фільми за тиждень
    ///get movie by trending a week
    //https://api.themoviedb.org/3/trending/movie/{time_window}
    //time_window = string required Default: day Once more:  week
    async fetchMovieWeek() {
    const params = new URLSearchParams({
      api_key: this.#API_KEY,
      language : LANG,
     // page: page,

    });
   try {
       const { data } = await axios('/trending/movie/week', { params });
     //  console.log("data week", data);
      return data;
    } catch (error) {
      Notiflix.Notify.failure('Oops, something wrong with week: ');
    }
  }
    // отримати dcs фільми 
       //https://api.themoviedb.org/3/trending/movie/{time_window}
    //time_window = string required Default: day Once more:  week
    async fetchAllMovie(page) {
    const params = new URLSearchParams({
      api_key: this.#API_KEY,
      language : LANG,
      page: page,
    });

    try {
        const { data } = await axios('/trending/movie/day', { params });
       // console.log("data day", data);
      return data;
    } catch (error) {
      Notiflix.Notify.failure('Oops, something wrong on day : ');
    }
  }
    //get movie by search https://api.themoviedb.org/3/search/movie
    // params:query string required, language string, page string
    async searchMovieByQuery(search,page) {
        const params = new URLSearchParams({
            api_key:this.#API_KEY,
            query: search,
            language: LANG,
            page:page
        })
        try {
    const { data } = await axios('/search/movie', { params });
           // console.log('...data', ...data);
            return data;
        }
        catch {
           Notiflix.Notify.failure('Oops, something went wrong with query: ');
        }
    }
    //get  movie by id ttps://api.themoviedb.org/3/movie/{movie_id}
    async fetchMovieById(id) {
        const params = new URLSearchParams({
            api_key: this.#API_KEY,
            language: LANG,
        });
        try {
            const { data } = await axios(`/movie/${id}`, { params });
            console.log('movie by id ', data);
            return data;
        }
        catch {
            console.log('Oops, something went wrong: ', error.message);
        }
    }
    //пошук трейлера по id `/movie/{id}/videos
    async fetchTrailerById(id) {
        const params = new URLSearchParams({
            api_key: this.#API_KEY,
            language: LANG
        })
        try {
            const response = await axios(`/movie/${id}/videos`, { params })
          //  console.log("response.data.results[0] from api ", response.data.results[0]);
          if (response.data.results[0]) return response.data;
          else
            //console.log('from api else no results[0]');
            alert('Sorry, There is not trailer for this movie ');
        }
        catch {
           Notiflix.Notify.failure('Something went wrong... ');
        }

}
} 

export const apiMovie = new ApiMovie;

