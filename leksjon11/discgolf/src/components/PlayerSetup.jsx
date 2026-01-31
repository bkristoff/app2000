// PlayerSetup: collect 3–4 player names and hole count
import React, { useState } from "react";

export default function PlayerSetup({ onStart, defaultHoles = 18 }) {
  const [playerCount, setPlayerCount] = useState(3);
  const [names, setNames] = useState(["", "", "", ""]);
  const [holes, setHoles] = useState(defaultHoles);

  const canStart = () => {
    const countOk = playerCount >= 3 && playerCount <= 4;
    const selected = names.slice(0, playerCount);
    const namesOk = selected.every((n) => n.trim().length > 0);
    const holesOk =
      Number.isInteger(Number(holes)) &&
      Number(holes) > 0 &&
      Number(holes) <= 36;
    return countOk && namesOk && holesOk;
  };

  const handleStart = () => {
    if (!canStart()) return;
    const players = names
      .slice(0, playerCount)
      .map((name) => ({ name: name.trim() }));
    onStart(players, Number(holes));
  };

  return (
    <section className="card">
      <h2>Start runde</h2>
      <div className="grid">
        <label>
          Antall spillere (3–4)
          <select
            value={playerCount}
            onChange={(e) => setPlayerCount(Number(e.target.value))}>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </label>

        <label>
          Antall kurver (standard 18)
          <input
            type="number"
            min="1"
            max="36"
            value={holes}
            onChange={(e) => setHoles(e.target.value)}
          />
        </label>
      </div>

      <div className="grid">
        {Array.from({ length: playerCount }).map((_, idx) => (
          <label key={idx}>
            Spillernavn #{idx + 1}
            <input
              type="text"
              placeholder={`Spiller ${idx + 1}`}
              value={names[idx]}
              onChange={(e) => {
                const next = [...names];
                next[idx] = e.target.value;
                setNames(next);
              }}
            />
          </label>
        ))}
      </div>

      <div className="actions">
        <button disabled={!canStart()} onClick={handleStart}>
          Start runde
        </button>
      </div>
    </section>
  );
}
