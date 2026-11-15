import { letters } from '../data/letters.js'
import { markLetterLearned, getLearnedLetters } from '../state.js'

export function mountLesson(onFinish) {
  const app = document.querySelector('#app')
  
  const learned = getLearnedLetters();
  
  // Ищем первую невыученную букву
  let currentLetter = letters.find(l => !learned.includes(l.char));
  
  if (!currentLetter) {
    currentLetter = letters[Math.floor(Math.random() * letters.length)];
  }

  const isReview = learned.includes(currentLetter.char);
  const optionsCount = isReview ? 3 : 2;

  const wrongLetters = letters.filter(l => l.char !== currentLetter.char)
    .sort(() => Math.random() - 0.5)
    .slice(0, optionsCount - 1)
    .map(l => l.char);

  const options = [currentLetter.char, ...wrongLetters].sort(() => Math.random() - 0.5);

  // Функция озвучки: пытается включить MP3, если файла нет — говорит робот
  const speak = (text, audioPath = null) => {
    window.speechSynthesis.cancel(); // Сбрасываем робота, если он говорил

    if (audioPath) {
      const audio = new Audio(audioPath);
      audio.play().catch(e => {
        // Если файла нет, включаем робота
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ru-RU';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      });
    } else {
      // Если путь не передан, сразу робот
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ru-RU';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }

  const renderLearning = () => {
    // Если буква проблемная (нет слова), сразу переходим к игре
    if (currentLetter.isProblem) {
      renderGame();
      return;
    }

    // Проверяем, есть ли картинка. Если есть — используем тег img, если нет — эмодзи.
    const mediaHTML = currentLetter.image 
      ? `<img src="${currentLetter.image}" alt="" class="word-image" />`
      : `<span class="emoji">${currentLetter.emoji}</span>`;

    app.innerHTML = `
      <div class="screen lesson-screen">
        <div class="owl-corner">🦉</div>
        <div class="letter-display">${currentLetter.char}</div>
        <div class="word-card">
          ${mediaHTML}
          <span class="word">${currentLetter.word}</span>
        </div>
        <button id="next-btn" class="big-btn">Далее</button>
      </div>
    `
    
    // Включаем один файл, где Василиса говорит "А-Арбуз" (если есть)
    setTimeout(() => {
      speak(`${currentLetter.char}... ${currentLetter.word}`, `./audio/${currentLetter.id}.mp3`);
    }, 300);
    
    document.getElementById('next-btn').addEventListener('click', renderGame)
  }

  const renderGame = () => {
    const buttonsHTML = options.map(opt => 
      `<button class="letter-btn" data-letter="${opt}">${opt}</button>`
    ).join('');

    app.innerHTML = `
      <div class="screen lesson-screen">
        <h2 class="prompt" id="prompt">Найди букву ${currentLetter.char}</h2>
        <div class="game-options">
          ${buttonsHTML}
        </div>
      </div>
    `

    // Включаем файл "Найди букву А" (если есть)
    setTimeout(() => {
      speak(`Найди букву ${currentLetter.char}`, `./audio/${currentLetter.id}_find.mp3`);
    }, 300);

    const buttons = document.querySelectorAll('.letter-btn')
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (e.target.dataset.letter === currentLetter.char) {
          markLetterLearned(currentLetter.char);
          setTimeout(onFinish, 1000)
        } else {
          e.target.classList.add('shake')
          setTimeout(() => e.target.classList.remove('shake'), 500)
          speak('Попробуй еще раз') // Тут всегда робот
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