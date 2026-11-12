import './style.css'
import { mountStart } from './screens/start.js'
import { mountLesson } from './screens/lesson.js'
import { mountSessionEnd } from './screens/session-end.js'
import { mountZoo } from './screens/zoo.js'
import { mountParent } from './screens/parent.js' // <-- Добавили импорт

const app = document.querySelector('#app')
let currentScreen = null

function showStart() {
  if (currentScreen) currentScreen.unmount()
  currentScreen = mountStart(
    () => showLesson(),     // Нажали "Играть"
    () => showParent()      // Зажали кнопку для родителей
  )
}

function showLesson() {
  if (currentScreen) currentScreen.unmount()
  currentScreen = mountLesson(() => showSessionEnd())
}

function showSessionEnd() {
  if (currentScreen) currentScreen.unmount()
  currentScreen = mountSessionEnd(() => showZoo())
}

function showZoo() {
  if (currentScreen) currentScreen.unmount()
  currentScreen = mountZoo(() => showStart())
}

function showParent() {
  if (currentScreen) currentScreen.unmount()
  currentScreen = mountParent(() => showStart()) // Возврат из настроек
}

showStart()