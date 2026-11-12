import { getProgress } from '../state.js';

export function mountZoo(onBackToStart) {
  const app = document.querySelector('#app')
  const progress = getProgress();
  const totalSlots = progress.stickers.length + 3;
  let slotsHTML = '';

  for (let i = 0; i < totalSlots; i++) {
    if (progress.stickers[i]) {
      slotsHTML += `<div class="zoo-slot">${progress.stickers[i]}</div>`;
    } else {
      slotsHTML += `<div class="zoo-slot empty"></div>`;
    }
  }

  app.innerHTML = `
    <div class="screen zoo-screen">
      <h1>Мой зоопарк</h1>
      <div class="zoo-grid">
        ${slotsHTML}
      </div>
      <button id="home-btn" class="big-btn">На главную</button>
    </div>
  `

  document.getElementById('home-btn').addEventListener('click', onBackToStart)

  return {
    unmount: () => { app.innerHTML = '' }
  }
}