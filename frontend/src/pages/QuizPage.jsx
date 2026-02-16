import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function QuizPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const words = location.state?.words || []

  const [index, setIndex] = useState(0)
  const [showTranslation, setShowTranslation] = useState(false)

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

  const current = words[index]
  const isLast = index === words.length - 1

  const handleNext = () => {
    if (isLast) {
      navigate('/create-list')
      return
    }
    setIndex((i) => i + 1)
    setShowTranslation(false)
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
      <h2 style={{ color: '#f75475', marginBottom: '8px' }}>Quiz</h2>
      <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '24px' }}>
        Word {index + 1} of {words.length}
      </p>

      <div style={cardStyle}>
        <div style={{ fontSize: '28px', fontWeight: '600', color: '#f75475', marginBottom: '16px' }}>
          {current.french || '(no French word)'}
        </div>
        {showTranslation ? (
          <div style={{ fontSize: '20px', color: 'white' }}>{current.translation || '—'}</div>
        ) : (
          <button
            type="button"
            onClick={() => setShowTranslation(true)}
            style={{
              padding: '12px 24px',
              backgroundColor: 'rgba(247, 84, 117, 0.3)',
              color: 'white',
              border: '1px solid #f75475',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Show translation
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={handleNext}
        style={{
          padding: '14px 32px',
          backgroundColor: '#f75475',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          fontSize: '18px',
          fontWeight: '600',
          cursor: 'pointer',
        }}
      >
        {isLast ? 'Finish' : 'Next'}
      </button>
    </div>
  )
}

export default QuizPage
