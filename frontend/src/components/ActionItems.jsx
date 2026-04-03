export default function ActionItems({ actionItems }) {
  return (
    <div className="card action-items-card">
      <h2 className="card-title">Action Items</h2>
      {actionItems && actionItems.length > 0 ? (
        <div className="action-items-list">
          {actionItems.map((item, index) => (
            <div key={index} className="action-item">
              <div className="action-task">{item.task}</div>
              <div className="action-meta">
                <span className="action-owner">
                  {item.owner || 'Unassigned'}
                </span>
                <span className="action-deadline">
                  {item.deadline || '—'}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">No action items found</div>
      )}
    </div>
  )
}