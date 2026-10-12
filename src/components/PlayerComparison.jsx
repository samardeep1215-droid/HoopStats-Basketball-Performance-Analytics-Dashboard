import { useMemo, useState } from 'react'
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from 'recharts'
import { aggregate, filterBySeason } from '../utils/stats.js'

const COLOR_A = '#f97316'
const COLOR_B = '#38bdf8'

const ROWS = [
  { key: 'ppg', label: 'Points / Game', digits: 1 },
  { key: 'rpg', label: 'Rebounds / Game', digits: 1 },
  { key: 'apg', label: 'Assists / Game', digits: 1 },
  { key: 'spg', label: 'Steals / Game', digits: 1 },
  { key: 'bpg', label: 'Blocks / Game', digits: 1 },
  { key: 'fgPct', label: 'Field Goal %', pct: true },
  { key: 'fg3Pct', label: '3-Point %', pct: true },
  { key: 'ftPct', label: 'Free Throw %', pct: true },
  { key: 'tsPct', label: 'True Shooting %', pct: true },
]

export default function PlayerComparison({ games, players }) {
  const seasons = useMemo(
    () => [...new Set(games.map((g) => g.season))].sort(),
    [games],
  )
  const [season, setSeason] = useState('all')
  const [aId, setAId] = useState(players[0]?.id ?? '')
  const [bId, setBId] = useState(players[1]?.id ?? '')

  const statFor = (playerId) =>
    aggregate(filterBySeason(games, season).filter((g) => g.playerId === playerId))

  const a = useMemo(() => statFor(aId), [games, season, aId])
  const b = useMemo(() => statFor(bId), [games, season, bId])

  const playerA = players.find((p) => p.id === aId)
  const playerB = players.find((p) => p.id === bId)

  const display = (row, agg) => {
    const v = agg[row.key]
    if (row.pct) return `${(v * 100).toFixed(1)}%`
    return v.toFixed(row.digits)
  }

  const radarData = useMemo(() => {
    const keys = [
      { key: 'ppg', label: 'Scoring' },
      { key: 'rpg', label: 'Rebounding' },
      { key: 'apg', label: 'Playmaking' },
      { key: 'fgPct', label: 'Efficiency' },
      { key: 'fg3Pct', label: 'Range' },
      { key: 'spg', label: 'Defense' },
    ]
    return keys.map(({ key, label }) => {
      const va = Number(a[key]) || 0
      const vb = Number(b[key]) || 0
      const max = Math.max(va, vb, 0.0001)
      return {
        label,
        A: Math.round((va / max) * 100),
        B: Math.round((vb / max) * 100),
      }
    })
  }, [a, b])

  const PlayerSelect = ({ value, onChange, id }) => (
    <div className="field">
      <label htmlFor={id}>Player</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {players.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name} · {p.position}
          </option>
        ))}
      </select>
    </div>
  )

  return (
    <>
      <div className="toolbar">
        <div className="field">
          <label htmlFor="cmp-season">Season</label>
          <select
            id="cmp-season"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          >
            <option value="all">All Seasons</option>
            {seasons.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <PlayerSelect id="cmp-a" value={aId} onChange={setAId} />
        <PlayerSelect id="cmp-b" value={bId} onChange={setBId} />
      </div>

      <div className="two-col">
        <section className="card">
          <h3>Head-to-Head</h3>
          <p className="card-sub">
            {season === 'all' ? 'Career totals' : `${season} season`} · per-game
            averages
          </p>

          <div className="legend">
            <span>
              <i className="dot" style={{ background: COLOR_A }} /> {playerA?.name}
            </span>
            <span>
              <i className="dot" style={{ background: COLOR_B }} /> {playerB?.name}
            </span>
          </div>

          <div className="stat-compare">
            {ROWS.map((row) => {
              const va = Number(a[row.key]) || 0
              const vb = Number(b[row.key]) || 0
              const max = Math.max(va, vb, 0.0001)
              return (
                <div className="compare-row" key={row.key}>
                  <span className="num name">{display(row, a)}</span>
                  <div className="bar-track">
                    <span
                      className="bar-a"
                      style={{ width: `${(va / max) * 100}%` }}
                    />
                  </div>
                  <span className="mid">{row.label}</span>
                  <div className="bar-track">
                    <span
                      className="bar-b"
                      style={{ width: `${(vb / max) * 100}%` }}
                    />
                  </div>
                  <span className="num right">{display(row, b)}</span>
                </div>
              )
            })}
          </div>

          <div className="badge-row" style={{ marginTop: 18 }}>
            <span className="pill">{a.games} games · {playerA?.name}</span>
            <span className="pill">{b.games} games · {playerB?.name}</span>
          </div>
        </section>

        <section className="card">
          <h3>Skill Profile</h3>
          <p className="card-sub">
            Normalized against the better of the two players (100 = edge)
          </p>
          <ResponsiveContainer width="100%" height={340}>
            <RadarChart data={radarData} outerRadius="72%">
              <PolarGrid stroke="#263049" />
              <PolarAngleAxis dataKey="label" tick={{ fill: '#94a0bd', fontSize: 12 }} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name={playerA?.name}
                dataKey="A"
                stroke={COLOR_A}
                fill={COLOR_A}
                fillOpacity={0.35}
              />
              <Radar
                name={playerB?.name}
                dataKey="B"
                stroke={COLOR_B}
                fill={COLOR_B}
                fillOpacity={0.35}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </section>
      </div>
    </>
  )
}
