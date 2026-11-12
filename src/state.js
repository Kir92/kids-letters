const STORAGE_KEY = 'kids_letters_progress';

// 33 животных (по количеству букв)
const ZOO_ANIMALS = [
  '🐻', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐯', '🦁', '🐮', '🐷', 
  '🐸', '🐵', '🐔', '🐧', '🦆', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', 
  '🐝', '🪲', '🦋', '🐌', '🐢', '🐍', '🐙', '🦀', '🐬', '🐳', '🦈'
];

export function getProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  return { stickers: [] };
}

export function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function addSticker() {
  const progress = getProgress();
  
  const animalCount = progress.stickers.filter(s => ZOO_ANIMALS.includes(s)).length;
  
  let newSticker;
  let isSpecial = false;

  if (animalCount < 33) {
    const availableAnimals = ZOO_ANIMALS.filter(a => !progress.stickers.includes(a));
    newSticker = availableAnimals[Math.floor(Math.random() * availableAnimals.length)];
  } else {
    isSpecial = true;
    newSticker = '🏆'; // Кубок
  }

  progress.stickers.push(newSticker);
  saveProgress(progress);
  
  return { sticker: newSticker, isSpecial };
}

// --- ЛОГИКА ОБУЧЕНИЯ БУКВАМ ---

// Сохраняем пройденную букву
export function markLetterLearned(char) {
  const progress = getProgress();
  if (!progress.learnedLetters) progress.learnedLetters = [];
  
  if (!progress.learnedLetters.includes(char)) {
    progress.learnedLetters.push(char);
    saveProgress(progress);
  }
}

// Получаем список выученных букв
export function getLearnedLetters() {
  const progress = getProgress();
  return progress.learnedLetters || [];
}