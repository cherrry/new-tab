export function createClient(actionNames) {
  let client = {}

  actionNames.forEach(function (action) {
    client[action] = function () {
      let args = []
      for (let i = 0; i < arguments.length; i++) {
        args.push(arguments[i])
      }

      return new Promise(function (resolve, reject) {
        chrome.runtime.sendMessage({ action, args }, function (response) {
          if (response.ok) {
            resolve(response.result)
          } else {
            reject(response.error)
          }
        })
      });
    }
  })

  return client
}

export function createServer() {
  let messageHandlers = {}

  let messageListener = function (message, sender, sendResponse) {
    let { action, args } = message

    if (messageHandlers.hasOwnProperty(action)) {
      let handler = messageHandlers[action]
      Promise.resolve(handler.apply(null, args))
        .then(function (result) {
          sendResponse({ ok: true, result })
        }, function (error) {
          sendResponse({ ok: false, error })
        })

    } else {
      sendResponse({ ok: false, error: "Message handler " + action + " does not exist"})
    }

    return true
  }

  let server = {
    addHandler(messageHandler) {
      Object.keys(messageHandler)
        .filter((action) => messageHandler.hasOwnProperty(action))
        .forEach(function (action) {
          if (messageHandlers.hasOwnProperty(action)) {
            throw new Error("Message handler already exist for " + action + ".")
          }
          messageHandlers[action] = messageHandler[action]
        })
      return server
    },

    run() {
      chrome.runtime.onMessage.addListener(messageListener)
    }
  }

  return server
}
