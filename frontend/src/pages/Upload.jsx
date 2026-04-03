import { useState } from 'react'
import { transcribeAudio, analyseTranscript } from '../api'

export default function Upload({ onResults }) {
  const [activeTab, setActiveTab] = useState('audio')
  const [file, setFile] = useState(null)
  const [transcript, setTranscript] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState('')
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError('')
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
      setError('')
    }
  }

  const handleAnalyse = async () => {
    setError('')

    if (activeTab === 'audio') {
      if (!file) {
        setError('Please select an audio file')
        return
      }

      setLoading(true)
      setStep('Transcribing...')

      try {
        const transcriptText = await transcribeAudio(file)
        setStep('Analysing...')

        const results = await analyseTranscript(transcriptText)
        onResults(results)
      } catch (err) {
        setError(err.response?.data?.detail || err.message || 'An error occurred')
        setLoading(false)
        setStep('')
      }
    } else {
      if (!transcript.trim()) {
        setError('Please paste a transcript')
        return
      }

      setLoading(true)
      setStep('Analysing...')

      try {
        const results = await analyseTranscript(transcript)
        onResults(results)
      } catch (err) {
        setError(err.response?.data?.detail || err.message || 'An error occurred')
        setLoading(false)
        setStep('')
      }
    }
  }

  return (
    <div className="upload-container">
      <h1>AI Meeting Intelligence</h1>
      <p className="subtitle">Upload audio or paste a transcript to get AI-powered insights</p>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'audio' ? 'active' : ''}`}
          onClick={() => setActiveTab('audio')}
        >
          Upload Audio
        </button>
        <button
          className={`tab ${activeTab === 'transcript' ? 'active' : ''}`}
          onClick={() => setActiveTab('transcript')}
        >
          Paste Transcript
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'audio' && (
          <div className="audio-tab">
            <div
              className={`dropzone ${dragOver ? 'dragover' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileInput').click()}
            >
              <div className="dropzone-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <p className="dropzone-text">
                {file
                  ? `Selected: ${file.name}`
                  : 'Drag & drop an audio file here, or click to select'}
              </p>
              <p className="dropzone-hint">Supports MP3, WAV, M4A, WebM</p>
              <input
                id="fileInput"
                type="file"
                accept=".mp3,.wav,.m4a,.webm"
                onChange={handleFileChange}
              />
            </div>
          </div>
        )}

        {activeTab === 'transcript' && (
          <div className="transcript-tab">
            <textarea
              className="transcript-input"
              placeholder="Paste your meeting transcript here..."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
            />
          </div>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <button
        className="analyse-btn"
        onClick={handleAnalyse}
        disabled={loading}
      >
        {loading ? (
          <span className="loading-btn">
            <span className="spinner"></span>
            {step}
          </span>
        ) : (
          'Analyse'
        )}
      </button>
    </div>
  )
}