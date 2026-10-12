import { useMemo } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import FilterBar from './FilterBar.jsx'
import KpiCards from './KpiCards.jsx'
import {
  aggregate,
  filterByPlayer,
  filterBySeason,
  leaderboard,
  perGameSeries,
  sortByDate,
} from '../utils/stats.js'

export default function Dashboard({
  games,
  players,
  seasons,
  season,
  playerId,
  onSeasonChange,
  onPlayerChange,
}) {
  const scoped = useMemo(
    () => filterByPlayer(filterBySeason(games, season), playerId),
    [games, season, playerId],
  )

  const agg = useMemo(() => aggregate(scoped), [scoped])
  const board = useMemo(
    () => leaderboard(filterBySeason(games, season)),
    [games, season],
  )
  const trend = useMemo(() => perGameSeries(scoped), [scoped])
  const recent = useMemo(
    () => sortByDate(scoped).slice(-6).reverse(),
    [scoped],
  )

  return (
    <>
      <FilterBar
        seasons={seasons}
        season={season}
        onSeasonChange={onSeasonChange}
        players={players}
        playerId={playerId}
        onPlayerChange={onPlayerChange}
      />

      <KpiCards agg={agg} label={playerId === 'all' ? 'Team' : 'Player'} />

      <div className="two-col">
        <section className="card span-2">
          <h3>Scoring & Playmaking Trend</h3>
          <p className="card-sub">
            {playerId === 'all'
              ? 'Team output per game across the selected season'
              : 'Per-game output over the selected season'}
          </p>
          {trend.length ? (
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={trend} margin={{ top: 6, right: 12, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="gPoints" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gAst" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#263049" vertical={false} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip
                  labelFormatter={(l, p) =>
                    p?.[0] ? `${l} · vs ${p[0].payload.opponent}` : l
                  }
                />
                <Area
                  type="monotone"
                  dataKey="points"
                  stroke="#f97316"
                  strokeWidth={2.5}
                  fill="url(#gPoints)"
                  name="Points"
                />
                <Area
                  type="monotone"
                  dataKey="assists"
                  stroke="#38bdf8"
                  strokeWidth={2.5}
                  fill="url(#gAst)"
                  name="Assists"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty">No games match the current filters.</div>
          )}
        </section>

        <section className="card">
          <h3>Top Scorers {season !== 'all' ? `· ${season}` : ''}</h3>
          <p className="card-sub">Ranked by points per game</p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Player</th>
                  <th>GP</th>
                  <th>PPG</th>
                  <th>RPG</th>
                  <th>APG</th>
                  <th>FG%</th>
                </tr>
              </thead>
              <tbody>
                {board.map((row, i) => (
                  <tr key={row.playerId}>
                    <td>
                      <span className={`rank${i === 0 ? ' gold' : ''}`}>
                        {i + 1}
                      </span>
                    </td>
                    <td>{row.playerName}</td>
                    <td>{row.games}</td>
                    <td style={{ fontWeight: 800 }}>{row.ppg.toFixed(1)}</td>
                    <td>{row.rpg.toFixed(1)}</td>
                    <td>{row.apg.toFixed(1)}</td>
                    <td>{(row.fgPct * 100).toFixed(1)}%</td>
                  </tr>
                ))}
                {!board.length && (
                  <tr>
                    <td colSpan={7} className="empty">
                      No data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="card">
          <h3>Recent Games</h3>
          <p className="card-sub">Latest performances</p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Player</th>
                  <th>Opp</th>
                  <th>PTS</th>
                  <th>REB</th>
                  <th>AST</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((g) => (
                  <tr key={g.id ?? `${g.playerId}-${g.date}`}>
                    <td>{g.date}</td>
                    <td>{g.playerName}</td>
                    <td className="pos">{g.opponent}</td>
                    <td style={{ fontWeight: 800 }}>{g.points}</td>
                    <td>{Number(g.oreb || 0) + Number(g.dreb || 0)}</td>
                    <td>{g.assists}</td>
                  </tr>
                ))}
                {!recent.length && (
                  <tr>
                    <td colSpan={6} className="empty">
                      No games
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  )
}
