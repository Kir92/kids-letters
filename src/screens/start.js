export function mountStart(onPlay, onOpenParent) {
  const app = document.querySelector('#app')
  
  app.innerHTML = `
    <div class="screen start-screen">
      <div class="owl">🦉</div>
      <h1>Учим буквы</h1>
      <button id="play-btn" class="big-btn">Играть</button>
      
      <!-- Скрытая кнопка для родителей -->
      <div id="parent-gate" class="parent-gate">Настройки для родителей (зажмите на 3 сек)</div>
    </div>
  `

  document.getElementById('play-btn').addEventListener('click', onPlay)

  // Логика "зажать на 3 секунды" для входа в настройки
  const gate = document.getElementById('parent-gate');
  let pressTimer;

  const startPress = (e) => {
    // Отменяем стандартное поведение браузера (чтобы не выделялся текст и не было скролла)
    if (e.type === 'touchstart') e.preventDefault();
    
    pressTimer = setTimeout(() => {
      onOpenParent();
    }, 3000); // 3000 миллисекунд = 3 секунды
  };

  const cancelPress = () => {
    clearTimeout(pressTimer);
  };

  // События для мыши (компьютер)
  gate.addEventListener('mousedown', startPress);
  gate.addEventListener('mouseup', cancelPress);
  gate.addEventListener('mouseleave', cancelPress);

  // События для тача (телефон)
  gate.addEventListener('touchstart', startPress, { passive: false });
  gate.addEventListener('touchend', cancelPress);
  gate.addEventListener('touchcancel', cancelPress); // Если палец "сорвался"

  return {
    unmount: () => { app.innerHTML = '' }
  }
}