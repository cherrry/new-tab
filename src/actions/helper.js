import { EventEmitter as Event } from 'events'

import { Dispatcher } from 'flux'
import { v4 as uuid } from 'node-uuid'

let dispatcher = new Dispatcher()

export function actionsStore(storeConfig) {
  let id = uuid()
  let dispatcherIdx = dispatcher.register(function (payload) {
    if (payload.id === id && storeConfig.hasOwnProperty(payload.action)) {
      storeConfig[payload.action].apply(storeConfig, payload.arguments)
      event.emit(id, storeConfig.getState())
    }
  })

  // bind actions
  let actions = {}
  Object.keys(storeConfig)
    .filter((action) => storeConfig.hasOwnProperty(action) && action !== 'getState')
    .foreach(function (action) {
      actions[action] = function () {
        dispatcher.dispatch({ id, action, arguments })
      }
    })

  // define store
  let store = {
    subscribe(callback) { event.on(id, callback) },
    unsubscribe(callback) { event.removeListener(id, callback) }
  }

  return { actions, store }
}
