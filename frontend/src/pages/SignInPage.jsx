import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function SignInPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!name.trim()) {
      setError('Name is required.')
      return
    }
    if (!email.trim()) {
      setError('Email is required.')
      return
    }
    if (!password.trim()) {
      setError('Password is required.')
      return
    }
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || 'Registration failed.')
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
      <h2 style={{ color: '#f75475', marginBottom: '24px' }}>Sign in</h2>
      <p style={{ color: '#aaa', marginBottom: '16px', fontSize: '14px' }}>
        Create a new account. Name, email and password are required.
      </p>
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
        <label style={labelStyle}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={inputStyle}
          autoComplete="email"
        />
        <label style={labelStyle}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          style={inputStyle}
          autoComplete="new-password"
        />
        <button type="submit" style={buttonStyle}>
          Sign in
        </button>
      </form>
      <Link to="/login" style={{ color: '#f75475', marginTop: '24px', fontSize: '14px' }}>
        ← Back to log in
      </Link>
    </div>
  )
}

export default SignInPage
