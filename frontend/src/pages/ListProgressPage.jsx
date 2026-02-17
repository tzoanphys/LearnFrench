import { useLocation, useNavigate } from 'react-router-dom'

function ListProgressPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const list = location.state?.list

  if (!list) {
    return (
      <div style={{ padding: '20px', maxWidth: '1100px' }}>
        <h2 style={{ color: '#f75475', marginBottom: '16px' }}>Progress</h2>
        <p style={{ color: 'white' }}>No list selected.</p>
        <button
          type="button"
          onClick={() => navigate('/my-lists')}
          style={{
            marginTop: '16px',
            padding: '12px 24px',
            backgroundColor: '#f75475',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Back to My Lists
        </button>
      </div>
    )
  }

  const wordCount = list.words?.length ?? 0
  // Placeholder: no progress tracking yet - could later use localStorage or backend
  const progressPercent = 0
  const wordsMastered = 0

  return (
    <div style={{ width: '100%', maxWidth: '1100px', flex: 1, padding: '20px', boxSizing: 'border-box' }}>
      <h2 style={{ color: '#f75475', marginBottom: '8px' }}>Progress</h2>
      <h3 style={{ color: 'white', marginBottom: '24px', fontWeight: 'normal' }}>{list.title || 'Untitled list'}</h3>

      <div
        style={{
          backgroundColor: 'rgba(30, 30, 30, 0.95)',
          borderLeft: '4px solid #f75475',
          borderRadius: '0 10px 10px 0',
          padding: '24px',
          marginBottom: '24px',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <span style={{ color: 'rgba(255,255,255,0.8)' }}>Words in list: </span>
          <span style={{ color: 'white', fontWeight: '600' }}>{wordCount}</span>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <span style={{ color: 'rgba(255,255,255,0.8)' }}>Words mastered: </span>
          <span style={{ color: 'white', fontWeight: '600' }}>{wordsMastered}</span>
        </div>
        <div>
          <span style={{ color: 'rgba(255,255,255,0.8)' }}>Progress: </span>
          <span style={{ color: '#f75475', fontWeight: '600' }}>{progressPercent}%</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate('/my-lists')}
        style={{
          padding: '12px 24px',
          backgroundColor: '#444',
          color: 'white',
          border: '1px solid #666',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Back to My Lists
      </button>
    </div>
  )
}

export default ListProgressPage
