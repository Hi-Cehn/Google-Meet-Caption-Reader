import { useEffect, useState } from "react"

function App() {
  const [output, setOutput] = useState("")
  const [isListening, setIsListening] = useState(false)

  const startScalping = async () => {
    setIsListening(true)
  }

  const stopScalping = async () => {
    setIsListening(false)
  }

  useEffect( () => {
    if (!isListening) return

    chrome.runtime.onMessage.addListener((msg) => {
      if (msg?.type === "CAPTION_DETECTED") {
        setOutput(prev => prev += msg.data + "\n")
      }
    })

  }, [isListening])

  return (
    <div>
      <center>
        <button onClick={startScalping}>Start</button>
        <button onClick={stopScalping}>Stop</button>
      </center>

      <textarea value={output} readOnly cols={44} rows={50}/>
    </div>
  )
}

export default App