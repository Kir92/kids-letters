import { addSticker } from '../state.js';

export function mountSessionEnd(onGoToZoo) {
  const app = document.querySelector('#app')
  
  // Получаем объект награды
  const result = addSticker();
  
  // Достаем из него саму наклейку и флаг "особенная ли она"
  const sticker = result.sticker;
  const isSpecial = result.isSpecial;

  // Меняем текст в зависимости от того, обычная это награда или особенная
  const titleText = isSpecial ? 'Супер-приз!' : 'Молодец!';
  const subText = isSpecial ? 'Ты собрал весь зоопарк! Покажи маме или папе! Попроси Вкусняшку' : 'Ты заработал наклейку!';
  const voiceText = isSpecial ? 'Супер! Ты собрал весь зоопарк! Попроси Вкусняшку у родителей! ' : 'Молодец! Ты заработал наклейку!';

  app.innerHTML = `
    <div class="screen end-screen">
      <div class="confetti">🎉</div>
      <h1>${titleText}</h1>
      <p class="reward-text">${subText}</p>
      <div class="sticker-anim">${sticker}</div>
      <button id="zoo-btn" class="big-btn">В зоопарк</button>
    </div>
  `

  // Озвучка победы
  setTimeout(() => {
    // Если это обычная награда, пытаемся включить praise.mp3
    if (!isSpecial) {
      const audio = new Audio('./audio/praise.mp3');
      audio.play().catch(e => {
        // Если файла нет, включаем робота
        console.log('Файл praise.mp3 не найден, включаем робота');
        const utterance = new SpeechSynthesisUtterance(voiceText);
        utterance.lang = 'ru-RU';
        window.speechSynthesis.speak(utterance);
      });
    } else {
      // Если это супер-приз (кубок), пусть говорит робот
      const utterance = new SpeechSynthesisUtterance(voiceText);
      utterance.lang = 'ru-RU';
      window.speechSynthesis.speak(utterance);
    }
  }, 300);

  document.getElementById('zoo-btn').addEventListener('click', onGoToZoo)

  return {
    unmount: () => { 
      app.innerHTML = '' 
      window.speechSynthesis.cancel()
    }
  }
}