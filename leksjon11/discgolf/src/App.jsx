// Discgolf Webapp main component: handles views and state
import React, { useEffect, useMemo, useState } from "react";
import PlayerSetup from "./components/PlayerSetup.jsx";
import Round from "./components/Round.jsx";
import Results from "./components/Results.jsx";
import { calculateTotals } from "./utils/score.js";

const STORAGE_KEY = "discgolf_state_v1";

/**
 * App-level state structure
 * players: [{ name: string }]
 * holes: number
 * scores: number[holes][players]
 */
export default function App() {
  const [players, setPlayers] = useState([]);
  const [holes, setHoles] = useState(18);
  const [scores, setScores] = useState([]);
  const [view, setView] = useState("start"); // 'start' | 'round' | 'results'

  // Load persisted state (only if valid), else show startup (names entry)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      const p = Array.isArray(parsed.players) ? parsed.players : [];
      const h = Number.isInteger(parsed.holes) ? parsed.holes : 18;
      const s = Array.isArray(parsed.scores) ? parsed.scores : [];

      const playerCountValid =
        p.length >= 3 && p.length <= 4 && p.every((x) => x?.name?.trim?.());
      const scoresShapeValid =
        Array.isArray(s) &&
        s.length === h &&
        s.every((row) => Array.isArray(row) && row.length === p.length);

      if (playerCountValid && scoresShapeValid) {
        setPlayers(p);
        setHoles(h);
        setScores(s);
        setView(
          parsed.view === "round" || parsed.view === "results"
            ? parsed.view
            : "round",
        );
      } else {
        setView("start");
      }
    } catch {
      setView("start");
    }
  }, []);

  // Persist state
  useEffect(() => {
    const state = { players, holes, scores, view };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [players, holes, scores, view]);

  const totals = useMemo(
    () => calculateTotals(players, scores),
    [players, scores],
  );

  const startRound = (newPlayers, holeCount) => {
    setPlayers(newPlayers);
    setHoles(holeCount);
    // Initialize scores matrix holes x players with nulls
    setScores(
      Array.from({ length: holeCount }, () =>
        Array(newPlayers.length).fill(null),
      ),
    );
    setView("round");
  };

  const finishRound = () => setView("results");

  const resetRound = () => {
    setPlayers([]);
    setHoles(18);
    setScores([]);
    setView("start");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1>Discgolf Webapp</h1>
        <p className="subtitle">
          Enkel poengføring for grupper på 3–4 spillere
        </p>
      </header>

      {view === "start" && (
        <PlayerSetup onStart={startRound} defaultHoles={holes} />
      )}

      {view === "round" && (
        <Round
          players={players}
          holes={holes}
          scores={scores}
          totals={totals}
          onScoresChange={setScores}
          onFinish={finishRound}
          onReset={resetRound}
        />
      )}

      {view === "results" && (
        <Results players={players} totals={totals} onNewRound={resetRound} />
      )}

      <footer className="app-footer">
        <button className="link" onClick={resetRound}>
          Start ny runde
        </button>
      </footer>
    </div>
  );
}
