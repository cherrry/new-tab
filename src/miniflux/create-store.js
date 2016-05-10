import dispatcher from './dispatcher'
import flux from './framework'

let curried = function (storeConfig) {
  return flux.createStore(storeConfig, dispatcher)
}

export default curried
