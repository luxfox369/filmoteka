import { refs } from './refs';

//const btn = document.querySelector('.button-thumb');

const divBtn = document.querySelector('.button-thumb');
const btnUp = refs.btnUp;

export function scrollFunction() {
  divBtn.style.visibility = 'visible';
  btnUp.addEventListener('click', (e) => {
    e.preventDefault();
   // if(refs.slider) window.scrollTo({ top: 0, behavior: 'smooth' });
   // else
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    btnUp.style.visibility = 'visible';
  } else {
    btnUp.style.visibility = 'hidden';
  }
}

window.addEventListener('scroll', scrollFunction);
