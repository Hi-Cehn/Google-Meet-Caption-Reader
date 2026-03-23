
// Variables
let message: string
let captionParent  = '.nMcdL'

let captionGroupObserver: MutationObserver

// Observer to find the parent of the caption element to be analyzed for speaker name and speaker caption
captionGroupObserver = new MutationObserver ( (mutations) => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(caption => {
            if (caption instanceof HTMLElement && caption.matches(captionParent)) {
                processCaption(caption)
            }
        })
    })
})

function processCaption(caption: HTMLElement) {
    const captionText = caption.innerText.trim()
    if (!captionText) return

    message = captionText
}


// ================================
// Start observer (check if user is in a meeting with captions on
// ================================
new MutationObserver(() => {
  const captionRegion = document.querySelector<HTMLElement>('div[role="region"][aria-label="Captions"]')
  
  if(captionRegion){
    captionGroupObserver?.observe(captionRegion, { childList: true, subtree: true })
  }
}).observe(document.body, { childList: true, subtree: true })


// =====================
// Main message listener
// =====================
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg?.type === 'START_SCALPING') {
        sendResponse(message)
        message = ""
        return
    }
})