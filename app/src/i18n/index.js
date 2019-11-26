import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enUS from './lang/en_us'
import ptBR from './lang/pt_br'
import StoreCache from '@/utils/storeCache'

Vue.use(VueI18n)
const cache = new StoreCache('vuex')

export function getLangConfig () {
  let browserLang = navigator.userLanguage || window.navigator.language
  browserLang = browserLang.toLowerCase()

  return cache.get('lang') || browserLang || 'ptBR'
}

export function setLangConfig (lang) {
  cache.set('lang', lang)
  i18n.locale = lang
}

const messages = {
  enUS,
  ptBR
}

const i18n = new VueI18n({
  locale: getLangConfig(),
  messages,
  fallbackLocale: 'ptBR'
})

export default i18n
