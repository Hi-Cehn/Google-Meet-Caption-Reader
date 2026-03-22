const captionEnabledChecker = new MutationObserver( () => {
    const captionElement = document.querySelector<HTMLElement>('div[role="region"][aria-label="Captions"]')
    if (captionElement) {

    }
}).observe(document.body)