import { useLocation, useNavigate } from 'react-router-dom'

const QUIZ_TYPES = [
  { id: 'matching', label: 'Matching', logo: '/matching_logo.png' },
  { id: 'write', label: 'Write', logo: '/write_logo.png' },
  { id: 'select', label: 'Select', logo: '/select_logo.png' },
  { id: 'find', label: 'Find', logo: '/find_logo.png' },
  { id: 'multi', label: 'Multi', logo: '/multi_logo.png' },
  { id: 'time', label: 'Time', logo: '/time_logo.png' },
]

function QuizSelectPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const words = location.state?.words || []

  const handleChoose = (mode) => {
    if (mode === 'matching') {
      navigate('/quiz/matching', { state: { words, listId: location.state?.listId, list: location.state?.list } })
      return
    }
    navigate('/quiz', { state: { words, mode } })
  }

  if (words.length === 0) {
    return (
      <div style={{ padding: '20px', maxWidth: '1100px' }}>
        <h2 style={{ color: '#f75475', marginBottom: '16px' }}>Choose quiz type</h2>
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

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1100px',
        flex: 1,
        padding: '24px 20px 40px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(30, 30, 30, 0.95)',
          borderLeft: '4px solid #f75475',
          borderRadius: '0 12px 12px 0',
          padding: '28px 32px',
          marginBottom: '28px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        <h2 style={{ color: '#f75475', margin: '0 0 6px', fontSize: '26px' }}>Choose quiz type</h2>
        <p style={{ color: 'rgba(255,255,255,0.75)', margin: 0, fontSize: '15px' }}>
          {words.length} word{words.length !== 1 ? 's' : ''} in this list — pick a mode to start
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          maxWidth: '560px',
          margin: '0 auto',
        }}
      >
        {QUIZ_TYPES.map(({ id, label, logo }) => (
          <button
            key={id}
            type="button"
            onClick={() => handleChoose(id)}
            className="quiz-type-btn"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
              padding: '24px 16px',
              backgroundColor: 'rgba(26, 26, 26, 0.95)',
              border: '2px solid rgba(247, 84, 117, 0.5)',
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'border-color 0.2s, background-color 0.2s, transform 0.2s',
            }}
          >
            <div
              style={{
                width: '88px',
                height: '88px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                padding: '10px',
                flexShrink: 0,
              }}
            >
              <img
                src={logo}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <span style={{ color: '#fff', fontWeight: '600', fontSize: '15px', textAlign: 'center' }}>
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuizSelectPage
