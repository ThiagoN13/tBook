/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */
const files = require.context('.', true, /^\.\/[\w]+\/index\.js$/)
const modules = {}

files.keys().forEach(key => {
  if (key === './index.js') return

  const store = files(key).default
  const { namespaced = true, ignore } = module

  if (ignore) return

  const moduleName = key.replace(/(\.\/|\/index\.js|\.js)/g, '')

  store.namespaced = namespaced

  modules[moduleName] = store
})

export default modules
