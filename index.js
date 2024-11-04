const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
})();

async function fetchGames() {
  let query = 'select * from games';
  let queryResult = await db.all(query, []);
  return { games: queryResult };
}

app.get('/games', async (req, res) => {
  try {
    let result = await fetchGames();
    if (result.games.length === 0) {
      return res.status(404).json({
        message: `No games found.`,
      });
    }
    res.status(200).json(result.games);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchGamesById(id) {
  let query = 'select * from games where id = ?';
  let queryResult = await db.all(query, [id]);
  return { games: queryResult };
}

app.get('/games/details/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await fetchGamesById(id);
    if (result.games.length === 0) {
      return res.status(404).json({
        message: `No games found.`,
      });
    }
    res.status(200).json(result.games);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchGamesByGenre(genre) {
  let query = 'select * from games where genre = ?';
  let queryResult = await db.all(query, [genre]);
  return { games: queryResult };
}

app.get('/games/genre/:genre', async (req, res) => {
  try {
    let genre = req.params.genre;
    let result = await fetchGamesByGenre(genre);
    if (result.games.length === 0) {
      return res.status(404).json({
        message: `No games found.`,
      });
    }
    res.status(200).json(result.games);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchGamesByPlatform(platform) {
  let query = 'select * from games where platform = ?';
  let queryResult = await db.all(query, [platform]);
  return { games: queryResult };
}

app.get('/games/platform/:platform', async (req, res) => {
  try {
    let platform = req.params.platform;
    let result = await fetchGamesByPlatform(platform);
    if (result.games.length === 0) {
      return res.status(404).json({
        message: `No games found.`,
      });
    }
    res.status(200).json(result.games);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchGamesSortedByRating() {
  let query = 'select * from games order by rating desc';
  let queryResult = await db.all(query, []);
  return { games: queryResult };
}

app.get('/games/sort-by-rating', async (req, res) => {
  try {
    let result = await fetchGamesSortedByRating();
    if (result.games.length === 0) {
      return res.status(404).json({
        message: `No games found.`,
      });
    }
    res.status(200).json(result.games);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchPlayers() {
  let query = 'select * from players';
  let queryResult = await db.all(query, []);
  return { players: queryResult };
}

app.get('/players', async (req, res) => {
  try {
    let result = await fetchPlayers();
    if (result.players.length === 0) {
      return res.status(404).json({
        message: `No players found.`,
      });
    }
    res.status(200).json(result.players);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchPlayersById(id) {
  let query = 'select * from players where id = ?';
  let queryResult = await db.all(query, [id]);
  return { players: queryResult };
}

app.get('/players/details/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await fetchPlayersById(id);
    if (result.players.length === 0) {
      return res.status(404).json({
        message: `No players found.`,
      });
    }
    res.status(200).json(result.players);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchPlayersByPlatform(platform) {
  let query = 'select * from players where platform = ?';
  let queryResult = await db.all(query, [platform]);
  return { players: queryResult };
}

app.get('/players/platform/:platform', async (req, res) => {
  try {
    let platform = req.params.platform;
    let result = await fetchPlayersByPlatform(platform);
    if (result.players.length === 0) {
      return res.status(404).json({
        message: `No players found.`,
      });
    }
    res.status(200).json(result.players);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchPlayersSortedByRating() {
  let query = 'select * from players order by rating desc';
  let queryResult = await db.all(query, []);
  return { players: queryResult };
}

app.get('/players/sort-by-rating', async (req, res) => {
  try {
    let result = await fetchPlayersSortedByRating();
    if (result.players.length === 0) {
      return res.status(404).json({
        message: `No players found.`,
      });
    }
    res.status(200).json(result.players);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchTournaments() {
  let query = 'select * from tournaments';
  let queryResult = await db.all(query, []);
  return { tournaments: queryResult };
}

app.get('/tournaments', async (req, res) => {
  try {
    let result = await fetchTournaments();
    if (result.tournaments.length === 0) {
      return res.status(404).json({
        message: `No tournaments found.`,
      });
    }
    res.status(200).json(result.tournaments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchTournamentsById(id) {
  let query = 'select * from tournaments where id = ?';
  let queryResult = await db.get(query, [id]);
  return { tournaments: queryResult };
}

app.get('/tournaments/details/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await fetchTournamentsById(id);
    if (result.tournaments === undefined) {
      return res.status(404).json({
        message: `No tournaments found.`,
      });
    }
    res.status(200).json(result.tournaments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchTournamentsByGameId(gameId) {
  let query = 'select * from tournaments where gameId = ?';
  let queryResult = await db.all(query, [gameId]);
  return { tournaments: queryResult };
}

app.get('/tournaments/game/:gameId', async (req, res) => {
  try {
    let gameId = parseInt(req.params.gameId);
    let result = await fetchTournamentsByGameId(gameId);
    if (result.tournaments.length === 0) {
      return res.status(404).json({
        message: `No tournaments found.`,
      });
    }
    res.status(200).json(result.tournaments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchTournamentsSortedByPrizePool() {
  let query = 'select * from tournaments order by prizePool desc';
  let queryResult = await db.all(query, []);
  return { tournaments: queryResult };
}

app.get('/tournaments/sort-by-prize-pool', async (req, res) => {
  try {
    let result = await fetchTournamentsSortedByPrizePool();
    if (result.tournaments.length === 0) {
      return res.status(404).json({
        message: `No tournaments found.`,
      });
    }
    res.status(200).json(result.tournaments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
