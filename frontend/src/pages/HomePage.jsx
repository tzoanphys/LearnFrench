function HomePage() {
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
      <p style={{ color: 'white', textAlign: 'center', marginBottom: '24px' }}>
        Welcome. You can log in to create your own lists and practice your French.
      </p>
      <button
        className="login-button"
        style={{
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
    </div>
  )
}

export default HomePage
