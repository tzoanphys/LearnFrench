import { useLocation, useNavigate } from 'react-router-dom'

function QuizPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const words = location.state?.words || []
  const mode = location.state?.mode

  const modeLabel =
    mode === 'matching'
      ? 'Matching'
      : mode === 'write'
        ? 'Write'
        : mode === 'select'
          ? 'Select'
          : mode === 'find'
            ? 'Find'
            : mode === 'multi'
              ? 'Multi'
              : mode === 'time'
                ? 'Time'
                : null

  if (words.length === 0) {
    return (
      <div style={{ padding: '20px', maxWidth: '1100px' }}>
        <h2 style={{ color: '#f75475', marginBottom: '16px' }}>Quiz</h2>
        <p style={{ color: 'white' }}>No words to practice. Create a list first.</p>
        <button
          type="button"
          onClick={() => navigate('/create-list')}
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
          Create list
        </button>
      </div>
    )
  }

  const cardStyle = {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto 24px',
    padding: '32px',
    backgroundColor: 'rgba(30, 30, 30, 0.95)',
    borderLeft: '4px solid #f75475',
    borderRadius: '0 12px 12px 0',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  }

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1100px',
        flex: 1,
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <h2 style={{ color: '#f75475', marginBottom: '8px' }}>
        Quiz{modeLabel ? ` • ${modeLabel}` : ''}
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '24px' }}>
        {words.length} word{words.length !== 1 ? 's' : ''} loaded
      </p>

      <div style={cardStyle}>
        <div style={{ fontSize: '22px', fontWeight: '700', color: '#f75475', marginBottom: '10px' }}>
          This quiz will be added soon.
        </div>
        <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
          You selected <span style={{ color: '#fff', fontWeight: 600 }}>{modeLabel || 'a quiz mode'}</span>. We’ll add the full exercise here next.
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => navigate('/quiz-select', { state: { words } })}
          style={{
            padding: '14px 26px',
            backgroundColor: '#444',
            color: 'white',
            border: '1px solid #666',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => navigate('/my-lists')}
          style={{
            padding: '14px 26px',
            backgroundColor: '#f75475',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Back to My Lists
        </button>
      </div>
    </div>
  )
}

export default QuizPage
