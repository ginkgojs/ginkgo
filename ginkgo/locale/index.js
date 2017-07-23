const I18n = require('i18n-2')

const LocaleConfigure = {
  directory: '',  
  defaultLocale: 'zh-CN'
}

module.exports = class Locale {
  constructor (i18n, serviceManager) {
    this.i18n = i18n
    this.serviceManager = serviceManager
  }

  static create (options, serviceManager) {
    let i18n = null

    options = Object.assign(LocaleConfigure, options)
    if (options.directory) {
      i18n = new I18n({
        locales: options.locales,
        directory: options.directory
      })
      if (options.defaultLocale) {
        i18n.setLocale(options.defaultLocale)
      }
    }

    return new Locale(i18n, serviceManager)
  }

  exists () {
    return !!this.i18n
  }

  fetch (raw) {
    return this.exists() ? (this.i18n.__(raw) || raw) : raw
  }
}