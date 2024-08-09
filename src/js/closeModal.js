import { refs }  from './refs';
import { showQueue } from './queue';
import { showWatched } from './watched';

const overlay = refs.overLay;
const modal = refs.modal;

window.addEventListener('keydown', e => {
  if (modal.classList.contains('active')) {
    handleKeyDown(e);
  }
});
overlay.addEventListener('click', e => {
  handleClick(e);
});

const handleKeyDown = e => {
  if (e.code === 'Escape') {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    if (refs.libWatchedBtn && refs.libWatchedBtn.classList.contains('active')) {
      showWatched();
    }
      if (refs.libQueueBtn && refs.libQueueBtn.classList.contains('active')) {
        showQueue();
      }
    }
  }
const handleClick = e => {
  if (e.currentTarget == e.target) {
    modal.classList.remove('active');
    overlay.classList.remove('active');
if (refs.libWatchedBtn && refs.libWatchedBtn.classList.contains('active')) {
      showWatched();
    }
      if (refs.libQueueBtn && refs.libQueueBtn.classList.contains('active')) {
        showQueue();
      }
  }
};
