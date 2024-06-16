import storage from './storage';
import { allGenres ,LANG} from './onFirstRender';
export const getGenresNames = ids => {

  //const allGenres = storage.loadGenres();
 // console.log('allGenres ',allGenres); //key=28 value='боевик' =>28:'боевик'
    
  let genresNames = Object.entries(allGenres)
    .filter(([key]) => ids.includes(parseInt(key))) //відфільтрований по ids фільму
    .map(([_, value]) => value.name);
  //console.log(genresNames,'/',genresNames.length);
  //console.log(LANG);
    if (genresNames.length < 1 && LANG ==="en-EN") return genresNames = 'Not specified genres';
    if (genresNames.length < 1 && LANG ==='ua-UA') return genresNames = 'Жанр не вказано';
  if (genresNames.length > 3 && LANG === "en-EN") {
    return (genresNames = [genresNames[0], genresNames[1], 'Other']);
  }
  if (genresNames.length > 3 && LANG === "ua-UA") {
    return (genresNames = [genresNames[0], genresNames[1], 'Інші']);
  }
  
  return genresNames;
};

//це масив обєктів [{id: 28, name: 'боевик'},{},{}....] неітерабельний
// після Object.entries(allGenres) 
//  це ітерабельний масив масивів[['0', { id: 28, name: 'боевик' }], ['1', { id: 12, name: 'приключения' }],...]
//;
 //   console.log(' genresNames after filter ',genresNames);