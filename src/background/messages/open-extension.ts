import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("Open extension")
  const targetUrl = chrome.runtime.getURL("tabs/index.html")

  chrome.windows.getAll({ populate: true }, (windows) => {
    let found = false
    windows.forEach((window) => {
      if (window.tabs) {
        window.tabs.forEach((tab) => {
          if (tab.url === targetUrl) {
            chrome.windows.update(window.id, { focused: true })
            chrome.tabs.update(tab.id, { active: true })
            found = true
          }
        })
      }
    })

    if (!found) {
      chrome.windows.create(
        {
          url: targetUrl,
          type: "normal"
        },
        (window) => {
          console.log(`Popup window created with ID ${window.id}`)
        }
      )
    }
  })

  const message = "Hello from the background script!"

  res.send({
    message
  })
}

export default handler
