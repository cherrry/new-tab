export function createClient(actionNames) {
  let client = {}

  actionNames.foreach(function (action) {
    client[action] = function () {
      return new Promise(function (resolve, reject) {
        chrome.runtime.sendMessage({ action, arguments }, function (response) {
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
  let serverConfigs = {}

  let messageListener = function (message, sender, sendResponse) {
    let { action, arguments } = message

    if (serverConfigs.hasOwnProperty(action)) {
      let handler = serverConfigs[action]
      Promise.resolve(handler.apply(null, arguments))
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
    addConfig(serverConfig) {
      Object.keys(serverConfig)
        .filter((action) => clientConfig.hasOwnProperty(action))
        .foreach(function (action) {
          if (serverConfig.hasOwnProperty(action)) {
            throw new Error("Message handler already exist for " + action ".")
          }
          serverConfigs[action] = serverConfig[action]
        })
      return server
    },

    run() {
      chrome.runtime.onMessage.addListener(function ())
    }
  }
}
