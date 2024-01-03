import './App.css'
import Timer from './components/timer/Timer'

function App() {
  return (
    <>
      <Timer duration={7} />
      <Timer duration={60} />
      <Timer duration={300} />
    </>
  )
}

export default App
