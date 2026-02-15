import { useState } from 'react'
import { Link, Routes, Route, Outlet } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import CreateListPage from './pages/CreateListPage'
import MyListsPage from './pages/MyListsPage'
import InstructionsPage from './pages/InstructionsPage'
import OtherQuizzesPage from './pages/OtherQuizzesPage'
import SettingsPage from './pages/SettingsPage'

const sidebarLinkStyle = {
  color: '#f75475',
  marginTop: '16px',
  fontSize: '16px',
  textDecoration: 'none',
  display: 'block',
  padding: '8px 0',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'opacity 0.2s ease',
}

function LayoutWithSidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()

  const closeMenu = () => setMobileMenuOpen(false)

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
          onClick={closeMenu}
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
            onClick={closeMenu}
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
        <Link to="/" style={sidebarLinkStyle} onClick={closeMenu}>
        🏠 Home
        </Link>
        <Link to="/create-list" style={sidebarLinkStyle} onClick={closeMenu}>
          Create New List
        </Link>
        <Link to="/my-lists" style={sidebarLinkStyle} onClick={closeMenu}>
          My Lists
        </Link>
        <Link to="/instructions" style={sidebarLinkStyle} onClick={closeMenu}>
          Instructions
        </Link>
        <Link to="/other-quizzes" style={sidebarLinkStyle} onClick={closeMenu}>
          Other quizzes
        </Link>
        <Link to="/settings" style={sidebarLinkStyle} onClick={closeMenu}>
          🛠️ Settings
        </Link>
        {isAuthenticated ? (
          <button
            onClick={() => { closeMenu(); logout(); }}
            style={{
              ...sidebarLinkStyle,
              marginTop: '24px',
              background: 'none',
              border: 'none',
              textAlign: 'left',
            }}
          >
            Log out
          </button>
        ) : (
          <Link to="/login" style={sidebarLinkStyle} onClick={closeMenu}>
            Log in
          </Link>
        )}
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
        {/* Header - pink-red panel with white text (like second photo) */}
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

        {/* Page content (each route renders here) */}
        <Outlet />

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

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutWithSidebar />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="create-list" element={<CreateListPage />} />
        <Route path="my-lists" element={<MyListsPage />} />
        <Route path="instructions" element={<InstructionsPage />} />
        <Route path="other-quizzes" element={<OtherQuizzesPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}

export default App
