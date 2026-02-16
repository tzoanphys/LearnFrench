import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MIN_WORDS = 1
const MAX_WORDS = 50
const DEFAULT_COUNT = 1
const DRAFT_LIST_KEY = 'learnFrench_draft_list'

function CreateListPage() {
  const navigate = useNavigate()
  const [wordCount, setWordCount] = useState(DEFAULT_COUNT)
  const [words, setWords] = useState(() =>
    Array.from({ length: DEFAULT_COUNT }, () => ({ french: '', translation: '' }))
  )

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_LIST_KEY)
      if (raw) {
        const { wordCount: savedCount, words: savedWords } = JSON.parse(raw)
        if (savedCount >= MIN_WORDS && savedCount <= MAX_WORDS && Array.isArray(savedWords) && savedWords.length === savedCount) {
          setWordCount(savedCount)
          setWords(savedWords)
        }
      }
    } catch (_) {}
  }, [])

  const handleCountChange = (e) => {
    const n = Math.min(MAX_WORDS, Math.max(MIN_WORDS, parseInt(e.target.value, 10) || MIN_WORDS))
    setWordCount(n)
    setWords((prev) => {
      if (n > prev.length) {
        return [...prev, ...Array.from({ length: n - prev.length }, () => ({ french: '', translation: '' }))]
      }
      return prev.slice(0, n)
    })
  }

  const updateWord = (index, field, value) => {
    setWords((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const handleSave = () => {
    try {
      localStorage.setItem(DRAFT_LIST_KEY, JSON.stringify({ wordCount, words }))
      alert('List saved.')
    } catch (e) {
      alert('Could not save.')
    }
  }

  const handleStart = () => {
    const list = words.filter((w) => w.french.trim() || w.translation.trim())
    if (list.length === 0) {
      alert('Please add at least one word (French or translation).')
      return
    }
    navigate('/quiz', { state: { words: list } })
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
          How many words do you want to learn?
        </label>
        <input
          type="number"
          min={MIN_WORDS}
          max={MAX_WORDS}
          value={wordCount}
          onChange={handleCountChange}
          style={{ ...inputStyle, width: '100px' }}
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
          style={{
            padding: '14px 32px',
            backgroundColor: '#f75475',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '18px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Start
        </button>
      </div>
    </div>
  )
}

export default CreateListPage
