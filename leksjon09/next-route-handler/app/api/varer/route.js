// Kun dummy-kode for å vise oppsettet.
export async function GET() {
  return Response.json({ data: "Her kommer alle varene." });
}

export async function POST() {
  return Response.json({ data: "Ny vare satt inn i databasen." });
}
