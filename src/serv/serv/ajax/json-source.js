import htmlSource from './html-source'

export default function (url) {
  return htmlSource(url)
    .then(function (response) {
      return JSON.parse(response)
    })
}
