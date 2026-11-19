// Kjøres av Mocha én gang før testfilene lastes (se "require" i .mocharc.json).
//
// Testene trenger en sesjonshemmelighet. Er den ikke satt i .env,
// bruker vi en egen verdi som bare gjelder testene.
process.env.SESSION_SECRET ??= "hemmelighet-kun-for-testing";
