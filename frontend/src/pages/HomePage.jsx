import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function HomePage() {
  const { user, logout, isAuthenticated } = useAuth()

  const buttonStyle = {
    backgroundColor: '#f75475',
    color: 'white',
    border: 'none',
    padding: '12px 28px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(247, 84, 117, 0.4)',
    transition: 'all 0.2s ease',
    letterSpacing: '0.5px',
    textDecoration: 'none',
    display: 'inline-block',
  }

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1100px',
        flex: 1,
        padding: '10px 20px 40px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {isAuthenticated ? (
        <>
          <p style={{ color: 'white', textAlign: 'center', marginBottom: '24px' }}>
            Welcome, {user.name}. Create your lists and practice your French.
          </p>
          <button
            className="logout-button"
            style={buttonStyle}
            onClick={logout}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e8436a'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f75475'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <p style={{ color: 'white', textAlign: 'center', marginBottom: '24px' }}>
            Welcome. Log in to create your own lists and practice your French.
          </p>
          <Link
            to="/login"
            className="login-button"
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e8436a'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f75475'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Log in
          </Link>
        </>
      )}
    </div>
  )
}

export default HomePage
