/*
const captionEnabledChecker = new MutationObserver( () => {
    const captionElement = document.querySelector<HTMLElement>('div[role="region"][aria-label="Captions"]')
    if (captionElement) {

    }
}).observe(document.body)
*/

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg.type === "START_SCALPING") {
        sendResponse({ ok: true })
        return
    }
})