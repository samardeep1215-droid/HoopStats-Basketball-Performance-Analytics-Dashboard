import { useMemo, useState } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts'
import FilterBar from './FilterBar.jsx'
import { seasonTrendSeries } from '../utils/stats.js'

const METRICS = [
  { key: 'ppg', label: 'Points / Game', suffix: '' },
  { key: 'rpg', label: 'Rebounds / Game', suffix: '' },
  { key: 'apg', label: 'Assists / Game', suffix: '' },
  { key: 'fgPct', label: 'Field Goal %', suffix: '%' },
  { key: 'fg3Pct', label: '3-Point %', suffix: '%' },
  { key: 'tsPct', label: 'True Shooting %', suffix: '%' },
  { key: 'avgGameScore', label: 'Avg Game Score', suffix: '' },
]

const COLORS = ['#f97316', '#38bdf8', '#34d399', '#a78bfa', '#f87171', '#facc15']

export default function SeasonTrends({ games, players, playerId, onPlayerChange }) {
  const [metric, setMetric] = useState('ppg')

  const seasons = useMemo(
    () => [...new Set(games.map((g) => g.season))].sort(),
    [games],
  )

  const selectedPlayers = useMemo(
    () => (playerId === 'all' ? players : players.filter((p) => p.id === playerId)),
    [players, playerId],
  )

  const chartData = useMemo(() => {
    const bySeason = new Map()

    selectedPlayers.forEach((player) => {
      seasonTrendSeries(games, player.id).forEach((row) => {
        const key = row.season
        if (!bySeason.has(key)) bySeason.set(key, { season: key })
        bySeason.get(key)[player.id] = row[metric]
      })
    })

    const merged = [...bySeason.values()].sort((a, b) =>
      a.season.localeCompare(b.season),
    )
    // Season-average team line when viewing everyone
    if (playerId === 'all') {
      merged.forEach((row) => {
        const values = selectedPlayers
          .map((p) => row[p.id])
          .filter((v) => typeof v === 'number')
        row.__team = values.length
          ? Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10
          : null
      })
    }
    return merged
  }, [games, selectedPlayers, metric, playerId])

  const activeMetric = METRICS.find((m) => m.key === metric)

  const tableRows = useMemo(() => {
    if (playerId === 'all') return []
    return seasonTrendSeries(games, playerId)
  }, [games, playerId])

  return (
    <>
      <FilterBar
        seasons={seasons}
        season="all"
        onSeasonChange={() => {}}
        players={players}
        playerId={playerId}
        onPlayerChange={onPlayerChange}
      />

      <section className="card">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <div>
            <h3 style={{ margin: 0 }}>Season-Wise Trends</h3>
            <p className="card-sub" style={{ margin: '6px 0 14px' }}>
              {activeMetric.label} across every season on record
            </p>
          </div>
          <div className="field">
            <label htmlFor="metric">Metric</label>
            <select
              id="metric"
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
            >
              {METRICS.map((m) => (
                <option key={m.key} value={m.key}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {chartData.length ? (
          <ResponsiveContainer width="100%" height={320}>
            <LineChart
              data={chartData}
              margin={{ top: 8, right: 16, left: -16, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#263049" vertical={false} />
              <XAxis dataKey="season" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip
                formatter={(v) => (v == null ? '—' : `${v}${activeMetric.suffix}`)}
              />
              <Legend />
              {selectedPlayers.map((p, i) => (
                <Line
                  key={p.id}
                  type="monotone"
                  dataKey={p.id}
                  name={p.name}
                  stroke={COLORS[i % COLORS.length]}
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  connectNulls
                />
              ))}
              {playerId === 'all' && (
                <Line
                  type="monotone"
                  dataKey="__team"
                  name="Team Average"
                  stroke="#94a3b8"
                  strokeDasharray="5 4"
                  strokeWidth={2}
                  dot={false}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="empty">No season data available.</div>
        )}
      </section>

      {playerId !== 'all' && (
        <section className="card" style={{ marginTop: 16 }}>
          <h3>Season-by-Season Breakdown</h3>
          <p className="card-sub">
            {players.find((p) => p.id === playerId)?.name} · season averages
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Season</th>
                  <th>GP</th>
                  <th>PPG</th>
                  <th>RPG</th>
                  <th>APG</th>
                  <th>FG%</th>
                  <th>3P%</th>
                  <th>TS%</th>
                  <th>GmSc</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((r) => (
                  <tr key={r.season}>
                    <td>
                      <span className="pill">{r.season}</span>
                    </td>
                    <td>{r.games}</td>
                    <td style={{ fontWeight: 800 }}>{r.ppg}</td>
                    <td>{r.rpg}</td>
                    <td>{r.apg}</td>
                    <td>{r.fgPct}%</td>
                    <td>{r.fg3Pct}%</td>
                    <td>{r.tsPct}%</td>
                    <td>{r.avgGameScore}</td>
                  </tr>
                ))}
                {!tableRows.length && (
                  <tr>
                    <td colSpan={9} className="empty">
                      No seasons on record for this player.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  )
}
