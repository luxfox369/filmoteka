import { refs } from './refs';
import { LANG, langAtr } from './onFirstRender';
const language = {
    home: { eng: 'HOME', ua: 'Дім' },
    library: { eng: 'My Library', ua: 'Моя бібліотека' },
    search: { eng: 'Search Movie', ua: 'Пошук фільма' },
    libWatched: { eng: 'WATCHED', ua: 'ПЕРЕГЛЯНУТО' },
    libQueue: { eng: 'QUEUE', ua: '{ПОДИВЛЮСЬ' },
    watchTriller: {eng: 'WATCH TRILLER', ua: 'ДИВИТИСЬ ТРІЛЛЕР' },
    addToWatched: { eng: 'ADD TO WATCHED', ua: 'ДОДАТИ ДО ПОБАЧЕНОГО' },
    removeFromWatched: { eng: 'REMOVE FROM WATCHED', ua: 'ВИКИНУТИ З ПОБАЧЕНОГО' },
    addtToQueue: { eng: 'ADD TO QUEUE', ua: 'ДОДАТИ ДО БАЖАНОГО' },
    removeFromQueue: { eng: 'REMOVE FROM QUEUE', ua: 'ВИКИНУТИ З БАЖАНОГО' },
// Vote / Votes
//Popularity
//Original Title
//Release_date
//Genre
//About...
     
}
console.log('LANG', LANG);
console.log('language', language);
let langAtr;
    if (LANG === 'en-EN') langAtr = 'eng';
        else langAtr = 'ua';

  console.log(language.addToWatched[langAtr]);
  if(refs.modalToWatchedBtn)refs.modalToWatchedBtn.textContent = language.addToWatched[langAtr];

export { language };