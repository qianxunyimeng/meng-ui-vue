;(() => {
  const supportedLangs = window.supportedLangs
  console.log(supportedLangs)
  const cacheKey = 'preferred_lang'
  const defaultLang = 'zh-CN'
  // docs supported languages
  const langAlias = {
    zh: 'zh-CN',
    en: 'en-US',
    fr: 'fr-FR',
    es: 'es-ES',
  }
  let userPreferredLang = localStorage.getItem(cacheKey) || navigator.language

  console.log(userPreferredLang)
  console.log(langAlias[userPreferredLang])
  console.log(supportedLangs.includes(userPreferredLang))
  const language =
    langAlias[userPreferredLang] ||
    (supportedLangs.includes(userPreferredLang)
      ? userPreferredLang
      : defaultLang)
  
  //localStorage.setItem(cacheKey, language)
  localStorage.setItem(cacheKey, 'zh-CN')
  //userPreferredLang = language
  userPreferredLang = 'zh-CN'
  if (!location.pathname.startsWith(`/${userPreferredLang}`)) {
    const toPath = [`/${userPreferredLang}`]
      .concat(location.pathname.split('/').slice(2))
      .join('/')
    location.pathname =
      toPath.endsWith('.html') || toPath.endsWith('/')
        ? toPath
        : toPath.concat('/')
  }
})()
