import qs from 'qs'

const tryParseInt = value => {
  const result = parseInt(value)
  return isNaN(result) ? value : result
}

const parseObjectValues = (obj = {}) => {
  Object.keys(obj).forEach(k => {
    obj[k] = tryParseInt(obj[k])
  })

  return obj
}

const useParseUrl = (url) => {
  const value = parseObjectValues(
    qs.parse(url, { ignoreQueryPrefix: true }) || {}
  )

  return value
}

export default useParseUrl