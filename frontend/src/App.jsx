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
      {/* Hamburger button - only when menu is closed */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="mobile-menu-button"
        style={{
          display: mobileMenuOpen ? 'none' : 'block',
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1001,
          backgroundColor: '#f75475',
          border: 'none',
          color: 'white',
          padding: '12px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '24px',
          boxShadow: '0 2px 8px rgba(247, 68, 128, 0.38)',
        }}
        aria-label="Open menu"
      >
        ☰
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
          borderRight: '2px solid #f75475',
          boxSizing: 'border-box',
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          zIndex: 1000,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginBottom: '8px',
          }}
        >
          <h2 style={{ color: '#f75475', fontSize: '26px', margin: 0 }}>Menu</h2>
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{
              backgroundColor: '#f75475',
              border: 'none',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '20px',
              flexShrink: 0,
            }}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <p style={{ color: '#f75475', marginTop: '16px', fontSize: '16px' }}>
          Create New List
        </p>
        <p style={{ color: '#f75475', marginTop: '16px', fontSize: '16px' }}>
          My Lists
        </p>
        <p style={{ color: '#f75475', marginTop: '16px', fontSize: '16px' }}>
          Instructions
        </p>
        <p style={{ color: '#f75475', marginTop: '16px', fontSize: '16px' }}>
          Other quizzes
        </p>
        <p style={{ color: '#f75475', marginTop: '16px', fontSize: '16px' }}>
        🛠️ Settings
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
            position: 'relative',
            backgroundColor: 'rgba(30, 30, 30, 0.95)',
            borderLeft: '4px solid #f75475',
            padding: '24px',
            borderRadius: '0 10px 10px 0',
            marginBottom: '32px',
            textAlign: 'center',
            width: '100%',
            maxWidth: '1100px',
            boxSizing: 'border-box',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <button
            className="login-button"
            style={{
              position: 'absolute',
              top: '20px',
              right: '24px',
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
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e8436a'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(247, 84, 117, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f75475'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(247, 84, 117, 0.4)'
            }}
          >
            Log in
          </button>
          <h1
            className="header-title"
            style={{ margin: 0, fontSize: '32px', color: '#f75475' }}
          >
            French Vocabulary Practice
          </h1>
          <h2
            className="header-subtitle"
            style={{
              margin: '8px 0 0',
              fontWeight: 'normal',
              fontSize: '18px',
              color: '#f75475',
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
            borderTop: '2px solid #f75475',
            textAlign: 'center',
          }}
        >
          <span style={{ color: '#f75475', fontSize: '14px' }}>
            Created by Ioanna Stamou
          </span>
        </footer>
      </div>
    </div>
  )
}

export default App
