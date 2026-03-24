
// Variables
let message: string
let captionParentTag  = '.nMcdL'
let speakerIdTag = '.NWpY1d'
let captionIdTag = '.ygicle'
let captionGroupObserver: MutationObserver | null = null

interface messageObject {
    speaker: string,
    dialoge: string
}
type timedMessageObject = messageObject & { timer: number }

const bufferMessage = new Map<string, timedMessageObject>()
const prevCaption = new Map<string, string>()
const messageTimeout = 1500

// Observer to find the parent of the caption element to be analyzed for speaker name and speaker caption


// Function to revert caption text to lowercase and with no puncuation or unneeded whitespace
const normalize = (pre: string) =>
  pre.toLowerCase().replace(/[.,?!'"\u2019]/g, "").replace(/\s+/g, " ").trim()

// Function to check if dialoge has changed
function duplicateDialogeChecker(speaker: string, captionText: string) {
    const baseText = normalize(captionText)
    const prevText = prevCaption.get(speaker)
    if (baseText === prevText) return false
    prevCaption.set(speaker, baseText)
    return true
}

function createMessage(speaker: string, dialoge: string) {
    const existingCaption = bufferMessage.get(speaker)

    if (!existingCaption) {
        const timer = window.setTimeout(() => sendTranscriptLine(speaker), messageTimeout)
        bufferMessage.set(speaker, {
            speaker,
            dialoge,
            timer
        })
        return
    }

    existingCaption.speaker = speaker
    existingCaption.dialoge = dialoge

    clearTimeout(existingCaption.timer)
    existingCaption.timer = window.setTimeout(() => sendTranscriptLine(speaker), messageTimeout)
    
}

function captionScanner(captionElement: HTMLDivElement,speaker: string, dialoge: string) {
    const push = () => {
        createMessage(speaker, dialoge)
    }

    push()

    new MutationObserver(push).observe(captionElement, { childList: true, subtree: true, characterData: true })
}

// Function to split caption element into different parts
function disectCaption(caption: HTMLElement) {
    const captionElement = caption.querySelector<HTMLDivElement>(captionIdTag)
    if (!captionElement) return

    const trimmedDialoge = captionElement.textContent?.trim() ?? ""

    const speaker = caption.querySelector<HTMLElement>(speakerIdTag)?.textContent?.trim() ?? ""

    if (!duplicateDialogeChecker(speaker, trimmedDialoge)) return

    captionScanner(captionElement, speaker, trimmedDialoge)
}


// ================================
// Start observer (check if user is in a meeting with captions on
// ================================
new MutationObserver(() => {
  const captionRegion = document.querySelector<HTMLElement>('div[role="region"][aria-label="Captions"]')
  
  if(captionRegion){
    captionGroupObserver = new MutationObserver ( (mutations) => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(caption => {
                if (caption instanceof HTMLElement && caption.matches(captionParentTag)) {
                    disectCaption(caption)
                }
            })
        })
    })
    captionGroupObserver?.observe(captionRegion, { childList: true, subtree: true })
    captionRegion.querySelectorAll<HTMLElement>(captionParentTag).forEach(disectCaption)
  }
}).observe(document.body, { childList: true, subtree: true })