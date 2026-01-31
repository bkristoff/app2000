// Results: final totals and winner announcement
import React, { useMemo } from "react";

export default function Results({ players, totals, onNewRound }) {
  const winnerIdx = useMemo(() => {
    if (!totals.length) return null;
    let min = Infinity;
    let idx = null;
    totals.forEach((t, i) => {
      if (Number.isFinite(t) && t < min) {
        min = t;
        idx = i;
      }
    });
    return idx;
  }, [totals]);

  return (
    <section className="card">
      <h2>Resultater</h2>
      <ul className="results">
        {players.map((p, i) => (
          <li key={i} className={i === winnerIdx ? "winner" : ""}>
            <span>{p.name}</span>
            <strong>{totals[i] ?? 0}</strong>
            {i === winnerIdx && <em>Vinner</em>}
          </li>
        ))}
      </ul>
      <div className="actions">
        <button onClick={onNewRound}>Start ny runde</button>
      </div>
    </section>
  );
}
