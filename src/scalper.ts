
// Variables
let message: string
let captionParentTag  = '.nMcdL'
let speakerIdTag = '.NWpY1d'
let captionIdTag = '.ygicle'

let captionGroupObserver: MutationObserver | null = null

let prevCaption = new Map<string, string>()

// Observer to find the parent of the caption element to be analyzed for speaker name and speaker caption
captionGroupObserver = new MutationObserver ( (mutations) => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(caption => {
            if (caption instanceof HTMLElement && caption.matches(captionParentTag)) {
                disectCaption(caption)
            }
        })
    })
})

const normalize = (pre: string) =>
  pre.toLowerCase().replace(/[.,?!'"\u2019]/g, "").replace(/\s+/g, " ").trim()

function duplicateDialogeChecker(speaker: string, captionText: string) {
    const baseText = normalize(captionText)
    const prevText = prevCaption.get(speaker)
    if (baseText === prevText) return
    prevCaption.set(speaker, captionText)
}

// Function to split caption into different parts
function disectCaption(caption: HTMLElement) {
    const captionDialoge = caption.querySelector<HTMLDivElement>(captionIdTag)
    if (!captionDialoge) return

    const trimmedDialoge = captionDialoge.textContent?.trim() ?? ""

    const speaker = caption.querySelector<HTMLElement>(speakerIdTag)?.textContent?.trim() ?? ""

    duplicateDialogeChecker(speaker, trimmedDialoge)
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