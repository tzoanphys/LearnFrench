import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getLists, deleteList } from '../utils/listStorage'

function MyListsPage() {
  const navigate = useNavigate()
  const [lists, setLists] = useState([])

  useEffect(() => {
    setLists(getLists())
  }, [])

  const handleDelete = (id, listTitle) => {
    if (!window.confirm(`Delete list "${listTitle}"?`)) return
    deleteList(id)
    setLists(getLists())
  }

  const handleModify = (list) => {
    navigate('/create-list', { state: { editList: list } })
  }

  const handleStartQuiz = (list) => {
    const words = list.words?.filter((w) => w.french?.trim() || w.translation?.trim()) || []
    if (words.length === 0) {
      alert('This list has no words.')
      return
    }
    navigate('/quiz', { state: { words } })
  }

  const handleSeeProgress = (list) => {
    navigate('/list-progress', { state: { list } })
  }

  const cardStyle = {
    backgroundColor: 'rgba(30, 30, 30, 0.95)',
    borderLeft: '4px solid #f75475',
    borderRadius: '0 10px 10px 0',
    padding: '20px',
    marginBottom: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  }
  const buttonStyle = {
    padding: '8px 16px',
    marginRight: '8px',
    marginTop: '8px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    border: 'none',
  }

  if (lists.length === 0) {
    return (
      <div style={{ width: '100%', maxWidth: '1100px', flex: 1, padding: '20px 20px 40px', boxSizing: 'border-box' }}>
        <h2 style={{ color: '#f75475', marginBottom: '16px' }}>My Lists</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '20px' }}>You have no saved lists yet.</p>
        <Link
          to="/create-list"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#f75475',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '10px',
            fontWeight: '600',
          }}
        >
          Create your first list
        </Link>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: '1100px', flex: 1, padding: '20px 20px 40px', boxSizing: 'border-box' }}>
      <h2 style={{ color: '#f75475', marginBottom: '24px' }}>My Lists</h2>

      {lists.map((list) => (
        <div key={list.id} style={cardStyle}>
          <h3 style={{ margin: '0 0 8px', color: 'white', fontSize: '20px' }}>{list.title || 'Untitled list'}</h3>
          <p style={{ margin: '0 0 16px', color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
            {list.words?.length ?? 0} word{list.words?.length !== 1 ? 's' : ''}
          </p>
          <div style={{ flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => handleStartQuiz(list)}
              style={{ ...buttonStyle, backgroundColor: '#f75475', color: 'white' }}
            >
              Start quiz
            </button>
            <button
              type="button"
              onClick={() => handleModify(list)}
              style={{ ...buttonStyle, backgroundColor: '#444', color: 'white', border: '1px solid #666' }}
            >
              Modify list
            </button>
            <button
              type="button"
              onClick={() => handleSeeProgress(list)}
              style={{ ...buttonStyle, backgroundColor: 'rgba(247, 84, 117, 0.3)', color: 'white', border: '1px solid #f75475' }}
            >
              See progress
            </button>
            <button
              type="button"
              onClick={() => handleDelete(list.id, list.title)}
              style={{ ...buttonStyle, backgroundColor: 'transparent', color: '#f75475', border: '1px solid #f75475' }}
            >
              Delete list
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyListsPage
