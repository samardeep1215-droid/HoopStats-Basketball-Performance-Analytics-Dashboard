import { formatPct } from '../utils/stats.js'

const KPI = ({ label, value, unit, sub }) => (
  <div className="card kpi">
    <span className="label">{label}</span>
    <span className="value">
      {value}
      {unit && <small> {unit}</small>}
    </span>
    {sub && <span className="delta">{sub}</span>}
  </div>
)

export default function KpiCards({ agg, label = 'Player' }) {
  const sub = `${agg.games} game${agg.games === 1 ? '' : 's'} logged`

  return (
    <div className="grid kpi-grid">
      <KPI label="Games" value={agg.games} />
      <KPI label="Points / Game" value={agg.ppg.toFixed(1)} sub={sub} />
      <KPI label="Rebounds / Game" value={agg.rpg.toFixed(1)} />
      <KPI label="Assists / Game" value={agg.apg.toFixed(1)} />
      <KPI label="Field Goal %" value={formatPct(agg.fgPct)} />
      <KPI label="3-Point %" value={formatPct(agg.fg3Pct)} />
      <KPI label="Free Throw %" value={formatPct(agg.ftPct)} />
      <KPI label="True Shooting %" value={formatPct(agg.tsPct)} />
    </div>
  )
}
