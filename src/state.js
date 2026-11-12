const STORAGE_KEY = 'kids_letters_progress';

// Полный список из 20 животных
const ZOO_ANIMALS = ['🐻', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🦆', '🦉', '🦇', '🐺', '🐗'];

export function getProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return { stickers: [] }; // Если пусто, возвращаем пустой массив
}

export function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function addSticker() {
  const progress = getProgress();
  
  // Ищем животных, которых еще нет в коллекции
  const availableAnimals = ZOO_ANIMALS.filter(a => !progress.stickers.includes(a));
  
  let newSticker;

  if (availableAnimals.length > 0) {
    // Если есть свободные животные, выдаем случайное
    newSticker = availableAnimals[Math.floor(Math.random() * availableAnimals.length)];
  } else if (!progress.stickers.includes('🏆Кубок + вкусняшка!!!')) {
    // Если все звери собраны, но медали еще нет — выдаем ЗОЛОТУЮ МЕДАЛЬ
    newSticker = '🏆Кубок + вкусняшка!!!';
  } else {
    // Если и медаль уже есть, начинаем выдавать зверей по кругу
    newSticker = ZOO_ANIMALS[Math.floor(Math.random() * ZOO_ANIMALS.length)];
  }

  progress.stickers.push(newSticker);
  saveProgress(progress);
  
  return newSticker;
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