export default function TopicsList({ topics }) {
  return (
    <div className="card topics-card">
      <h2 className="card-title">Topics</h2>
      {topics && topics.length > 0 ? (
        <div className="topics-grid">
          {topics.map((topic, index) => (
            <div key={index} className="topic-card">
              <div className="topic-label">{topic.label}</div>
              <div className="topic-description">{topic.description}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">No topics identified</div>
      )}
    </div>
  )
}