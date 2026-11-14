export function mountParent(onBack) {
  const app = document.querySelector('#app')
  
  app.innerHTML = `
    <div class="screen parent-screen">
      <h1>Для родителей</h1>
      
      <div class="parent-menu">
        <button id="reset-btn" class="parent-btn danger">Сбросить прогресс</button>
        <a href="https://t.me/kir92l" target="_blank" class="parent-btn link">
          Связаться с разработчиком (Telegram)
        </a>
        
        <!-- Блок с донатом -->
        <div class="donate-block">
          <p>Разработчики: Инфраструктура - Лучкин Кирилл. Озвучка - Куликова Василиса. Если приложение Вам нравится, вы можете поддержать разработчиков:</p>
          <img src="./images/donate-qr.png" alt="QR-код для доната" class="donate-qr" />
          <p class="donate-hint">Отсканируйте в приложении банка</p>
        </div>

        <button id="back-btn" class="parent-btn">Назад в игру</button>
      </div>
    </div>
  `

  // Логика сброса прогресса
  document.getElementById('reset-btn').addEventListener('click', () => {
    if (confirm('Вы уверены, что хотите сбросить весь прогресс ребенка? Это действие нельзя отменить.')) {
      localStorage.clear(); // Очищаем всю память
      alert('Прогресс успешно сброшен!');
      onBack(); // Возвращаемся на главный экран
    }
  })

  document.getElementById('back-btn').addEventListener('click', onBack)

  return {
    unmount: () => { app.innerHTML = '' }
  }
}