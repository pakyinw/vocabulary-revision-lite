import { createMenu, addMenuEventListeners } from './js/menu.js'

chrome.runtime.onInstalled.addListener((_reason) => {
  createMenu()
})

addMenuEventListeners()
