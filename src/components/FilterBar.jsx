export default function FilterBar({
  seasons,
  season,
  onSeasonChange,
  players,
  playerId,
  onPlayerChange,
  showPlayer = true,
}) {
  return (
    <div className="toolbar">
      <div className="field">
        <label htmlFor="season-filter">Season</label>
        <select
          id="season-filter"
          value={season}
          onChange={(e) => onSeasonChange(e.target.value)}
        >
          <option value="all">All Seasons</option>
          {seasons.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {showPlayer && (
        <div className="field">
          <label htmlFor="player-filter">Player</label>
          <select
            id="player-filter"
            value={playerId}
            onChange={(e) => onPlayerChange(e.target.value)}
          >
            <option value="all">All Players</option>
            {players.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}
