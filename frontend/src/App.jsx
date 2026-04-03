import { useState } from 'react'
import Upload from './pages/Upload'
import Results from './pages/Results'

export default function App() {
  const [results, setResults] = useState(null)

  return results ? (
    <Results results={results} onBack={() => setResults(null)} />
  ) : (
    <Upload onResults={setResults} />
  )
}