// Round: per-hole stroke input, live totals, finish/reset actions
import React from "react";

export default function Round({
  players,
  holes,
  scores,
  totals,
  onScoresChange,
  onFinish,
  onReset,
}) {
  const updateScore = (holeIdx, playerIdx, value) => {
    const n = Number(value);
    if (!Number.isInteger(n) || n < 0) return; // validate integer >= 0
    const next = scores.map((row, rIdx) =>
      rIdx === holeIdx
        ? row.map((v, cIdx) => (cIdx === playerIdx ? n : v))
        : row,
    );
    onScoresChange(next);
  };

  const allFilled =
    scores.length === holes &&
    scores.every((row) => row.every((v) => Number.isInteger(v) && v >= 0));

  return (
    <section className="card">
      <h2>Runde</h2>
      <div className="scroll">
        <table className="score-table">
          <thead>
            <tr>
              <th>Kurv</th>
              {players.map((p, idx) => (
                <th key={idx}>{p.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: holes }).map((_, hIdx) => (
              <tr key={hIdx}>
                <td>{hIdx + 1}</td>
                {players.map((_, pIdx) => (
                  <td key={pIdx}>
                    <input
                      type="number"
                      min="0"
                      inputMode="numeric"
                      value={scores[hIdx]?.[pIdx] ?? ""}
                      onChange={(e) => updateScore(hIdx, pIdx, e.target.value)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Totalt</th>
              {totals.map((t, idx) => (
                <th key={idx}>{t}</th>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="actions">
        <button className="secondary" onClick={onReset}>
          Tilbakestill
        </button>
        <button disabled={!allFilled} onClick={onFinish}>
          Fullfør runde
        </button>
      </div>
    </section>
  );
}
