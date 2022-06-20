import { getImportFile, getTranslateFromTo, getConfig, getVocabs, saveConfig, saveVocab, deleteVocab } from '../lib/common';


export const refreshConfig = async () => {
    const config = await getConfig();

    const { from, to } = getTranslateFromTo();
    from.value = config.from;
    to.value = config.to;
};

const createVocabRow = async (date, text, url) => {
    document.getElementById('vocabs').innerHTML +=
        "<div class='row'>" +
        "<div class='cell'>" + new Date(+date).toLocaleDateString() + '</div>' +
        "<div class='cell'>" + text + '</div>' +
        (url ? "<div class='cell'><a target='_blank' rel='noopener noreferrer' href='" + url + "'>here</a></div>" : '<div></div>') +
        "<div class='cell'><a target='_blank' rel='noopener noreferrer' id='delete" + date + "'>delete</a></div>" +
        '</div>';
};

const createVocabRowEventListener = (date) => {
    document.getElementById('delete' + date).addEventListener('click', async () => {
        await deleteVocab(date);
        await refreshVocabTable();
    });
};

export const refreshVocabTable = async () => {
    const vocabs = await getVocabs();
    document.getElementById('vocabs').innerHTML = '';
    if (vocabs && Object.keys(vocabs).length > 0) {
        Object.keys(vocabs).map(key =>
            createVocabRow(key, vocabs[key].vocab, vocabs[key].url)
        );
        Object.keys(vocabs).map(key =>
            createVocabRowEventListener(key)
        );
    }
};

const exportCSV = async () => {
    const vocabs = await getVocabs();

    if (!vocabs || Object.keys(vocabs).length <= 0) {
        alert('No vocabulary can be exported.');
        return;
    }

    const universalBOM = '\uFEFF';

    const csvHeader = 'data:text/csv; charset=utf-8,' + encodeURIComponent(universalBOM);
    const csvContent = Object.keys(vocabs).map((key) => key + ',' + new Date(+key).toLocaleDateString() + ',' + vocabs[key].vocab + ',' + vocabs[key].from + ',' + vocabs[key].to + ',' + vocabs[key].url + '\n').join('');

    const link = document.createElement('a');
    link.setAttribute('href', csvHeader + csvContent);
    link.setAttribute('download', 'vocab_' + new Date().toLocaleDateString() + '.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const importCSV = () => {
    document.getElementById('selectedFile').click();
};

const readFile = async () => {
    const reader = new FileReader();
    reader.onload = async () => {
        const result = reader.result;
        // Type guard
        if (typeof result !== 'string') {
            throw new Error("Unexpected result from FileReader");
        }
        const lines = result.split('\n');
        while (typeof lines[0] !== 'undefined') {
            const line = lines.shift();
            const split = line.split(',');
            if (split && split.length && split.length > 2) {
                const time = split[0];
                const vocab = split[2];
                const from = split[3];
                const to = split[4];
                const url = split[5];
                await saveVocab(time, vocab, from, to, url);
            } else {
                alert('[Read file error] Please try another valid CSV file.');
                return;
            }
        }
        await refreshVocabTable();
    };
    reader.readAsText(getImportFile().files[0], 'ISO-8859-1');
};



export const addListeners = () => {
    // add listener for the select options
    const { from, to } = getTranslateFromTo();

    from.addEventListener('change', () => {
        saveConfig('from', from.value);
    });
    to.addEventListener('change', () => {
        saveConfig('to', to.value);
    });

    // add listener for the reset button
    const btnReset = document.getElementById('btnReset');
    btnReset.addEventListener('click', async () => {
        const isExecuted = confirm('The action clears all vocabularies. Are you sure?');
        if (isExecuted) {
            chrome.storage.local.clear();
            await refreshConfig();
            await refreshVocabTable();
        }
    });

    // add listener for the export button
    const btnExport = document.getElementById('btnExport');
    btnExport.addEventListener('click', async () => {
        exportCSV();
    });

    // add listener for the import button
    const btnImport = document.getElementById('btnImport');
    btnImport.addEventListener('click', async () => {
        importCSV();
    });

    // add listener for the file dialog
    const selectedFile = document.getElementById('selectedFile');
    selectedFile.addEventListener('change', async () => {
        await readFile();
    });
};
