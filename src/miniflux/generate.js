import generateActions from './generate-actions'
import createStore from './create-store'

let generate = function (storeConfig) {
  let actionNames = Object.keys(storeConfig).filter(function (name) {
    return storeConfig.hasOwnProperty(name) && name !== 'getState'
  })

  let actions = generateActions(actionNames)
  let store = createStore(storeConfig)

  store.connectActions(actions)

  return {
    get actions() { return actions },
    get store() { return store }
  }
}

export default generate
