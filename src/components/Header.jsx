export default function Header({ onReset }) {
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-logo" aria-hidden="true">
          🏀
        </div>
        <div>
          <h1>HoopStats</h1>
          <p>Basketball Performance Analytics Dashboard</p>
        </div>
      </div>
      <div className="header-actions">
        <button
          className="btn ghost"
          onClick={() => {
            if (window.confirm('Reset all logged games back to sample data?')) {
              onReset()
            }
          }}
        >
          Reset sample data
        </button>
      </div>
    </header>
  )
}
