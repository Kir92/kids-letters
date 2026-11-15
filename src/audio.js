// Создаем аудиообъект один раз
export const bgMusic = new Audio('./audio/bg-music.mp3');
bgMusic.loop = true; // Играть по кругу
bgMusic.volume = 0.3; // Громкость (30%)

// Функция для запуска музыки
export function startMusic() {
  // Проверяем, не выключил ли родитель музыку в настройках
  if (localStorage.getItem('musicOn') === 'false') return;
  
  if (bgMusic.paused) {
    bgMusic.play().catch(e => console.log('Музыка ждет клика:', e));
  }
}

// Функция для принудительного включения/выключения
export function toggleMusic(isOn) {
  if (isOn) {
    bgMusic.play().catch(e => console.log(e));
  } else {
    bgMusic.pause();
  }
}