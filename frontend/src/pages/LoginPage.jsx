import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!name.trim()) {
      setError('Name is required.')
      return
    }
    if (!password.trim()) {
      setError('Password is required.')
      return
    }
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || 'Login failed.')
        return
      }
      login(data.email, data.name)
      navigate('/')
    } catch (err) {
      setError('Network error. Please try again.')
    }
  }

  const formStyle = {
    width: '100%',
    maxWidth: '400px',
    padding: '24px',
    backgroundColor: 'rgba(30, 30, 30, 0.95)',
    borderRadius: '12px',
    borderLeft: '4px solid #f75475',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  }
  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    marginBottom: '16px',
    borderRadius: '8px',
    border: '1px solid #444',
    backgroundColor: '#1F1F1F',
    color: 'white',
    fontSize: '16px',
    boxSizing: 'border-box',
  }
  const labelStyle = { display: 'block', marginBottom: '6px', color: '#f75475', fontSize: '14px' }
  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#f75475',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
  }
  const linkRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    marginTop: '20px',
    flexWrap: 'wrap',
  }
  const linkStyle = { color: '#f75475', fontSize: '14px', textDecoration: 'none' }

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1100px',
        flex: 1,
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2 style={{ color: '#f75475', marginBottom: '24px' }}>Log in</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        {error && (
          <p style={{ color: '#f75475', marginBottom: '16px', fontSize: '14px' }}>{error}</p>
        )}
        <label style={labelStyle}>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          style={inputStyle}
          autoComplete="name"
        />
        <label style={labelStyle}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          style={inputStyle}
          autoComplete="current-password"
        />
        <button type="submit" style={buttonStyle}>
          Log in
        </button>
        <div style={linkRowStyle}>
          <Link to="/signin" style={linkStyle}>
            Sign in
          </Link>
          <Link to="/forgot-password" style={linkStyle}>
            Forget your password
          </Link>
        </div>
      </form>
      <Link to="/" style={{ color: '#f75475', marginTop: '24px', fontSize: '14px' }}>
        ← Back to home
      </Link>
    </div>
  )
}

export default LoginPage
