const MATCHING_PROGRESS_KEY = 'learnFrench_matching_progress'
const MATCHING_MAX_PERCENT = 25
const CORRECT_PER_MAX = 10 // 10 correct matches = 25%

export function getMatchingProgress(listId) {
  try {
    const raw = localStorage.getItem(MATCHING_PROGRESS_KEY)
    if (!raw) return {}
    const all = JSON.parse(raw)
    return all[listId] || {}
  } catch {
    return {}
  }
}

export function saveMatchingProgress(listId, wordProgress) {
  try {
    const raw = localStorage.getItem(MATCHING_PROGRESS_KEY)
    const all = raw ? JSON.parse(raw) : {}
    all[listId] = wordProgress
    localStorage.setItem(MATCHING_PROGRESS_KEY, JSON.stringify(all))
  } catch (_) {}
}

export function addMatchingGameResult(listId, correctCountByWordIndex) {
  const current = getMatchingProgress(listId)
  const next = { ...current }
  Object.entries(correctCountByWordIndex).forEach(([wordIndex, add]) => {
    const key = String(wordIndex)
    next[key] = (Number(next[key]) || 0) + add
  })
  saveMatchingProgress(listId, next)
}

export function matchingPercent(totalCorrect) {
  return Math.min(MATCHING_MAX_PERCENT, (totalCorrect / CORRECT_PER_MAX) * MATCHING_MAX_PERCENT)
}

export { MATCHING_MAX_PERCENT }
