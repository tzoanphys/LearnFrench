import { useState } from 'react'
import './App.css'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#1F1F1F',
        color: 'white',
        fontFamily: 'inherit',
        fontSize: '18px',
      }}
    >
      {/* Menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="mobile-menu-button"
        style={{
          display: 'block',
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1001,
          backgroundColor: '#00F5C4',
          border: 'none',
          color: '#111',
          padding: '12px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '24px',
          boxShadow: '0 2px 8px rgba(0, 245, 196, 0.3)',
        }}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 999,
          }}
        />
      )}

      {/* Sidebar */}
      <div
        className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}
        style={{
          width: '280px',
          backgroundColor: '#111',
          padding: '24px 20px',
          borderRight: '2px solid #00857A',
          boxSizing: 'border-box',
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          zIndex: 1000,
        }}
      >
        <h2 style={{ color: '#00F5C4', fontSize: '26px', margin: 0 }}>Menu</h2>
        <p style={{ color: '#00F5C4', marginTop: '16px', fontSize: '16px' }}>
          Learn French — coming soon
        </p>
      </div>

      {/* Main area */}
      <div
        className="main-content"
        style={{
          flex: 1,
          padding: '40px 60px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing: 'border-box',
          minHeight: '100vh',
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: '#00857A',
            padding: '24px',
            borderRadius: '10px',
            marginBottom: '32px',
            textAlign: 'center',
            width: '100%',
            maxWidth: '1100px',
            boxSizing: 'border-box',
          }}
        >
          <h1
            className="header-title"
            style={{ margin: 0, fontSize: '32px', color: 'white' }}
          >
            French Vocabulary Practice
          </h1>
          <h2
            className="header-subtitle"
            style={{
              margin: '8px 0 0',
              fontWeight: 'normal',
              fontSize: '18px',
              color: '#00F5C4',
            }}
          >
            Practice • Quizzes • Audio
          </h2>
        </div>

        {/* Content area */}
        <div
          style={{
            width: '100%',
            maxWidth: '1100px',
            flex: 1,
            padding: '10px 20px 40px',
            boxSizing: 'border-box',
          }}
        >
          <p style={{ color: 'white', textAlign: 'center' }}>
            Welcome. Your French learning app content will go here.
          </p>
        </div>

        {/* Footer */}
        <footer
          style={{
            width: '100%',
            maxWidth: '1100px',
            marginTop: 'auto',
            padding: '24px 20px',
            borderTop: '2px solid #00F5C4',
            textAlign: 'center',
          }}
        >
          <span style={{ color: '#00F5C4', fontSize: '14px' }}>
            Created by Ioanna Stamou
          </span>
        </footer>
      </div>
    </div>
  )
}

export default App
