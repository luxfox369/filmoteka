import storage from './storage';
import { allGenres } from './onFirstRender';
export const getGenresNames = ids => {

  //const allGenres = storage.loadGenres();
 // console.log('allGenres ',allGenres); //key=28 value='боевик' =>28:'боевик'
    
  let genresNames = Object.entries(allGenres)
    .filter(([key]) => ids.includes(parseInt(key))) //відфільтрований по ids фільму
    .map(([_,value]) =>  value.name);
    if (genresNames.length > 3) {
    return (genresNames = [genresNames[0], genresNames[1], 'Other']);
  }
  return genresNames;
};

//це масив обєктів [{id: 28, name: 'боевик'},{},{}....] неітерабельний
// після Object.entries(allGenres) 
//  це ітерабельний масив масивів[['0', { id: 28, name: 'боевик' }], ['1', { id: 12, name: 'приключения' }],...]
//;
 //   console.log(' genresNames after filter ',genresNames);