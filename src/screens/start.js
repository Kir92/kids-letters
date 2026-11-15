import { startMusic } from '../audio.js'; // Импортируем из нового файла

export function mountStart(onPlay, onOpenParent) {
  const app = document.querySelector('#app')
  
  const hasSeenIntro = localStorage.getItem('hasSeenIntro');
  
  app.innerHTML = `
    <div class="screen start-screen">
      <div class="age-mark">3+</div>
      <img src="./images/bear.png" alt="Умка" class="owl-img" />
      <h1>Учим буквы c Умкой</h1>
      <button id="play-btn" class="big-btn">Играть</button>
      <div id="parent-gate" class="parent-gate">Настройки для родителей (зажмите на 3 сек)</div>
      
      <div class="copyright">
        © 2026 Kir92. Все права защищены.
      </div>
    </div>

    <div id="intro-modal" class="intro-modal ${hasSeenIntro ? 'hidden' : ''}">
      <div class="intro-content">
        <div class="deco-sun">☀️</div>
        <div class="deco-star star1">⭐</div>
        <div class="deco-star star2">✨</div>
        <div class="deco-star star3">🌟</div>

        <img src="./images/bear.png" alt="Умка" class="owl-img" />
        <h2>Привет!</h2>
        <p>Я буду учить тебя буквам.</p>
        <button id="intro-start-btn" class="big-btn">Начать!</button>
      </div>
    </div>
  `

  const introModal = document.getElementById('intro-modal');
  const introStartBtn = document.getElementById('intro-start-btn');

  if (!hasSeenIntro) {
    setTimeout(() => {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance('Привет! меня зовут Умка! Я буду учить тебя буквам. Нажми Начать!');
      utterance.lang = 'ru-RU';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }, 300);

    introStartBtn.addEventListener('click', () => {
      introModal.classList.add('hidden');
      localStorage.setItem('hasSeenIntro', 'true');
      
      // Включаем музыку при первом клике
      startMusic();

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance('Нажми Играть!');
      utterance.lang = 'ru-RU';
      window.speechSynthesis.speak(utterance);
    });
  }

  // Включаем музыку при нажатии на "Играть" (если она еще не играет)
  document.getElementById('play-btn').addEventListener('click', () => {
    startMusic();
    onPlay();
  })

  // Логика зажатия для родителей (без изменений)
  const gate = document.getElementById('parent-gate');
  let pressTimer;
  const startPress = (e) => {
    if (e.type === 'touchstart') e.preventDefault();
    pressTimer = setTimeout(() => { onOpenParent(); }, 3000);
  };
  const cancelPress = () => { clearTimeout(pressTimer); };
  gate.addEventListener('mousedown', startPress);
  gate.addEventListener('mouseup', cancelPress);
  gate.addEventListener('mouseleave', cancelPress);
  gate.addEventListener('touchstart', startPress, { passive: false });
  gate.addEventListener('touchend', cancelPress);
  gate.addEventListener('touchcancel', cancelPress);

  return {
    unmount: () => { 
      app.innerHTML = ''; 
      window.speechSynthesis.cancel(); 
    }
  }
}