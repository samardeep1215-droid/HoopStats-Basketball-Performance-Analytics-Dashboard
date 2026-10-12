import { useState } from 'react'
import { useStats } from '../context/StatsProvider.jsx'

const today = () => new Date().toISOString().slice(0, 10)

const emptyForm = (defaultSeason) => ({
  playerId: '',
  date: today(),
  season: defaultSeason || `${new Date().getFullYear()}-${String(
    (new Date().getFullYear() + 1) % 100,
  ).padStart(2, '0')}`,
  opponent: '',
  minutes: '',
  points: '',
  oreb: '',
  dreb: '',
  assists: '',
  steals: '',
  blocks: '',
  turnovers: '',
  fouls: '',
  fgm: '',
  fga: '',
  fg3m: '',
  fg3a: '',
  ftm: '',
  fta: '',
})

const newId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `g-${Date.now()}-${Math.random().toString(16).slice(2)}`

export default function GameLogForm({ players, seasons, onGoToLog }) {
  const { addGame } = useStats()
  const [form, setForm] = useState(() => emptyForm(seasons[seasons.length - 1]))
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(null)

  const update = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const numberKeys = [
    ['minutes', 'Minutes'],
    ['points', 'Points'],
    ['oreb', 'Off. Rebounds'],
    ['dreb', 'Def. Rebounds'],
    ['assists', 'Assists'],
    ['steals', 'Steals'],
    ['blocks', 'Blocks'],
    ['turnovers', 'Turnovers'],
    ['fouls', 'Fouls'],
    ['fgm', 'FG Made'],
    ['fga', 'FG Attempted'],
    ['fg3m', '3PT Made'],
    ['fg3a', '3PT Attempted'],
    ['ftm', 'FT Made'],
    ['fta', 'FT Attempted'],
  ]

  const submit = (e) => {
    e.preventDefault()
    setError('')
    setSaved(null)

    const player = players.find((p) => p.id === form.playerId)
    if (!player) return setError('Please choose a player.')
    if (!form.opponent.trim()) return setError('Please enter an opponent.')
    if (!form.date) return setError('Please choose a game date.')

    const made = Number(form.fgm || 0)
    const attempted = Number(form.fga || 0)
    if (attempted > 0 && made > attempted)
      return setError('Field goals made cannot exceed attempts.')
    if (Number(form.fg3m || 0) > Number(form.fg3a || 0))
      return setError('3-pointers made cannot exceed attempts.')
    if (Number(form.ftm || 0) > Number(form.fta || 0))
      return setError('Free throws made cannot exceed attempts.')

    const game = {
      id: newId(),
      playerId: player.id,
      playerName: player.name,
      date: form.date,
      season: form.season.trim(),
      opponent: form.opponent.trim(),
    }
    numberKeys.forEach(([key]) => {
      game[key] = Number(form[key] || 0)
    })

    addGame(game)
    setSaved(`${player.name} · ${game.points} PTS vs ${game.opponent}`)
    setForm((prev) => ({ ...emptyForm(prev.season), playerId: player.id }))
  }

  return (
    <>
      <section className="card">
        <h3>Log a Game</h3>
        <p className="card-sub">
          Record a player's performance to update trends, averages, and
          comparisons.
        </p>

        <form onSubmit={submit}>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="f-player">Player</label>
              <select id="f-player" value={form.playerId} onChange={update('playerId')}>
                <option value="">Select player…</option>
                {players.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} · {p.position}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="f-date">Date</label>
              <input id="f-date" type="date" value={form.date} onChange={update('date')} />
            </div>

            <div className="field">
              <label htmlFor="f-season">Season</label>
              <input
                id="f-season"
                type="text"
                placeholder="2025-26"
                value={form.season}
                onChange={update('season')}
              />
            </div>

            <div className="field">
              <label htmlFor="f-opp">Opponent</label>
              <input
                id="f-opp"
                type="text"
                placeholder="Northside Wolves"
                value={form.opponent}
                onChange={update('opponent')}
              />
            </div>

            {numberKeys.map(([key, label]) => (
              <div className="field" key={key}>
                <label htmlFor={`f-${key}`}>{label}</label>
                <input
                  id={`f-${key}`}
                  type="number"
                  min="0"
                  inputMode="numeric"
                  placeholder="0"
                  value={form[key]}
                  onChange={update(key)}
                />
              </div>
            ))}
          </div>

          {error && (
            <p style={{ color: 'var(--red)', marginTop: 16, fontSize: 13 }}>
              {error}
            </p>
          )}
          {saved && (
            <p style={{ color: 'var(--green)', marginTop: 16, fontSize: 13 }}>
              Saved: {saved}
            </p>
          )}

          <div className="form-actions">
            <button className="btn primary" type="submit">
              Save Game
            </button>
            <button
              className="btn ghost"
              type="button"
              onClick={() => {
                setForm(emptyForm(seasons[seasons.length - 1]))
                setError('')
                setSaved(null)
              }}
            >
              Clear
            </button>
            {onGoToLog && (
              <button className="btn ghost" type="button" onClick={onGoToLog}>
                View Game Log →
              </button>
            )}
          </div>

          <p className="hint" style={{ marginTop: 14 }}>
            Tip: shooting percentages are calculated automatically from
            made/attempted totals.
          </p>
        </form>
      </section>
    </>
  )
}
