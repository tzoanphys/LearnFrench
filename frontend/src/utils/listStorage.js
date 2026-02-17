const LISTS_KEY = 'learnFrench_lists'

export function getLists() {
  try {
    const raw = localStorage.getItem(LISTS_KEY)
    if (!raw) return []
    const list = JSON.parse(raw)
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

export function saveLists(lists) {
  localStorage.setItem(LISTS_KEY, JSON.stringify(lists))
}

export function createList(title, words) {
  const lists = getLists()
  const id = String(Date.now())
  const list = { id, title: title.trim() || 'My First List', words, createdAt: new Date().toISOString() }
  lists.push(list)
  saveLists(lists)
  return list
}

export function updateList(id, title, words) {
  const lists = getLists()
  const index = lists.findIndex((l) => l.id === id)
  if (index === -1) return null
  lists[index] = { ...lists[index], title: title.trim() || lists[index].title, words, updatedAt: new Date().toISOString() }
  saveLists(lists)
  return lists[index]
}

export function deleteList(id) {
  const lists = getLists().filter((l) => l.id !== id)
  saveLists(lists)
}

export function getListById(id) {
  return getLists().find((l) => l.id === id) ?? null
}
