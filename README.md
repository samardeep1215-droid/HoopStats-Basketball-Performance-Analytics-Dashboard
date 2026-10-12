# 🏀 HoopStats — Basketball Performance Analytics Dashboard

A coach- and player-friendly dashboard for logging games and turning raw box
scores into actionable insight. Track **points, rebounds, assists, steals,
blocks, turnovers and shooting percentages**, follow **season-wise trends**,
compare players head-to-head, and drill into **per-game breakdowns** to spot
strengths and weak areas.

Built around first-hand competitive basketball experience for real-world
usability.

## ✨ Features

- **Log games** — record a full box score (minutes, points, OREB/DREB, assists,
  steals, blocks, turnovers, fouls, FG/3PT/FT made & attempted). Shooting
  percentages are derived automatically.
- **Dashboard KPIs** — games played, PPG, RPG, APG, FG%, 3P%, FT% and True
  Shooting %, with a live scoring/playmaking trend chart.
- **Per-game breakdowns** — a sortable game log with FG/3PT/FT splits and a
  Hollinger **Game Score** for every performance.
- **Season-wise trend charts** — track any metric (PPG, RPG, APG, FG%, 3P%,
  TS%, Game Score) across every season, one line per player, with a team
  average reference line.
- **Player comparison** — head-to-head bars plus a normalized skill radar
  (scoring, rebounding, playmaking, efficiency, range, defense).
- **Top scorers leaderboard** and recent-games feed.
- **Local persistence** — games are saved in `localStorage`; reset to the
  bundled sample season at any time.

## 🧱 Tech Stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Recharts](https://recharts.org/) for trend, line, area and radar charts
- Plain CSS (custom dark sports theme)

## 🚀 Getting Started

```bash
npm install
npm run dev        # start the dev server (http://localhost:5173)
```

Build and preview a production bundle:

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── App.jsx                     # App shell + tab navigation + filters
├── main.jsx                    # React entry point
├── index.css                   # Theme & layout
├── context/
│   └── StatsProvider.jsx       # Game store with localStorage persistence
├── data/
│   └── seed.js                 # Sample players, seasons and games
├── utils/
│   └── stats.js                # Aggregation & advanced-metric helpers
└── components/
    ├── Header.jsx
    ├── FilterBar.jsx
    ├── KpiCards.jsx
    ├── Dashboard.jsx           # KPIs, trends, leaderboard, recent games
    ├── GameLogForm.jsx         # Log a game
    ├── GamesTable.jsx          # Per-game breakdown table
    ├── SeasonTrends.jsx        # Season-wise trend charts
    └── PlayerComparison.jsx    # Head-to-head + skill radar
```

## 📊 Metrics Reference

| Metric | Formula |
| --- | --- |
| FG% | FGM / FGA |
| 3P% | 3PM / 3PA |
| FT% | FTM / FTA |
| eFG% | (FGM + 0.5·3PM) / FGA |
| TS% | PTS / (2·(FGA + 0.44·FTA)) |
| Game Score | PTS + 0.4·FGM − 0.7·FGA − 0.4·(FTA−FTM) + 0.7·OREB + 0.3·DREB + STL + 0.7·AST + 0.7·BLK − 0.4·PF − TOV |

## 🗺️ Roadmap

- CSV / JSON import & export
- Team-level standings and win/loss tracking
- Shot charts and heat maps
- Multi-user accounts and a backend API

## 📄 License

MIT
