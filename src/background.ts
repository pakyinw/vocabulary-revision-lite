import { createMenu, addMenuEventListeners } from './components/menu.ts'

chrome.runtime.onInstalled.addListener((_reason) => {
  createMenu()
})

addMenuEventListeners()
