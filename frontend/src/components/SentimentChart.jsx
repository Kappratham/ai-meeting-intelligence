export default function SentimentChart({ sentiment }) {
  const getSentimentColor = (sentimentValue) => {
    if (sentimentValue === 'positive') return '#22c55e'
    if (sentimentValue === 'negative') return '#ef4444'
    return '#eab308'
  }

  const overall = sentiment?.overall || 'neutral'
  const score = sentiment?.score || 5

  return (
    <div className="card sentiment-card">
      <h2 className="card-title">Sentiment</h2>
      <div className="sentiment-overall">
        <span
          className="sentiment-pill"
          style={{ backgroundColor: getSentimentColor(overall) }}
        >
          {overall}
        </span>
        <span className="sentiment-score">{score} / 10</span>
      </div>
      {sentiment?.per_speaker && Object.keys(sentiment.per_speaker).length > 0 && (
        <div className="per-speaker-sentiment">
          <h3>Per Speaker</h3>
          <div className="speaker-list">
            {Object.entries(sentiment.per_speaker).map(([speaker, data]) => (
              <div key={speaker} className="speaker-item">
                <span className="speaker-name">{speaker}</span>
                <span
                  className="speaker-sentiment"
                  style={{ backgroundColor: getSentimentColor(data.sentiment) }}
                >
                  {data.sentiment} ({data.score})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}