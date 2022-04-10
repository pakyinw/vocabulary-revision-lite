import { createMenu, addMenuEventListeners } from './components/menu';

chrome.runtime.onInstalled.addListener((_reason) => {
  createMenu();
});

addMenuEventListeners();
