import { letters } from '../data/letters.js'
import { markLetterLearned, getLearnedLetters } from '../state.js'

export function mountLesson(onFinish) {
  const app = document.querySelector('#app')
  
  // 1. Получаем выученные буквы
  const learned = getLearnedLetters();
  
  // 2. Ищем первую невыученную букву (по порядку из массива)
  let currentLetter = letters.find(l => !learned.includes(l.char));
  
  // 3. Если все буквы выучены, начинаем заново (или берем случайную)
  if (!currentLetter) {
    currentLetter = letters[Math.floor(Math.random() * letters.length)];
  }

  // 4. Определяем сложность (если буква уже выучена — 3 варианта, если новая — 2)
  const isReview = learned.includes(currentLetter.char);
  const optionsCount = isReview ? 3 : 2;

  // Подбираем неправильные буквы
  const wrongLetters = letters.filter(l => l.char !== currentLetter.char)
    .sort(() => Math.random() - 0.5) // перемешиваем
    .slice(0, optionsCount - 1) // берем нужное количество
    .map(l => l.char);

  // Формируем итоговый список вариантов для экрана
  const options = [currentLetter.char, ...wrongLetters].sort(() => Math.random() - 0.5);

  const speak = (text) => {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'ru-RU'
    utterance.rate = 0.9
    window.speechSynthesis.speak(utterance)
  }

  const renderLearning = () => {
    app.innerHTML = `
      <div class="screen lesson-screen">
        <div class="owl">🦉</div>
        <div class="letter-display">${currentLetter.char}</div>
        <div class="word-card">
          <span class="emoji">${currentLetter.emoji}</span>
          <span class="word">${currentLetter.word}</span>
        </div>
        <button id="next-btn" class="big-btn">Далее</button>
      </div>
    `
    
    setTimeout(() => speak(`${currentLetter.char}... ${currentLetter.word}`), 300)
    document.getElementById('next-btn').addEventListener('click', renderGame)
  }

  const renderGame = () => {
    // Генерируем HTML для кнопок
    const buttonsHTML = options.map(opt => 
      `<button class="letter-btn" data-letter="${opt}">${opt}</button>`
    ).join('');

    app.innerHTML = `
      <div class="screen lesson-screen">
        <div class="owl">🦉</div>
        <h2 class="prompt" id="prompt">Найди букву ${currentLetter.char}</h2>
        <div class="game-options">
          ${buttonsHTML}
        </div>
      </div>
    `

    setTimeout(() => speak(`Найди букву ${currentLetter.char}`), 300)

    const buttons = document.querySelectorAll('.letter-btn')
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (e.target.dataset.letter === currentLetter.char) {
          // ПРАВИЛЬНЫЙ ОТВЕТ
          markLetterLearned(currentLetter.char); // Запоминаем букву
          speak('Молодец!')
          setTimeout(onFinish, 1000)
        } else {
          // ОШИБКА
          e.target.classList.add('shake')
          setTimeout(() => e.target.classList.remove('shake'), 500)
          speak('Попробуй еще раз')
        }
      })
    })
  }

  renderLearning()

  return {
    unmount: () => { 
      app.innerHTML = '' 
      window.speechSynthesis.cancel() 
    }
  }
}