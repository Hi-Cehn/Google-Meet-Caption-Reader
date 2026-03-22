function App() {
  function clickEvent() {
    const textOutput = document.getElementById("outputArea") as HTMLTextAreaElement

    textOutput.value += "Test Output. \n" 
  }

  return (
    <div>
      <center>
        <button onClick={clickEvent}>Start</button>
      </center>

      <textarea id="outputArea" readOnly cols={44} rows={50}/>
    </div>
  )
}

export default App
