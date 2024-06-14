import { apiMovie } from './api';
import { movieData } from './modalMovie';

 const overlay = document.querySelector('overlay');
 const sliderBar = document.querySelector('.top-slider__wrapper');
 const modalTrailer = document.querySelector('.overlay--trailer');
 const modalTrailerBtn = document.querySelector('.trailer-btn');
//console.log('sliderBar ', sliderBar);
//console.log('modalTrailer ', modalTrailer);

if (sliderBar && modalTrailer) {
  sliderBar.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      return;
    }
    e.target.parentNode.classList.add('swiper-slide-active');
    if (e.target.parentNode.classList.contains('swiper-slide-active')) {
      fetchTrailer(e.target.dataset.id);
    }
  });
} // додала
//добавила
//else {
/*if (modalTrailerBtn) {
  modalTrailerBtn.addEventListener('click', e => {
    if (e.target === modalTrailerBtn) {
      modalTrailer.classList.add('active');
      fetchTrailer(movieData.id);
    }
  });
}*/
//}
//===============
async function fetchTrailer(id) { //
    try {
      const video = await apiMovie.fetchTrailerById(id); 
    
      modalTrailer.innerHTML = `
    <iframe
      class="iframe"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/${video.results[0].key}?rel=0&showinfo=0&autoplay=1"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>`;
      modalTrailer.classList.add('active');
     
    } catch (error) {
      console.log(error);
    }
}
window.addEventListener('keydown', e => {
  //console.log('modalTrailer', modalTrailer);
    if (modalTrailer.classList.contains('active')) {
      function handleKeyDown(e) {
        if (e.code === 'Escape') {
          modalTrailer.classList.remove('active');
          modalTrailer.innerHTML = '';
        }
      }
      handleKeyDown(e);
    }
  });

  modalTrailer.addEventListener('click', e => {
    function handleClickTrailer(e) {
      if (e.currentTarget === e.target || e.target === overlay) {
        modalTrailer.classList.remove('active');
        modalTrailer.innerHTML = '';
      }
    }
    handleClickTrailer(e);
  });
   

  
//} //забрала
//додала
export default {fetchTrailer} ;