import dispatcher from './dispatcher'
import miniflux from './framework'

let curried = function (actionNames) {
  return miniflux.generateActions(actionNames, dispatcher)
}

export default curried
