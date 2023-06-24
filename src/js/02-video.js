import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

function saveCurrentTime(player) {
  player.getCurrentTime().then((time) => {
    localStorage.setItem('videoplayer-current-time', time);
  });
}

function setSavedTime(player) {
  const savedTime = localStorage.getItem('videoplayer-current-time');

  if (savedTime) {
    player.setCurrentTime(savedTime);
  }
}

const player = new Player('vimeo-player'); 

const saveCurrentTimeThrottled = throttle(() => saveCurrentTime(player), 1000);

player.on('timeupdate', saveCurrentTimeThrottled);

window.addEventListener('load', () => setSavedTime(player));
