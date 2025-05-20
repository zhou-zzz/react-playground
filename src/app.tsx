import ReactPlayground from './react-playground'
import { PlaygroundProvider } from './react-playground/playground-context'
import './app.scss'

function App() {
  return (
    <PlaygroundProvider>
      <ReactPlayground />
    </PlaygroundProvider>
  )
}

export default App
