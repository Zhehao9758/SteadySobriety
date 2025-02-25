import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { connectToDatabase } from "./db/db.js";
import registerRoute from "./routes/register.js";
import loginRoute from "./routes/login.js";
import logoutRoute from "./routes/logout.js";
import createSoberLogRoute from "./routes/create_log.js";
import readSoberLogRoute from "./routes/read_logs.js";
import streakRoute from "./routes/streak.js";
import leaderboardRoute from "./routes/leadboard.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "front", "dist")));

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session && req.session.username) {
    return next();
  }
  res.redirect("/login");
}

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use the routes
app.post("/register", registerRoute);
app.post("/login", loginRoute);
app.get("/login", logoutRoute);
app.post("/sober-log", createSoberLogRoute);
app.get("/sober-log/:username", readSoberLogRoute);
app.get("/streak/:username", streakRoute);
app.get("/leaderboard", leaderboardRoute);

//test route
app.get("/test", (req, res) => {
  res.status(200).json({ message: "Test success!" });
});

connectToDatabase();
export default app;
