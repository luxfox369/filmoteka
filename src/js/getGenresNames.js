import storage from './storage';
export const getGenresNames = ids => {
   const savedGenres = storage.loadGenres();
    let genresNames = Object.entries(savedGenres)
      .filter(([key]) => ids.includes(parseInt(key)))
      .map(([_, value]) => value.name);
      if(genresNames.length > 3) {
        return genresNames = [genresNames[0], genresNames[1], 'Other']
       }
    return genresNames;
  };
