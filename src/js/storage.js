
const LANG_KEY = 'currentLang'; //текуча мова сторінки
const GENRES_KEY = 'genres'; // масив жанрів
const PAGE_KEY = 'page'; //номер поточної сторінки
const TOTAL_KEY = 'total_pages'; //кількість сторінок на  запит
const CURRENT_KEY = 'currentPage'; // масив зафетчиних фільмів
const WATCHED_KEY = 'wathedArray'; // масив переглянутих фільмів
const QUEUE_KEY = 'queueArray'; // масив фільмів для бажаного перегляду

//базові дії обернуті в try/catch
const save = (key, value) => {
    try {
        const jsonData = JSON.stringify(value);
        return localStorage.setItem(key, jsonData);
    }
    catch {
        Notiflix.Notify.failure(error.message);
        
    }
}
const load = key => {
    try {
        const jsonData = localStorage.getItem(key);
        return  jsonData === null ? undefined : JSON.parse(jsonData);
         
    }
    catch {
        Notiflix.Notify.failure(error.message);
    }
}
const remove = key => {
    try {
        return localStorage.removeItem(key);
    }
    catch {
     Notiflix.Notify.failure(error.message);   
    }
}
//використання базових функцій в записуванні/витяганні/перевірці localStorage
const saveLang = (curLang)=> {
    save(LANG_KEY, curLang);
}
const loadLang = () => {
    return load(LANG_KEY);
}
const saveGenres = (arrGenres) => {
     save(GENRES_KEY,arrGenres)
}
const loadGenres = () => {
    return load(GENRES_KEY);
 }
const initialLocal = () => {
    if (!load(CURRENT_KEY)) save(CURRENT_KEY, []);
    if (!load(WATCHED_KEY)) save(WATCHED_KEY, []);
    if (!load(QUEUE_KEY)) save(QUEUE_KEY, []);
    }
const savePage = page => { //номер сторінки
     save(PAGE_KEY,page);
}
const loadPage = () => {  //номер сторінки
    return load(PAGE_KEY);
}
const saveTotalPages = (number) => { //записуємо всього сторінок
    save(TOTAL_KEY, number);
}
const loadTotalPages = () => {  //витягаємо всього сторінок
    return load(TOTAL_KEY);
}  
const saveCurrentPage = (movies) => { //запис масиву фільмів текучої сторінки
    save(CURRENT_KEY, movies);
}
const loadCurrentPage = () => { //витягаємо масив фільмфв текучої сторінки
    return load(CURRENT_KEY);
}
function saveToWatched(movies) {
    save(WATCHED_KEY, movies);
}
function loadFromWatched() {
    return load(WATCHED_KEY);
}
const saveToQueue = (movies) => {
    save(QUEUE_KEY, movies);
}
function loadFromQueue() {
  return  load(QUEUE_KEY);
   
}


    
export default {
    save,
    load,
    remove,
    saveLang,
    loadLang,
    saveGenres,
    loadGenres,
    initialLocal,
    savePage,
    loadPage,
    saveTotalPages,
    loadTotalPages,
    saveCurrentPage,
    loadCurrentPage,
    saveToWatched,
    loadFromWatched,
    saveToQueue,
    loadFromQueue,
    }