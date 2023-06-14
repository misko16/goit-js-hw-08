import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// Функція для збереження поточного часу відтворення
function saveCurrentTime(player) {
  player.getCurrentTime().then((time) => {
    localStorage.setItem('videoplayer-current-time', time);
  });
}

// Функція для встановлення часу відтворення зі збереженого значення
function setSavedTime(player) {
  const savedTime = localStorage.getItem('videoplayer-current-time');

  if (savedTime) {
    player.setCurrentTime(savedTime);
  }
}

// Ініціалізація плеєра
const player = new Player('vimeo-player'); // змініть 'vimeo-player' на id вашого <iframe>

// Оновлення часу відтворення у локальному сховищі не частіше, ніж раз на секунду
const saveCurrentTimeThrottled = throttle(() => saveCurrentTime(player), 1000);

// Відстеження події 'timeupdate' для збереження часу відтворення
player.on('timeupdate', saveCurrentTimeThrottled);

// Встановлення збереженого часу відтворення під час завантаження сторінки
window.addEventListener('load', () => setSavedTime(player));
