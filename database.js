const Database = require("better-sqlite3");
const path = require("path");

// Initialize database
const dbPath = path.join(__dirname, "personal-metrics.db");
const db = new Database(dbPath);

// Create table schema
const createTableSQL = `
  CREATE TABLE IF NOT EXISTS daily_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL UNIQUE,
    
    -- Activity metrics
    sunlight_minutes INTEGER,
    outside_minutes INTEGER,
    temperature_celsius REAL,
    stressful_situations INTEGER,  -- 0 = no, 1 = yes
    sleep_hours REAL,
    
    -- Food intake
    cucumber_grams INTEGER,
    eggs_count INTEGER,
    tomato_grams INTEGER,
    nuts_grams INTEGER,
    beef_grams INTEGER,
    chicken_grams INTEGER,
    fish_grams INTEGER,
    olive_oil_grams INTEGER,
    water_liters REAL,
    dairy_grams INTEGER,
    viscera_grams INTEGER,
    honey_grams INTEGER,
    fruits_count INTEGER,
    
    -- Notes
    notes TEXT
  )
`;

// Execute table creation
db.exec(createTableSQL);

console.log("Database initialized successfully!");

// Prepared statements for common operations
const statements = {
  // Insert a new daily log entry
  insert: db.prepare(`
    INSERT INTO daily_log (
      date, sunlight_minutes, outside_minutes, temperature_celsius,
      stressful_situations, sleep_hours, cucumber_grams, eggs_count,
      tomato_grams, nuts_grams, beef_grams, chicken_grams, fish_grams,
      olive_oil_grams, water_liters, dairy_grams, viscera_grams,
      honey_grams, fruits_count, notes
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
  `),

  // Update an existing entry by date
  update: db.prepare(`
    UPDATE daily_log SET
      sunlight_minutes = ?,
      outside_minutes = ?,
      temperature_celsius = ?,
      stressful_situations = ?,
      sleep_hours = ?,
      cucumber_grams = ?,
      eggs_count = ?,
      tomato_grams = ?,
      nuts_grams = ?,
      beef_grams = ?,
      chicken_grams = ?,
      fish_grams = ?,
      olive_oil_grams = ?,
      water_liters = ?,
      dairy_grams = ?,
      viscera_grams = ?,
      honey_grams = ?,
      fruits_count = ?,
      notes = ?
    WHERE date = ?
  `),

  // Get entry by date
  getByDate: db.prepare("SELECT * FROM daily_log WHERE date = ?"),

  // Get all entries
  getAll: db.prepare("SELECT * FROM daily_log ORDER BY date DESC"),

  // Get entries within a date range
  getByDateRange: db.prepare(`
    SELECT * FROM daily_log 
    WHERE date BETWEEN ? AND ? 
    ORDER BY date DESC
  `),

  // Delete entry by date
  deleteByDate: db.prepare("DELETE FROM daily_log WHERE date = ?"),
};

// Export database and statements
module.exports = {
  db,
  statements,
};
