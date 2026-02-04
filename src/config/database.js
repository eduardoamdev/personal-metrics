const Database = require("better-sqlite3");
const path = require("path");

class DatabaseConnection {
  constructor() {
    // Place database in the project root
    const dbPath = path.resolve(__dirname, "../../personal-metrics.db");
    this.db = new Database(dbPath);
    this.initializeSchema();
  }

  initializeSchema() {
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

    this.db.exec(createTableSQL);
    console.log("Database initialized successfully at: " + this.db.name);
  }

  getInstance() {
    return this.db;
  }
}

// Singleton instance
module.exports = new DatabaseConnection().getInstance();
