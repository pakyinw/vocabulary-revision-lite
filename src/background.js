import { createMenu, addMenuEventListeners } from './components/menu.js'

chrome.runtime.onInstalled.addListener((_reason) => {
  createMenu()
})

addMenuEventListeners()
