// Kun dummy-kode for å vise oppsettet.
export async function GET() {
  return Response.json({ data: "Her kommer alle kundene." });
}

export async function POST() {
  return Response.json({ data: "Ny kunde satt inn i databasen." });
}
