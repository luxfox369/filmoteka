import storage from './storage';
export const getGenresNames = ids => {

   const allGenres = storage.loadGenres();
  let genresNames = Object.entries(allGenres)
    .filter(([key]) => ids.includes(parseInt(key)))
    .map(([_,value]) =>  value.name);
    if (genresNames.length > 3) {
    return (genresNames = [genresNames[0], genresNames[1], 'Other']);
  }
  return genresNames;
};

//це масив обєктів [{id: 28, name: 'боевик'},{},{}....] неітерабельний
// після Object.entries(allGenres) 
//  це ітерабельний масив масивів[['0', { id: 28, name: 'боевик' }], ['1', { id: 12, name: 'приключения' }],...]
