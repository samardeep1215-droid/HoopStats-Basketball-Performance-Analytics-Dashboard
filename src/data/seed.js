export const SEASONS = ['2023-24', '2024-25', '2025-26']

export const players = [
  { id: 'p1', name: 'Marcus Reed', position: 'PG', jersey: 3, team: 'Riverside Hawks' },
  { id: 'p2', name: 'Andre Coleman', position: 'SG', jersey: 11, team: 'Riverside Hawks' },
  { id: 'p3', name: 'Devin Foster', position: 'SF', jersey: 24, team: 'Riverside Hawks' },
  { id: 'p4', name: 'Tobias Grant', position: 'PF', jersey: 33, team: 'Riverside Hawks' },
  { id: 'p5', name: 'Nikola Petrovic', position: 'C', jersey: 55, team: 'Riverside Hawks' },
]

const opponents = [
  'Northside Wolves',
  'Eastview Eagles',
  'Central Chargers',
  'Lakewood Lions',
  'Summit Storm',
  'Fairview Falcons',
]

const line = (season, opponent, date, stats) => ({
  season,
  opponent,
  date,
  ...stats,
})

export const games = [
  // p1 - Marcus Reed (floor general, efficient)
  line('2023-24', 'Northside Wolves', '2023-11-10', { playerId: 'p1', playerName: 'Marcus Reed', minutes: 32, points: 18, rebounds: 4, oreb: 1, dreb: 3, assists: 7, steals: 2, blocks: 0, turnovers: 3, fouls: 2, fgm: 7, fga: 14, fg3m: 2, fg3a: 6, ftm: 2, fta: 2 }),
  line('2023-24', 'Eastview Eagles', '2023-11-18', { playerId: 'p1', playerName: 'Marcus Reed', minutes: 30, points: 12, rebounds: 3, oreb: 0, dreb: 3, assists: 9, steals: 1, blocks: 0, turnovers: 4, fouls: 3, fgm: 4, fga: 11, fg3m: 1, fg3a: 5, ftm: 3, fta: 4 }),
  line('2023-24', 'Central Chargers', '2023-12-02', { playerId: 'p1', playerName: 'Marcus Reed', minutes: 35, points: 24, rebounds: 5, oreb: 1, dreb: 4, assists: 6, steals: 3, blocks: 0, turnovers: 2, fouls: 1, fgm: 9, fga: 16, fg3m: 4, fg3a: 8, ftm: 2, fta: 2 }),
  line('2024-25', 'Lakewood Lions', '2024-11-08', { playerId: 'p1', playerName: 'Marcus Reed', minutes: 34, points: 21, rebounds: 6, oreb: 2, dreb: 4, assists: 10, steals: 2, blocks: 1, turnovers: 3, fouls: 2, fgm: 8, fga: 15, fg3m: 3, fg3a: 7, ftm: 2, fta: 3 }),
  line('2024-25', 'Summit Storm', '2024-11-22', { playerId: 'p1', playerName: 'Marcus Reed', minutes: 36, points: 28, rebounds: 4, oreb: 0, dreb: 4, assists: 8, steals: 4, blocks: 0, turnovers: 2, fouls: 3, fgm: 10, fga: 17, fg3m: 5, fg3a: 9, ftm: 3, fta: 3 }),
  line('2024-25', 'Fairview Falcons', '2024-12-05', { playerId: 'p1', playerName: 'Marcus Reed', minutes: 33, points: 16, rebounds: 7, oreb: 1, dreb: 6, assists: 11, steals: 1, blocks: 0, turnovers: 5, fouls: 2, fgm: 6, fga: 12, fg3m: 2, fg3a: 6, ftm: 2, fta: 2 }),
  line('2025-26', 'Northside Wolves', '2025-11-14', { playerId: 'p1', playerName: 'Marcus Reed', minutes: 35, points: 26, rebounds: 5, oreb: 1, dreb: 4, assists: 12, steals: 3, blocks: 1, turnovers: 2, fouls: 1, fgm: 9, fga: 16, fg3m: 4, fg3a: 8, ftm: 4, fta: 4 }),
  line('2025-26', 'Eastview Eagles', '2025-11-28', { playerId: 'p1', playerName: 'Marcus Reed', minutes: 37, points: 31, rebounds: 6, oreb: 2, dreb: 4, assists: 9, steals: 2, blocks: 0, turnovers: 3, fouls: 2, fgm: 11, fga: 19, fg3m: 6, fg3a: 10, ftm: 3, fta: 4 }),

  // p2 - Andre Coleman (sharpshooter)
  line('2023-24', 'Northside Wolves', '2023-11-10', { playerId: 'p2', playerName: 'Andre Coleman', minutes: 28, points: 22, rebounds: 3, oreb: 0, dreb: 3, assists: 2, steals: 1, blocks: 0, turnovers: 1, fouls: 2, fgm: 7, fga: 15, fg3m: 6, fg3a: 12, ftm: 2, fta: 2 }),
  line('2023-24', 'Eastview Eagles', '2023-11-18', { playerId: 'p2', playerName: 'Andre Coleman', minutes: 26, points: 14, rebounds: 2, oreb: 1, dreb: 1, assists: 3, steals: 0, blocks: 0, turnovers: 2, fouls: 3, fgm: 5, fga: 13, fg3m: 3, fg3a: 9, ftm: 1, fta: 2 }),
  line('2024-25', 'Lakewood Lions', '2024-11-08', { playerId: 'p2', playerName: 'Andre Coleman', minutes: 31, points: 27, rebounds: 4, oreb: 0, dreb: 4, assists: 2, steals: 2, blocks: 1, turnovers: 1, fouls: 1, fgm: 9, fga: 18, fg3m: 7, fg3a: 13, ftm: 2, fta: 2 }),
  line('2024-25', 'Summit Storm', '2024-11-22', { playerId: 'p2', playerName: 'Andre Coleman', minutes: 29, points: 19, rebounds: 3, oreb: 1, dreb: 2, assists: 4, steals: 1, blocks: 0, turnovers: 2, fouls: 2, fgm: 6, fga: 14, fg3m: 4, fg3a: 10, ftm: 3, fta: 3 }),
  line('2025-26', 'Northside Wolves', '2025-11-14', { playerId: 'p2', playerName: 'Andre Coleman', minutes: 30, points: 29, rebounds: 5, oreb: 1, dreb: 4, assists: 3, steals: 3, blocks: 0, turnovers: 1, fouls: 2, fgm: 10, fga: 19, fg3m: 8, fg3a: 14, ftm: 1, fta: 1 }),
  line('2025-26', 'Central Chargers', '2025-12-06', { playerId: 'p2', playerName: 'Andre Coleman', minutes: 33, points: 35, rebounds: 6, oreb: 2, dreb: 4, assists: 2, steals: 1, blocks: 0, turnovers: 2, fouls: 3, fgm: 12, fga: 21, fg3m: 9, fg3a: 15, ftm: 2, fta: 2 }),

  // p3 - Devin Foster (all-around wing)
  line('2023-24', 'Central Chargers', '2023-12-02', { playerId: 'p3', playerName: 'Devin Foster', minutes: 33, points: 17, rebounds: 8, oreb: 2, dreb: 6, assists: 4, steals: 2, blocks: 1, turnovers: 3, fouls: 3, fgm: 6, fga: 12, fg3m: 1, fg3a: 4, ftm: 4, fta: 6 }),
  line('2024-25', 'Lakewood Lions', '2024-11-08', { playerId: 'p3', playerName: 'Devin Foster', minutes: 35, points: 20, rebounds: 9, oreb: 3, dreb: 6, assists: 5, steals: 1, blocks: 2, turnovers: 2, fouls: 2, fgm: 8, fga: 14, fg3m: 2, fg3a: 5, ftm: 2, fta: 4 }),
  line('2024-25', 'Fairview Falcons', '2024-12-05', { playerId: 'p3', playerName: 'Devin Foster', minutes: 34, points: 23, rebounds: 7, oreb: 1, dreb: 6, assists: 6, steals: 3, blocks: 1, turnovers: 4, fouls: 4, fgm: 9, fga: 15, fg3m: 3, fg3a: 6, ftm: 2, fta: 3 }),
  line('2025-26', 'Eastview Eagles', '2025-11-28', { playerId: 'p3', playerName: 'Devin Foster', minutes: 36, points: 27, rebounds: 11, oreb: 4, dreb: 7, assists: 6, steals: 2, blocks: 2, turnovers: 3, fouls: 2, fgm: 10, fga: 17, fg3m: 3, fg3a: 7, ftm: 4, fta: 5 }),

  // p4 - Tobias Grant (post scorer)
  line('2023-24', 'Eastview Eagles', '2023-11-18', { playerId: 'p4', playerName: 'Tobias Grant', minutes: 31, points: 19, rebounds: 12, oreb: 4, dreb: 8, assists: 2, steals: 1, blocks: 3, turnovers: 3, fouls: 4, fgm: 7, fga: 13, fg3m: 1, fg3a: 3, ftm: 4, fta: 7 }),
  line('2024-25', 'Summit Storm', '2024-11-22', { playerId: 'p4', playerName: 'Tobias Grant', minutes: 33, points: 24, rebounds: 14, oreb: 5, dreb: 9, assists: 3, steals: 0, blocks: 2, turnovers: 2, fouls: 3, fgm: 9, fga: 15, fg3m: 1, fg3a: 2, ftm: 5, fta: 8 }),
  line('2025-26', 'Central Chargers', '2025-12-06', { playerId: 'p4', playerName: 'Tobias Grant', minutes: 35, points: 28, rebounds: 16, oreb: 6, dreb: 10, assists: 4, steals: 2, blocks: 3, turnovers: 3, fouls: 4, fgm: 11, fga: 17, fg3m: 2, fg3a: 4, ftm: 4, fta: 6 }),

  // p5 - Nikola Petrovic (rim protector)
  line('2023-24', 'Central Chargers', '2023-12-02', { playerId: 'p5', playerName: 'Nikola Petrovic', minutes: 29, points: 13, rebounds: 13, oreb: 5, dreb: 8, assists: 1, steals: 0, blocks: 4, turnovers: 2, fouls: 5, fgm: 5, fga: 9, fg3m: 0, fg3a: 1, ftm: 3, fta: 5 }),
  line('2024-25', 'Fairview Falcons', '2024-12-05', { playerId: 'p5', playerName: 'Nikola Petrovic', minutes: 32, points: 16, rebounds: 15, oreb: 4, dreb: 11, assists: 2, steals: 1, blocks: 5, turnovers: 1, fouls: 4, fgm: 6, fga: 10, fg3m: 0, fg3a: 0, ftm: 4, fta: 6 }),
  line('2025-26', 'Eastview Eagles', '2025-11-28', { playerId: 'p5', playerName: 'Nikola Petrovic', minutes: 34, points: 18, rebounds: 17, oreb: 6, dreb: 11, assists: 3, steals: 2, blocks: 6, turnovers: 2, fouls: 3, fgm: 7, fga: 11, fg3m: 0, fg3a: 1, ftm: 4, fta: 7 }),
]
