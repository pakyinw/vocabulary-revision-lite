import { chrome } from 'jest-chrome';

test('chrome is mocked', () => {
    expect(chrome).toBeDefined();
    expect(window).toBeDefined();
    expect(chrome.storage.local).toBeDefined();
});