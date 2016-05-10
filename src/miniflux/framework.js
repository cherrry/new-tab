import { Dispatcher } from 'flux'
import { EventEmitter as Event } from 'events'
import { v4 as uuid } from 'node-uuid'

let createDispatcher = function () {
  return new Dispatcher()
}

let generateActions = function (actionNames, dispatcher) {
  let id = uuid()

  let actions = {
    get id() { return id },
    get dispatcher() { return dispatcher }
  }

  actionNames.forEach(function (name) {
    actions[name] = function () {
      dispatcher.dispatch({
        actions: { id, name },
        arguments: arguments
      })
    }
  })

  return actions
}

let createStore = function (storeConfig, dispatcher) {
  let id = uuid()
  let event = new Event()
  let connectedActions = {}

  let dispatcherIndex = dispatcher.register(function (payload) {
    if (connectedActions.hasOwnProperty(payload.actions.id) && storeConfig.hasOwnProperty(payload.actions.name)) {
      storeConfig[payload.actions.name].apply(storeConfig, payload.arguments)
      event.emit(id)
    }
  })

  return {
    get state() { return storeConfig.getState() },

    wait() {
      dispatcher.waitFor([dispatcherIndex])
    },

    connectActions: (actions) => {
      if (dispatcher !== actions.dispatcher) {
        throw new Error('Dispatcher instance mismatched')
      }
      connectedActions[actions.id] = actions
    },

    subscribe(callback) {
      event.addListener(id, callback)
    },

    unsubscribe(callback) {
      event.removeListener(id, callback)
    }
  }
}

export default {
  createDispatcher,
  generateActions,
  createStore
}
