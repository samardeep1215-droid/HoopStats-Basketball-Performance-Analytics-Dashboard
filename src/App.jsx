import { useMemo, useState } from 'react'
import { StatsProvider, useStats } from './context/StatsProvider.jsx'
import Header from './components/Header.jsx'
import Dashboard from './components/Dashboard.jsx'
import GameLogForm from './components/GameLogForm.jsx'
import GamesTable from './components/GamesTable.jsx'
import SeasonTrends from './components/SeasonTrends.jsx'
import PlayerComparison from './components/PlayerComparison.jsx'

const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'log', label: 'Log Game' },
  { id: 'games', label: 'Game Log' },
  { id: 'trends', label: 'Season Trends' },
  { id: 'compare', label: 'Player Comparison' },
]

function Shell() {
  const { games, players, resetData } = useStats()
  const [tab, setTab] = useState('dashboard')
  const [season, setSeason] = useState('all')
  const [playerId, setPlayerId] = useState('all')

  const seasons = useMemo(
    () => [...new Set(games.map((g) => g.season))].sort(),
    [games],
  )

  return (
    <div className="app">
      <Header onReset={resetData} />

      <nav className="tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`tab${tab === t.id ? ' active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {tab === 'dashboard' && (
        <Dashboard
          games={games}
          players={players}
          seasons={seasons}
          season={season}
          playerId={playerId}
          onSeasonChange={setSeason}
          onPlayerChange={setPlayerId}
        />
      )}

      {tab === 'log' && (
        <GameLogForm
          players={players}
          seasons={seasons}
          onGoToLog={() => setTab('games')}
        />
      )}

      {tab === 'games' && (
        <GamesTable
          games={games}
          seasons={seasons}
          season={season}
          playerId={playerId}
          onSeasonChange={setSeason}
          onPlayerChange={setPlayerId}
        />
      )}

      {tab === 'trends' && (
        <SeasonTrends
          games={games}
          players={players}
          playerId={playerId}
          onPlayerChange={setPlayerId}
        />
      )}

      {tab === 'compare' && <PlayerComparison games={games} players={players} />}
    </div>
  )
}

export default function App() {
  return (
    <StatsProvider>
      <Shell />
    </StatsProvider>
  )
}
