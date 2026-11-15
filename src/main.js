import './style.css'
import { mountStart } from './screens/start.js'
import { mountLesson } from './screens/lesson.js'
import { mountSessionEnd } from './screens/session-end.js'
import { mountZoo } from './screens/zoo.js'
import { mountParent } from './screens/parent.js'
import { bgMusic } from './audio.js'; // <-- Импорт музыки теперь в начале

const app = document.querySelector('#app')
let currentScreen = null

// Проверяем настройку при запуске (если родитель выключил — музыка не играет)
if (localStorage.getItem('musicOn') === 'false') {
  bgMusic.pause();
}

function showStart() {
  if (currentScreen) currentScreen.unmount()
  currentScreen = mountStart(
    () => showLesson(),     // Нажали "Играть"
    () => showParent()      // Зажали кнопку для родителей
  )
}

function showLesson() {
  if (currentScreen) currentScreen.unmount()
  currentScreen = mountLesson(() => showSessionEnd())
}

function showSessionEnd() {
  if (currentScreen) currentScreen.unmount()
  currentScreen = mountSessionEnd(() => showZoo())
}

function showZoo() {
  if (currentScreen) currentScreen.unmount()
  currentScreen = mountZoo(() => showStart())
}

function showParent() {
  if (currentScreen) currentScreen.unmount()
  currentScreen = mountParent(() => showStart()) // Возврат из настроек
}

// Запускаем приложение
showStart()

// --- ГЕНЕРАТОР СНЕЖИНОК ---
function createSnow() {
  const container = document.getElementById('snow-container');
  if (!container) return;

  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  snowflake.innerHTML = '❅';
  snowflake.style.left = Math.random() * 100 + 'vw';
  snowflake.style.animationDuration = Math.random() * 4 + 4 + 's'; 
  snowflake.style.fontSize = Math.random() * 20 + 10 + 'px'; 
  
  container.appendChild(snowflake);

  setTimeout(() => {
    snowflake.remove();
  }, 8000);
}

setInterval(createSnow, 300);

// --- УПРАВЛЕНИЕ ГЛОБАЛЬНОЙ КНОПКОЙ МУЗЫКИ ---
import { toggleMusic } from './audio.js';

const globalMusicBtn = document.getElementById('global-music-btn');

// Проверяем, не выключена ли музыка в настройках
let isMusicOn = localStorage.getItem('musicOn') !== 'false';

// Обновляем вид кнопки при загрузке
if (!isMusicOn) {
  globalMusicBtn.classList.add('muted');
  globalMusicBtn.textContent = '🔇';
} else {
  globalMusicBtn.textContent = '🎵';
}

// Обработчик клика
globalMusicBtn.addEventListener('click', () => {
  isMusicOn = !isMusicOn;
  localStorage.setItem('musicOn', isMusicOn); // Запоминаем выбор
  
  if (isMusicOn) {
    globalMusicBtn.classList.remove('muted');
    globalMusicBtn.textContent = '🎵';
    toggleMusic(true);
  } else {
    globalMusicBtn.classList.add('muted');
    globalMusicBtn.textContent = '🔇';
    toggleMusic(false);
  }
});