export default function SummaryCard({ tldr, keyPoints }) {
  return (
    <div className="card summary-card">
      <h2 className="card-title">Summary</h2>
      {tldr && <p className="tldr">{tldr}</p>}
      {keyPoints && keyPoints.length > 0 && (
        <div className="key-points">
          <h3>Key Points</h3>
          <ul>
            {keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}