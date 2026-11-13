export function mountStart(onPlay, onOpenParent) {
  const app = document.querySelector('#app')
  
  app.innerHTML = `
    <div class="screen start-screen">
      <div class="owl">🦉</div>
      <h1>Учим буквы</h1>
      <button id="play-btn" class="big-btn">Играть</button>
      
      <!-- Скрытая кнопка для родителей -->
      <div id="parent-gate" class="parent-gate">Настройки для родителей (зажмите на 2 сек)</div>
    </div>
  `

  document.getElementById('play-btn').addEventListener('click', onPlay)

  // Логика "зажать на 2 секунды" для входа в настройки
  const gate = document.getElementById('parent-gate');
  let pressTimer;

  const startPress = () => {
    pressTimer = setTimeout(() => {
      onOpenParent();
    }, 2000); // 2000 миллисекунд = 2 секунды
  };

  const cancelPress = () => {
    clearTimeout(pressTimer);
  };

  // События для мыши (компьютер) и тача (телефон)
  gate.addEventListener('mousedown', startPress);
  gate.addEventListener('touchstart', startPress);
  gate.addEventListener('mouseup', cancelPress);
  gate.addEventListener('mouseleave', cancelPress);
  gate.addEventListener('touchend', cancelPress);

  return {
    unmount: () => { app.innerHTML = '' }
  }
}