const defaultFrom = 'en'
const defaultTo = 'zh-TW'

export const getConfig = async () => {
  // 1. retrieve config if any
  const config = await retrieve('config')
  // 2. if config exists, return it
  if (config) {
    return config
  }
  // 3. if config doesn't exist, construct a new one.
  await saveConfig('from', defaultFrom)
  await saveConfig('to', defaultTo)
  return { from: defaultFrom, to: defaultTo }
}

export const getVocabs = async () => {
  return await retrieve('vocabs')
}

export const saveConfig = async (key, value) => {
  const all = await retrieveAll()
  if (!all.config || Object.keys(all.config).length === 0) {
    all.config = {}
  }
  all.config[key] = value
  await new Promise(resolve => chrome.storage.local.set(all, () => {
    resolve()
  }))
}

export const saveVocab = async (id, vocab, from, to, url) => {
  const all = await retrieveAll()
  if (!all.vocabs || Object.keys(all.vocabs).length === 0) {
    all.vocabs = {}
  }
  const timestamp = id || Date.now()
  all.vocabs[timestamp] = { vocab, from, to, url: url.indexOf('chrome://') > -1 ? null : url }
  await new Promise(resolve => chrome.storage.local.set(all, () => {
    resolve()
  }))
}

export const deleteVocab = async (id) => {
  const all = await retrieveAll()
  if (!all.vocabs || Object.keys(all.vocabs).length === 0) {
    return
  }
  delete all.vocabs[id]
  await new Promise(resolve => chrome.storage.local.set(all, () => {
    resolve()
  }))
}

export const retrieve = async (key) => {
  const value = await new Promise(resolve => chrome.storage.local.get(key,
    (obj) => {
      resolve(obj[key])
    })
  )
  return cloneDeep(value)
}

export const retrieveAll = async () => {
  const all = await new Promise(resolve => chrome.storage.local.get(null,
    (obj) => {
      resolve(obj)
    })
  )
  return cloneDeep(all)
}

export const cloneDeep = (obj) =>
  obj ? JSON.parse(JSON.stringify(obj)) : obj
