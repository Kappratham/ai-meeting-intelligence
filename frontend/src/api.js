import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const client = axios.create({
  baseURL: API_URL,
  timeout: 300000,
})

export async function transcribeAudio(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await client.post('/transcribe/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data.transcript
}

export async function analyseTranscript(transcript) {
  const response = await client.post('/analyse/', {
    transcript,
  })

  return response.data
}