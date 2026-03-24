import { useState } from "react"

function App() {
  const [output, setOutput] = useState("")

  const handleClick = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (!tab.id) return
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