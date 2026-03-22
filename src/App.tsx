import { useState } from "react"

function App() {
  let [output, setOutput] = useState("")

  async function clickEvent() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (!tab?.id) return

    const res = await chrome.tabs
      .sendMessage(tab.id, {type: "START_SCALPING"})
      .catch((_e) => {
        console.log('No transcript on this page')
      })

    setOutput(output + JSON.stringify(res) + "\n")
  }

  return (
    <div>
      <center>
        <button onClick={clickEvent}>Start</button>
      </center>

      <textarea value={output} readOnly cols={44} rows={50}/>
    </div>
  )
}

export default App
