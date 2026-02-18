import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { createList, updateList } from '../utils/listStorage'

const MIN_WORDS = 1
const MAX_WORDS = 50
const DEFAULT_COUNT = 1
const DEFAULT_TITLE = 'My First List'
const DRAFT_LIST_KEY = 'learnFrench_draft_list'

function CreateListPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const editList = location.state?.editList

  const [title, setTitle] = useState(DEFAULT_TITLE)
  const [wordCount, setWordCount] = useState(DEFAULT_COUNT)
  const [wordCountInput, setWordCountInput] = useState(String(DEFAULT_COUNT))
  const [words, setWords] = useState(() =>
    Array.from({ length: DEFAULT_COUNT }, () => ({ french: '', translation: '' }))
  )
  const [hasBeenSaved, setHasBeenSaved] = useState(false)

  useEffect(() => {
    if (editList?.id) {
      setTitle(editList.title || DEFAULT_TITLE)
      const w = editList.words?.length ? editList.words : [{ french: '', translation: '' }]
      setWordCount(w.length)
      setWordCountInput(String(w.length))
      setWords(w)
      return
    }
    try {
      const raw = localStorage.getItem(DRAFT_LIST_KEY)
      if (raw) {
        const data = JSON.parse(raw)
        if (data.title != null) setTitle(data.title)
        const savedCount = data.wordCount
        const savedWords = data.words
        if (savedCount >= MIN_WORDS && savedCount <= MAX_WORDS && Array.isArray(savedWords) && savedWords.length === savedCount) {
          setWordCount(savedCount)
          setWordCountInput(String(savedCount))
          setWords(savedWords)
        }
      }
    } catch (_) {}
  }, [editList?.id])

  const handleCountChange = (e) => {
    setHasBeenSaved(false)
    const raw = e.target.value.replace(/\D/g, '')
    setWordCountInput(raw)
    if (raw === '') return
    const n = Math.min(MAX_WORDS, Math.max(MIN_WORDS, parseInt(raw, 10)))
    if (Number.isNaN(n)) return
    setWordCount(n)
    setWords((prev) => {
      if (n > prev.length) {
        return [...prev, ...Array.from({ length: n - prev.length }, () => ({ french: '', translation: '' }))]
      }
      return prev.slice(0, n)
    })
  }

  const handleCountBlur = () => {
    const trimmed = wordCountInput.trim()
    if (trimmed === '') {
      setWordCountInput(String(wordCount))
      return
    }
    const n = Math.min(MAX_WORDS, Math.max(MIN_WORDS, parseInt(trimmed, 10) || MIN_WORDS))
    setHasBeenSaved(false)
    setWordCountInput(String(n))
    setWordCount(n)
    setWords((prev) => {
      if (n > prev.length) {
        return [...prev, ...Array.from({ length: n - prev.length }, () => ({ french: '', translation: '' }))]
      }
      return prev.slice(0, n)
    })
  }

  const updateWord = (index, field, value) => {
    setHasBeenSaved(false)
    setWords((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const handleSave = () => {
    const listWords = words.filter((w) => w.french.trim() || w.translation.trim())
    if (listWords.length === 0) {
      alert('Please add at least one word (French or translation).')
      return
    }
    try {
      if (editList?.id) {
        updateList(editList.id, title, listWords)
        alert('List updated.')
      } else {
        createList(title, listWords)
        alert('List created.')
      }
      setHasBeenSaved(true)
    } catch (e) {
      alert('Could not save.')
    }
  }

  const handleStart = () => {
    if (!hasBeenSaved) return
    const list = words.filter((w) => w.french.trim() || w.translation.trim())
    if (list.length === 0) {
      alert('Please add at least one word (French or translation).')
      return
    }
    navigate('/quiz-select', { state: { words: list } })
  }

  const formStyle = {
    width: '100%',
    maxWidth: '1100px',
    flex: 1,
    padding: '10px 20px 40px',
    boxSizing: 'border-box',
  }
  const inputStyle = {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #444',
    backgroundColor: '#1F1F1F',
    color: 'white',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
  }
  const thStyle = {
    textAlign: 'left',
    padding: '12px 14px',
    backgroundColor: 'rgba(247, 84, 117, 0.2)',
    color: '#f75475',
    borderBottom: '2px solid #f75475',
    fontWeight: '600',
  }
  const tdStyle = {
    padding: '10px 14px',
    borderBottom: '1px solid #333',
    verticalAlign: 'middle',
  }
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    borderRadius: '10px',
    overflow: 'hidden',
  }

  return (
    <div style={formStyle}>
      <h2 style={{ color: '#f75475', marginBottom: '24px' }}>Create New List</h2>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', color: '#f75475', marginBottom: '8px', fontWeight: '600' }}>
          List title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => { setHasBeenSaved(false); setTitle(e.target.value); }}
          placeholder={DEFAULT_TITLE}
          style={{ ...inputStyle, maxWidth: '400px' }}
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', color: '#f75475', marginBottom: '8px', fontWeight: '600' }}>
          How many words do you want to learn?
        </label>
        <input
          type="text"
          inputMode="numeric"
          minLength={1}
          maxLength={2}
          value={wordCountInput}
          onChange={handleCountChange}
          onBlur={handleCountBlur}
          style={{ ...inputStyle, width: '100px' }}
          aria-label="Number of words"
        />
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginTop: '8px' }}>
          Between {MIN_WORDS} and {MAX_WORDS}. Translation can be in any script: Latin, Greek, Cyrillic, Kanji, Hiragana, Korean, etc.
        </p>
      </div>

      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={{ ...thStyle, width: '50%' }}>French</th>
              <th style={thStyle}>Translation (your language)</th>
            </tr>
          </thead>
          <tbody>
            {words.map((row, index) => (
              <tr key={index}>
                <td style={tdStyle}>
                  <input
                    type="text"
                    value={row.french}
                    onChange={(e) => updateWord(index, 'french', e.target.value)}
                    placeholder="French word"
                    style={inputStyle}
                    lang="fr"
                  />
                </td>
                <td style={tdStyle}>
                  <input
                    type="text"
                    value={row.translation}
                    onChange={(e) => updateWord(index, 'translation', e.target.value)}
                    placeholder="Your translation"
                    style={inputStyle}
                    lang="auto"
                    dir="auto"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={handleSave}
          style={{
            padding: '14px 32px',
            backgroundColor: '#444',
            color: 'white',
            border: '1px solid #666',
            borderRadius: '10px',
            fontSize: '18px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleStart}
          disabled={!hasBeenSaved}
          style={{
            padding: '14px 32px',
            backgroundColor: hasBeenSaved ? '#f75475' : '#555',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '18px',
            fontWeight: '600',
            cursor: hasBeenSaved ? 'pointer' : 'not-allowed',
            opacity: hasBeenSaved ? 1 : 0.7,
          }}
        >
          Start
        </button>
      </div>
    </div>
  )
}

export default CreateListPage
