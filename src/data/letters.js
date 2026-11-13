export const letters = [
  // --- ГЛАСНЫЕ ---
  { id: 'a', char: 'А', word: 'арбуз', image: './images/arbuz.png' },
  { id: 'o', char: 'О', word: 'облако', emoji: '☁️' },
  { id: 'u', char: 'У', word: 'утка', emoji: '🦆' },
  { id: 'i', char: 'И', word: 'игрушка', emoji: '🧸' },
  { id: 'e', char: 'Э', word: 'эскимо', emoji: '🍦' },
  { id: 'y', char: 'Ы', word: 'сыр', emoji: '🧀', isProblem: true },
  
  // --- СОНОРНЫЕ ---
  { id: 'm', char: 'М', word: 'мышь', emoji: '🐁' },
  { id: 'n', char: 'Н', word: 'нос', emoji: '👃' },
  { id: 'l', char: 'Л', word: 'луна', emoji: '🌙' },
  { id: 'r', char: 'Р', word: 'рыба', emoji: '🐟' },
  { id: 'j', char: 'Й', word: 'йогурт', emoji: '🥛' }, // в начале слова звучит как "й"

  // --- ЗВОНКИЕ И ГЛУХИЕ ---
  { id: 'b', char: 'Б', word: 'банан', emoji: '🍌' },
  { id: 'v', char: 'В', word: 'вода', emoji: '💧' },
  { id: 'g', char: 'Г', word: 'гриб', emoji: '🍄' },
  { id: 'd', char: 'Д', word: 'дом', emoji: '🏠' },
  { id: 'z', char: 'З', word: 'зебра', emoji: '🦓' },
  { id: 'k', char: 'К', word: 'кот', emoji: '🐱' },
  { id: 'p', char: 'П', word: 'пицца', emoji: '🍕' },
  { id: 's', char: 'С', word: 'собака', emoji: '🐶' },
  { id: 't', char: 'Т', word: 'торт', emoji: '🎂' },
  { id: 'f', char: 'Ф', word: 'футбол', emoji: '⚽' },
  { id: 'h', char: 'Х', word: 'хлеб', emoji: '🍞' },
  
  // --- ШИПЯЩИЕ И АФФРИКАТЫ ---
  { id: 'zh', char: 'Ж', word: 'жук', emoji: '🪲' },
  { id: 'sh', char: 'Ш', word: 'шар', emoji: '🎈' },
  { id: 'sch', char: 'Щ', word: 'щетка', emoji: '🪥' },
  { id: 'ts', char: 'Ц', word: 'цветок', emoji: '🌸' },
  { id: 'ch', char: 'Ч', word: 'часы', emoji: '⏰' },

  // --- ПРОБЛЕМНЫЕ (без слова-ассоциации, только звук) ---
  { id: 'yo', char: 'Ё', isProblem: true },
  { id: 'yu', char: 'Ю', isProblem: true },
  { id: 'ya', char: 'Я', isProblem: true },
  { id: 'soft', char: 'Ь', isProblem: true },
  { id: 'hard', char: 'Ъ', isProblem: true }
]