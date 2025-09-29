import filter from 'leo-profanity'

const filterWords = (value) => {
  filter.loadDictionary('en')
  const enFiltered = filter.clean(value)
  filter.loadDictionary('ru')
  const ruFiltered = filter.clean(enFiltered)
  filter.loadDictionary('fr')
  return filter.clean(ruFiltered)
}

export default filterWords
