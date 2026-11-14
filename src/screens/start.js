export function mountStart(onPlay, onOpenParent) {
  const app = document.querySelector('#app')
  
  // Проверяем, видел ли пользователь приветствие
  const hasSeenIntro = localStorage.getItem('hasSeenIntro');
  
  app.innerHTML = `
    <div class="screen start-screen">
      <div class="owl">🦉</div>
      <h1>Учим буквы</h1>
      <button id="play-btn" class="big-btn">Играть</button>
      <div id="parent-gate" class="parent-gate">Настройки для родителей (зажмите на 3 сек)</div>
      
      <!-- Копирайт -->
      <div class="copyright">
        © 2026 Kir92. Все права защищены.
      </div>
    </div>

    <!-- Модальное окно приветствия (скрываем, если уже видели) -->
    <div id="intro-modal" class="intro-modal ${hasSeenIntro ? 'hidden' : ''}">
      <div class="intro-content">
        <!-- Декоративные элементы -->
        <div class="deco-sun">☀️</div>
        <div class="deco-star star1">⭐</div>
        <div class="deco-star star2">✨</div>
        <div class="deco-star star3">🌟</div>

        <div class="owl intro-owl">🦉</div>
        <h2>Привет!</h2>
        <p>Я буду учить тебя буквам.</p>
        <button id="intro-start-btn" class="big-btn">Начать!</button>
      </div>
    </div>
  `

  // Логика работы модального окна
  const introModal = document.getElementById('intro-modal');
  const introStartBtn = document.getElementById('intro-start-btn');

  // Всю логику приветствия запускаем ТОЛЬКО если пользователь здесь впервые
  if (!hasSeenIntro) {
    // Озвучка приветствия
    setTimeout(() => {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance('Привет! Я буду учить тебя буквам. Нажми Начать!');
      utterance.lang = 'ru-RU';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }, 300);

    // Кнопка "Начать" в модальном окне
    introStartBtn.addEventListener('click', () => {
      introModal.classList.add('hidden'); // Скрываем окно
      localStorage.setItem('hasSeenIntro', 'true'); // ЗАПОМИНАЕМ, ЧТО ВИДЕЛИ
      
      // Озвучиваем следующий шаг
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance('Нажми Играть!');
      utterance.lang = 'ru-RU';
      window.speechSynthesis.speak(utterance);
    });
  }

  document.getElementById('play-btn').addEventListener('click', onPlay)

  // Логика "зажать на 3 секунды" для входа в настройки
  const gate = document.getElementById('parent-gate');
  let pressTimer;

  const startPress = (e) => {
    if (e.type === 'touchstart') e.preventDefault();
    pressTimer = setTimeout(() => {
      onOpenParent();
    }, 3000);
  };

  const cancelPress = () => {
    clearTimeout(pressTimer);
  };

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