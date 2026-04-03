import SummaryCard from '../components/SummaryCard'
import ActionItems from '../components/ActionItems'
import SentimentChart from '../components/SentimentChart'
import TopicsList from '../components/TopicsList'
import ExportBar from '../components/ExportBar'

export default function Results({ results, onBack }) {
  return (
    <div className="results-container">
      <button className="back-btn" onClick={onBack}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back
      </button>

      <ExportBar results={results} />

      <div className="results-grid">
        <div className="results-column">
          <SummaryCard
            tldr={results.summary?.tldr}
            keyPoints={results.summary?.key_points}
          />
          <SentimentChart sentiment={results.sentiment} />
        </div>

        <div className="results-column">
          <TopicsList topics={results.topics} />
          <ActionItems actionItems={results.action_items} />
        </div>
      </div>
    </div>
  )
}