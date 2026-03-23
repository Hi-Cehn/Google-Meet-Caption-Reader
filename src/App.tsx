import { useState } from "react"

function App() {
  const [output, setOutput] = useState("")

  const handleClick = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (!tab.id) return

    try {
      const res = await chrome.tabs.sendMessage(tab.id, { type: "START_SCALPING" })

      if (res) {
        setOutput(prev => prev + res + "\n")
      }
    } catch (e) {
      console.log("No google meet meeting found.")
    }
  }

  return (
    <div>
      <center>
        <button onClick={handleClick}>Start</button>
      </center>

      <textarea value={output} readOnly cols={44} rows={50}/>
    </div>
  )
}

export default App