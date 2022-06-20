import { chrome } from 'jest-chrome';
import * as libraryModule from '../lib/common';
import { refreshConfig } from '../components/popup';

describe('Popup Testing', () => {
    test('chrome is mocked', () => {
        expect(chrome).toBeDefined();
        expect(window).toBeDefined();
        expect(chrome.storage.local).toBeDefined();
    });

    test('refreshConfig', async () => {
        const spyGetConfig = jest.spyOn(libraryModule, 'getConfig');
        spyGetConfig.mockReturnValue(Promise.resolve({ from: 'en', to: 'zh-TW' }));

        const spyGetTranslateFromTo = jest.spyOn(libraryModule, 'getTranslateFromTo');
        const fromElem = document.createElement("select");
        const toElem = document.createElement("select");
        spyGetTranslateFromTo.mockReturnValue({ from: fromElem, to: toElem });

        await expect(refreshConfig()).resolves.toBe(undefined);
        expect(spyGetConfig).toHaveBeenCalledTimes(1);
        expect(spyGetTranslateFromTo).toHaveBeenCalledTimes(1);

        spyGetConfig.mockRestore();
        spyGetTranslateFromTo.mockRestore();
    })
})