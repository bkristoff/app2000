// Score utilities: pure functions for computing totals
/**
 * Calculate totals per player from scores matrix.
 * @param {{name:string}[]} players
 * @param {Array<Array<number|null>>} scores - holes x players
 * @returns {number[]}
 */
export function calculateTotals(players, scores) {
  const pCount = players.length;
  const totals = Array(pCount).fill(0);
  for (let h = 0; h < scores.length; h++) {
    const row = scores[h] || [];
    for (let p = 0; p < pCount; p++) {
      const v = row[p];
      if (Number.isInteger(v) && v >= 0) totals[p] += v;
    }
  }
  return totals;
}
