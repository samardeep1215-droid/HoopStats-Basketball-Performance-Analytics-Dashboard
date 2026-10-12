const toNumber = (value) => {
  const n = Number(value)
  return Number.isFinite(n) ? n : 0
}

const safeDiv = (num, den) => (den > 0 ? num / den : 0)

export const shootingPct = (made, attempted) =>
  safeDiv(toNumber(made), toNumber(attempted))

export const effectiveFieldGoalPct = (fgm, fg3m, fga) =>
  safeDiv(toNumber(fgm) + 0.5 * toNumber(fg3m), toNumber(fga))

export const trueShootingPct = (points, fga, fta) =>
  safeDiv(toNumber(points), 2 * (toNumber(fga) + 0.44 * toNumber(fta)))

export const gameScore = (line) => {
  const {
    points = 0,
    fgm = 0,
    fga = 0,
    ftm = 0,
    fta = 0,
    oreb = 0,
    dreb = 0,
    steals = 0,
    assists = 0,
    blocks = 0,
    fouls = 0,
    turnovers = 0,
  } = line
  return (
    toNumber(points) +
    0.4 * toNumber(fgm) -
    0.7 * toNumber(fga) -
    0.4 * (toNumber(fta) - toNumber(ftm)) +
    0.7 * toNumber(oreb) +
    0.3 * toNumber(dreb) +
    toNumber(steals) +
    0.7 * toNumber(assists) +
    0.7 * toNumber(blocks) -
    0.4 * toNumber(fouls) -
    toNumber(turnovers)
  )
}

export const totalRebounds = (line) =>
  toNumber(line.oreb) + toNumber(line.dreb)

export const round = (value, digits = 2) => {
  if (!Number.isFinite(value)) return 0
  const factor = 10 ** digits
  return Math.round(value * factor) / factor
}

export const formatPct = (value, digits = 1) =>
  `${(toNumber(value) * 100).toFixed(digits)}%`

export const formatAvg = (value, digits = 1) =>
  toNumber(value).toFixed(digits)

export const sortByDate = (games) =>
  [...games].sort((a, b) => new Date(a.date) - new Date(b.date))

export const filterBySeason = (games, season) =>
  season === 'all' ? games : games.filter((g) => g.season === season)

export const filterByPlayer = (games, playerId) =>
  playerId === 'all' ? games : games.filter((g) => g.playerId === playerId)

const sum = (games, key) =>
  games.reduce((acc, g) => acc + toNumber(g[key]), 0)

export const aggregate = (games) => {
  const totals = {
    games: games.length,
    points: sum(games, 'points'),
    rebounds: games.reduce((a, g) => a + totalRebounds(g), 0),
    assists: sum(games, 'assists'),
    steals: sum(games, 'steals'),
    blocks: sum(games, 'blocks'),
    turnovers: sum(games, 'turnovers'),
    fgm: sum(games, 'fgm'),
    fga: sum(games, 'fga'),
    fg3m: sum(games, 'fg3m'),
    fg3a: sum(games, 'fg3a'),
    ftm: sum(games, 'ftm'),
    fta: sum(games, 'fta'),
    minutes: sum(games, 'minutes'),
  }

  const gp = totals.games || 1

  return {
    ...totals,
    ppg: totals.points / gp,
    rpg: totals.rebounds / gp,
    apg: totals.assists / gp,
    spg: totals.steals / gp,
    bpg: totals.blocks / gp,
    topg: totals.turnovers / gp,
    mpg: totals.minutes / gp,
    fgPct: shootingPct(totals.fgm, totals.fga),
    fg3Pct: shootingPct(totals.fg3m, totals.fg3a),
    ftPct: shootingPct(totals.ftm, totals.fta),
    efgPct: effectiveFieldGoalPct(totals.fgm, totals.fg3m, totals.fga),
    tsPct: trueShootingPct(totals.points, totals.fga, totals.fta),
  }
}

export const perGameSeries = (games) =>
  sortByDate(games).map((g, index) => ({
    label: `G${index + 1}`,
    date: g.date,
    opponent: g.opponent,
    points: toNumber(g.points),
    rebounds: totalRebounds(g),
    assists: toNumber(g.assists),
    gameScore: round(gameScore(g), 1),
    fgPct: round(shootingPct(g.fgm, g.fga) * 100, 1),
    fg3Pct: round(shootingPct(g.fg3m, g.fg3a) * 100, 1),
    ftPct: round(shootingPct(g.ftm, g.fta) * 100, 1),
  }))

export const seasonTrendSeries = (games, playerId = 'all') => {
  const bySeason = new Map()

  games.forEach((g) => {
    if (playerId !== 'all' && g.playerId !== playerId) return
    if (!bySeason.has(g.season)) bySeason.set(g.season, [])
    bySeason.get(g.season).push(g)
  })

  return [...bySeason.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([season, seasonGames]) => {
      const agg = aggregate(seasonGames)
      return {
        season,
        games: agg.games,
        ppg: round(agg.ppg, 1),
        rpg: round(agg.rpg, 1),
        apg: round(agg.apg, 1),
        fgPct: round(agg.fgPct * 100, 1),
        fg3Pct: round(agg.fg3Pct * 100, 1),
        tsPct: round(agg.tsPct * 100, 1),
        avgGameScore: round(
          seasonGames.reduce((a, g) => a + gameScore(g), 0) / seasonGames.length,
          1,
        ),
      }
    })
}

export const leaderboard = (games) => {
  const byPlayer = new Map()
  games.forEach((g) => {
    if (!byPlayer.has(g.playerId)) byPlayer.set(g.playerId, [])
    byPlayer.get(g.playerId).push(g)
  })

  return [...byPlayer.entries()]
    .map(([playerId, playerGames]) => ({
      playerId,
      playerName: playerGames[0]?.playerName ?? playerId,
      ...aggregate(playerGames),
    }))
    .sort((a, b) => b.ppg - a.ppg)
}
