import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { games as seedGames, players as seedPlayers } from '../data/seed.js'

const STORAGE_KEY = 'hoopstats.games.v1'

const StatsContext = createContext(null)

const loadGames = () => {
  if (typeof window === 'undefined') return seedGames
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedGames
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length ? parsed : seedGames
  } catch {
    return seedGames
  }
}

export function StatsProvider({ children }) {
  const [games, setGames] = useState(loadGames)
  const [players, setPlayers] = useState(seedPlayers)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(games))
  }, [games])

  const addGame = (game) => {
    setGames((prev) => [...prev, game])
  }

  const removeGame = (id) => {
    setGames((prev) => prev.filter((g) => g.id !== id))
  }

  const resetData = () => setGames(seedGames)

  const addPlayer = (player) => {
    setPlayers((prev) => [...prev, player])
  }

  const value = useMemo(
    () => ({ games, players, addGame, removeGame, resetData, addPlayer }),
    [games, players],
  )

  return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>
}

export function useStats() {
  const ctx = useContext(StatsContext)
  if (!ctx) throw new Error('useStats must be used within a StatsProvider')
  return ctx
}
