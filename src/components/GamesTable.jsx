import { useMemo } from 'react'
import FilterBar from './FilterBar.jsx'
import { useStats } from '../context/StatsProvider.jsx'
import {
  filterByPlayer,
  filterBySeason,
  formatPct,
  gameScore,
  shootingPct,
  sortByDate,
  totalRebounds,
} from '../utils/stats.js'

export default function GamesTable({
  games,
  seasons,
  season,
  playerId,
  onSeasonChange,
  onPlayerChange,
}) {
  const { players, removeGame } = useStats()

  const rows = useMemo(
    () =>
      sortByDate(filterByPlayer(filterBySeason(games, season), playerId)).reverse(),
    [games, season, playerId],
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

      <section className="card">
        <h3>Game Log</h3>
        <p className="card-sub">
          Per-game breakdown of every logged performance ({rows.length} games)
        </p>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Player</th>
                <th>Opp</th>
                <th>MIN</th>
                <th>PTS</th>
                <th>REB</th>
                <th>AST</th>
                <th>STL</th>
                <th>BLK</th>
                <th>TO</th>
                <th>FG</th>
                <th>3P</th>
                <th>FT</th>
                <th>FG%</th>
                <th>GmSc</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((g) => (
                <tr key={g.id ?? `${g.playerId}-${g.date}-${g.opponent}`}>
                  <td>{g.date}</td>
                  <td>{g.playerName}</td>
                  <td className="pos">{g.opponent}</td>
                  <td>{g.minutes}</td>
                  <td style={{ fontWeight: 800 }}>{g.points}</td>
                  <td>{totalRebounds(g)}</td>
                  <td>{g.assists}</td>
                  <td>{g.steals}</td>
                  <td>{g.blocks}</td>
                  <td>{g.turnovers}</td>
                  <td>
                    {g.fgm}-{g.fga}
                  </td>
                  <td>
                    {g.fg3m}-{g.fg3a}
                  </td>
                  <td>
                    {g.ftm}-{g.fta}
                  </td>
                  <td>{formatPct(shootingPct(g.fgm, g.fga))}</td>
                  <td>{gameScore(g).toFixed(1)}</td>
                  <td>
                    <button
                      className="btn ghost"
                      style={{ padding: '4px 10px', fontSize: 12 }}
                      onClick={() => removeGame(g.id)}
                      title="Delete game"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
              {!rows.length && (
                <tr>
                  <td colSpan={16} className="empty">
                    No games logged yet. Head to “Log Game” to add one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
