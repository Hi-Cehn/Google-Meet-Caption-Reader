
let message: string

new MutationObserver(() => {
  const region = document.querySelector<HTMLElement>('div[role="region"][aria-label="Captions"]')
  if(region){
    message = "Captions found."
  }
}).observe(document.body, { childList: true, subtree: true })

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg?.type === 'START_SCALPING') {
        sendResponse(message)
        message = ""
        return true
    }
})