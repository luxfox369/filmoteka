export let refs = {
  btnThumb: document.querySelector('.button-thumb'),
  cardContainer: document.querySelector('.home__container'),
  overLay: document.querySelector('.overlay'),
  modal: document.querySelector('.modal'),
  loaderOverlay: document.querySelector('.loader__overlay'),
  loader: document.querySelector('.loader'),
  dataModalOpen: document.querySelector('[data-modal-open]'),
  dataModalClose: document.querySelector('[data-modal-close]'),
  dataModal: document.querySelector('[data-modal]'),
  pagination: document.querySelector('.pagination'),
  libraryBtn: document.querySelector('.header__nav-btn--lib'),
  libraryContainer: document.querySelector('.library__container'),
  libWatchedBtn: document.querySelector('.library__nav-btn--watched'),
  libQueueBtn: document.querySelector('.library__nav-btn--queue'),
  modalToWatchedBtn: document.querySelector('.watched'), //клас кнопки в модалці WATCHED
  modalToQueueBtn: document.querySelector('.queue'), // клас кнопки модалці  QUEUE
  modalToTrailerBtn:document.querySelector('.trailer'),
  
 // libBtn: document.querySelector('.header__nav-btn--lib'),
  switch: document.querySelector('.switch'),//повзунок мови
  label: document.querySelector('.switch-for'),
  language: document.querySelector('.switch-for:before'),//.switch-for:before 
  modalTrailer: document.querySelector('.overlay--trailer'),
  sliderBar : document.querySelector('.top-slider__wrapper'),
  
};

