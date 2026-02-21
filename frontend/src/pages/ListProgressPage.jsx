import { useLocation, useNavigate } from 'react-router-dom'
import { getMatchingProgress, matchingPercent, MATCHING_MAX_PERCENT } from '../utils/matchingProgress'

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

  const wordList = list.words || []
  const progress = getMatchingProgress(list.id)

  return (
    <div style={{ width: '100%', maxWidth: '1100px', flex: 1, padding: '20px', boxSizing: 'border-box' }}>
      <h2 style={{ color: '#f75475', marginBottom: '8px' }}>Progress</h2>
      <h3 style={{ color: 'white', marginBottom: '8px', fontWeight: 'normal' }}>{list.title || 'Untitled list'}</h3>
      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '24px' }}>
        Matching quiz only (max {MATCHING_MAX_PERCENT}% per word). Other games will add more later.
      </p>

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
          <span style={{ color: 'white', fontWeight: '600' }}>{wordList.length}</span>
        </div>

        <div style={{ marginTop: '20px' }}>
          <div style={{ color: '#f75475', fontWeight: '600', marginBottom: '12px' }}>Per word (Matching)</div>
          {wordList.length === 0 ? (
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>No words in this list.</p>
          ) : (
            wordList.map((w, idx) => {
              const totalCorrect = Number(progress[String(idx)]) || 0
              const percent = Math.round(matchingPercent(totalCorrect))
              return (
                <div
                  key={idx}
                  style={{
                    marginBottom: '16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '4px' }}>
                    <span style={{ color: 'white', fontWeight: '500', minWidth: '120px' }}>
                      {w.french?.trim() || '(no word)'}
                    </span>
                    <span style={{ color: '#f75475', fontSize: '14px', fontWeight: '600' }}>{percent}%</span>
                  </div>
                  <div
                    style={{
                      height: '10px',
                      borderRadius: '5px',
                      backgroundColor: '#333',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${percent}%`,
                        maxWidth: '100%',
                        backgroundColor: '#f75475',
                        borderRadius: '5px',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>
                </div>
              )
            })
          )}
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
