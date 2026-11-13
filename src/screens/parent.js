export function mountParent(onBack) {
  const app = document.querySelector('#app')
  
  app.innerHTML = `
    <div class="screen parent-screen">
      <h1>Для родителей</h1>
      
      <div class="parent-menu">
        <button id="reset-btn" class="parent-btn danger">Сбросить прогресс</button>
        <a href="https://t.me/@kir92l" target="_blank" class="parent-btn link">
          Связаться с разработчиком (Telegram)
        </a>
        <button id="back-btn" class="parent-btn">Назад в игру</button>
      </div>
    </div>
  `

  // Логика сброса прогресса
  document.getElementById('reset-btn').addEventListener('click', () => {
    if (confirm('Вы уверены, что хотите сбросить весь прогресс ребенка? Это действие нельзя отменить.')) {
      localStorage.removeItem('kids_letters_progress');
      alert('Прогресс успешно сброшен!');
      onBack(); // Возвращаемся на главный экран
    }
  })

  document.getElementById('back-btn').addEventListener('click', onBack)

  return {
    unmount: () => { app.innerHTML = '' }
  }
}