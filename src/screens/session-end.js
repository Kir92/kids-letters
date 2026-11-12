import { addSticker } from '../state.js';

export function mountSessionEnd(onGoToZoo) {
  const app = document.querySelector('#app')
  const newSticker = addSticker(); // Получаем новую зверушку

  app.innerHTML = `
    <div class="screen end-screen">
      <div class="confetti">🎉</div>
      <h1>Молодец!</h1>
      <p class="reward-text">Ты заработал наклейку!</p>
      <div class="sticker-anim">${newSticker}</div>
      <button id="zoo-btn" class="big-btn">В зоопарк</button>
    </div>
  `

  setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance('Молодец! Ты заработал наклейку!')
    utterance.lang = 'ru-RU'
    window.speechSynthesis.speak(utterance)
  }, 300)

  document.getElementById('zoo-btn').addEventListener('click', onGoToZoo)

  return {
    unmount: () => { 
      app.innerHTML = '' 
      window.speechSynthesis.cancel()
    }
  }
}