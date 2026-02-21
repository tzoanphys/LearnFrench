import { useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ROUNDS_TOTAL = 10
const WORDS_PER_ROUND = 4
const MASTERY_COUNT = 10

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickRandomFromPool(pool, n) {
  if (pool.length <= n) return shuffle(pool)
  const indices = new Set()
  while (indices.size < n) indices.add(Math.floor(Math.random() * pool.length))
  return shuffle(Array.from(indices).map((i) => pool[i]))
}

function MatchingQuizPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const words = (location.state?.words || []).filter((w) => (w.french || '').trim() && (w.translation || '').trim())

  const [currentRound, setCurrentRound] = useState(0)
  const [roundWords, setRoundWords] = useState([]) // [{ french, translation, wordIndex }, ...]
  const [leftOrder, setLeftOrder] = useState([])   // indices into roundWords
  const [rightOrder, setRightOrder] = useState([])
  const [matchedPairs, setMatchedPairs] = useState(new Set()) // 'leftIdx-rightIdx'
  const [selectedLeft, setSelectedLeft] = useState(null)
  const [selectedRight, setSelectedRight] = useState(null)
  const [correctCount, setCorrectCount] = useState({}) // wordIndex -> count
  const [pool, setPool] = useState([]) // indices of words with correctCount < 10
  const [gameOver, setGameOver] = useState(false)
  const [roundsCorrect, setRoundsCorrect] = useState(0) // how many rounds were 4/4

  const buildPool = useCallback((wordsList, counts) => {
    return wordsList.map((_, i) => i).filter((i) => (counts[i] || 0) < MASTERY_COUNT)
  }, [])

  const startRound = useCallback((wordsList, counts) => {
    const currentPool = buildPool(wordsList, counts)
    if (currentPool.length === 0) {
      setGameOver(true)
      return
    }
    const picked = pickRandomFromPool(currentPool, Math.min(WORDS_PER_ROUND, currentPool.length))
    const rw = picked.map((idx) => ({
      french: wordsList[idx].french.trim(),
      translation: wordsList[idx].translation.trim(),
      wordIndex: idx,
    }))
    setRoundWords(rw)
    setLeftOrder(shuffle(rw.map((_, i) => i)))
    setRightOrder(shuffle(rw.map((_, i) => i)))
    setMatchedPairs(new Set())
    setSelectedLeft(null)
    setSelectedRight(null)
  }, [buildPool])

  useEffect(() => {
    if (words.length < 4) return
    const counts = {}
    setCorrectCount(counts)
    setPool(buildPool(words, counts))
    startRound(words, counts)
  }, [words.length])


  const handleLeftClick = (leftPos) => {
    if (Array.from(matchedPairs).some((p) => p.startsWith(leftPos + '-'))) return
    setSelectedLeft(leftPos)
    setSelectedRight(null)
  }

  const handleRightClick = (rightPos) => {
    if (Array.from(matchedPairs).some((p) => p.endsWith('-' + rightPos))) return
    if (selectedLeft === null) return
    const leftRoundIdx = leftOrder[selectedLeft]
    const rightRoundIdx = rightOrder[rightPos]
    const isCorrect = leftRoundIdx === rightRoundIdx
    if (isCorrect) {
      setMatchedPairs((prev) => new Set([...prev, `${selectedLeft}-${rightPos}`]))
      setSelectedLeft(null)
      setSelectedRight(null)
    } else {
      setSelectedLeft(null)
      setSelectedRight(null)
    }
  }

  useEffect(() => {
    if (roundWords.length === 0 || matchedPairs.size < roundWords.length) return
    const newCounts = { ...correctCount }
    roundWords.forEach((w) => {
      newCounts[w.wordIndex] = (newCounts[w.wordIndex] || 0) + 1
    })
    setCorrectCount(newCounts)
    const nextRound = currentRound + 1
    const wasFullRound = roundWords.length === WORDS_PER_ROUND
    if (wasFullRound) setRoundsCorrect((r) => r + 1)
    if (nextRound >= ROUNDS_TOTAL) {
      setGameOver(true)
      return
    }
    const nextPool = buildPool(words, newCounts)
    if (nextPool.length === 0) {
      setGameOver(true)
      return
    }
    setCurrentRound(nextRound)
    setPool(nextPool)
    startRound(words, newCounts)
  }, [matchedPairs.size, roundWords.length])

  const handleReplay = () => {
    setCurrentRound(0)
    setCorrectCount({})
    setRoundsCorrect(0)
    setGameOver(false)
    setPool(words.map((_, i) => i))
    startRound(words, {})
  }

  if (words.length < 4) {
    return (
      <div style={{ padding: '20px', maxWidth: '1100px' }}>
        <h2 style={{ color: '#f75475', marginBottom: '16px' }}>Matching quiz</h2>
        <p style={{ color: 'white' }}>Add at least 4 words to your list to play.</p>
        <button
          type="button"
          onClick={() => navigate('/quiz-select', { state: { words: location.state?.words || [] } })}
          style={{
            marginTop: '16px',
            padding: '12px 24px',
            backgroundColor: '#f75475',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Back
        </button>
      </div>
    )
  }

  if (gameOver) {
    return (
      <div style={{ padding: '20px', maxWidth: '1100px' }}>
        <h2 style={{ color: '#f75475', marginBottom: '16px' }}>Matching quiz — Game over</h2>
        <p style={{ color: 'white', fontSize: '18px', marginBottom: '24px' }}>
          Score: <strong>{roundsCorrect}/{ROUNDS_TOTAL}</strong> rounds
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleReplay}
            style={{
              padding: '14px 28px',
              backgroundColor: '#f75475',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Replay
          </button>
          <button
            type="button"
            onClick={() => navigate('/quiz-select', { state: { words } })}
            style={{
              padding: '14px 28px',
              backgroundColor: '#444',
              color: 'white',
              border: '1px solid #666',
              borderRadius: '10px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Back to quiz types
          </button>
        </div>
      </div>
    )
  }

  const isLeftMatched = (leftPos) =>
    Array.from(matchedPairs).some((p) => p.startsWith(leftPos + '-'))
  const isRightMatched = (rightPos) =>
    Array.from(matchedPairs).some((p) => p.endsWith('-' + rightPos))

  const boxStyle = (selected, matched) => ({
    padding: '14px 18px',
    marginBottom: '10px',
    borderRadius: '10px',
    border: selected ? '2px solid #f75475' : '2px solid #444',
    backgroundColor: matched ? 'rgba(0,128,0,0.2)' : 'rgba(30,30,30,0.95)',
    color: 'white',
    cursor: matched ? 'default' : 'pointer',
    textAlign: 'center',
    fontSize: '16px',
  })

  return (
    <div style={{ width: '100%', maxWidth: '1100px', flex: 1, padding: '20px', boxSizing: 'border-box' }}>
      <h2 style={{ color: '#f75475', marginBottom: '8px' }}>Matching quiz</h2>
      <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '20px' }}>
        Round {currentRound + 1} of {ROUNDS_TOTAL} — Match each French word with its translation.
      </p>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ minWidth: '200px', flex: 1, maxWidth: '280px' }}>
          <div style={{ color: '#f75475', marginBottom: '10px', fontWeight: '600' }}>French</div>
          {leftOrder.map((orderIdx, leftPos) => {
            const w = roundWords[orderIdx]
            if (!w) return null
            const matched = isLeftMatched(leftPos)
            return (
              <div
                key={'l-' + leftPos}
                role="button"
                tabIndex={0}
                onClick={() => handleLeftClick(leftPos)}
                onKeyDown={(e) => e.key === 'Enter' && handleLeftClick(leftPos)}
                style={boxStyle(selectedLeft === leftPos, matched)}
              >
                {w.french}
              </div>
            )
          })}
        </div>
        <div style={{ minWidth: '200px', flex: 1, maxWidth: '280px' }}>
          <div style={{ color: '#f75475', marginBottom: '10px', fontWeight: '600' }}>Translation</div>
          {rightOrder.map((orderIdx, rightPos) => {
            const w = roundWords[orderIdx]
            if (!w) return null
            const matched = isRightMatched(rightPos)
            return (
              <div
                key={'r-' + rightPos}
                role="button"
                tabIndex={0}
                onClick={() => handleRightClick(rightPos)}
                onKeyDown={(e) => e.key === 'Enter' && handleRightClick(rightPos)}
                style={boxStyle(selectedRight === rightPos, matched)}
              >
                {w.translation}
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ marginTop: '24px', display: 'flex', gap: '16px' }}>
        <button
          type="button"
          onClick={() => navigate('/quiz-select', { state: { words } })}
          style={{
            padding: '12px 24px',
            backgroundColor: '#444',
            color: 'white',
            border: '1px solid #666',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default MatchingQuizPage
