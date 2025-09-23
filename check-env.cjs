require("dotenv").config({ override:true });
const s = process.env.DATABASE_URL || "";
console.log("RAW=", JSON.stringify(s));
try { new URL(s); console.log("PARSE OK"); }
catch (e) { console.log("PARSE FAIL ->", e.message); }
