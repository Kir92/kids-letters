export function mountParent(onBack) {
  const app = document.querySelector('#app')
  
  app.innerHTML = `
    <div class="screen parent-screen">
      <h1>Для родителей</h1>
      
      <div class="parent-menu">
        <button id="reset-btn" class="parent-btn danger">Сбросить прогресс</button>
        <button id="share-btn" class="parent-btn">Поделиться приложением 👍 </button>
        <a href="https://t.me/kir92l" target="_blank" class="parent-btn link">
          Связаться с разработчиком (Telegram) 😎
        </a>
        
        <!-- Блок с донатом -->
        <div class="donate-block">
          <p>Разработчики: Инфраструктура - Лучкин Кирилл. Озвучка - Куликова Василиса. Если приложение Вам нравится, вы можете поддержать разработчиков:</p>
          <img src="./images/donate-qr.png" alt="QR-код для доната" class="donate-qr" />
          <p class="donate-hint">Отсканируйте в приложении банка</p>
          <p class="donate-hint">Спасибо за ваш вклад! 🤝 </p>
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

  // Логика кнопки "Поделиться"
  document.getElementById('share-btn').addEventListener('click', async () => {
    const shareData = {
      title: 'Учим буквы',
      text: 'Отличное приложение для изучения букв! Моему ребенку очень нравится.',
      url: 'https://kir92.github.io/kids-letters/' // Ссылка на ваше приложение
    };

    try {
      if (navigator.share) {
        // На телефоне открываем системное меню (Telegram, WhatsApp и т.д.)
        await navigator.share(shareData);
      } else {
        // На компьютере копируем ссылку в буфер обмена
        await navigator.clipboard.writeText(shareData.url);
        alert('Ссылка скопирована! Отправьте её друзьям.');
      }
    } catch (err) {
      console.log('Ошибка при попытке поделиться:', err);
    }
  });

  document.getElementById('back-btn').addEventListener('click', onBack)

  return {
    unmount: () => { app.innerHTML = '' }
  }
}