class DailyLogRepository {
  constructor(db) {
    this.db = db;
  }

  save(entry) {
    const stmt = this.db.prepare(`
      INSERT INTO daily_log (
        date, sunlight_minutes, outside_minutes, temperature_celsius,
        stressful_situations, sleep_hours, cucumber_grams, eggs_count,
        tomato_grams, nuts_grams, beef_grams, chicken_grams, fish_grams,
        olive_oil_grams, water_liters, dairy_grams, viscera_grams,
        honey_grams, fruits_count, notes
      ) VALUES (
        @date, @sunlight_minutes, @outside_minutes, @temperature_celsius,
        @stressful_situations, @sleep_hours, @cucumber_grams, @eggs_count,
        @tomato_grams, @nuts_grams, @beef_grams, @chicken_grams, @fish_grams,
        @olive_oil_grams, @water_liters, @dairy_grams, @viscera_grams,
        @honey_grams, @fruits_count, @notes
      )
    `);
    return stmt.run(entry);
  }

  update(entry) {
    const stmt = this.db.prepare(`
      UPDATE daily_log SET
        sunlight_minutes = @sunlight_minutes,
        outside_minutes = @outside_minutes,
        temperature_celsius = @temperature_celsius,
        stressful_situations = @stressful_situations,
        sleep_hours = @sleep_hours,
        cucumber_grams = @cucumber_grams,
        eggs_count = @eggs_count,
        tomato_grams = @tomato_grams,
        nuts_grams = @nuts_grams,
        beef_grams = @beef_grams,
        chicken_grams = @chicken_grams,
        fish_grams = @fish_grams,
        olive_oil_grams = @olive_oil_grams,
        water_liters = @water_liters,
        dairy_grams = @dairy_grams,
        viscera_grams = @viscera_grams,
        honey_grams = @honey_grams,
        fruits_count = @fruits_count,
        notes = @notes
      WHERE date = @date
    `);
    return stmt.run(entry);
  }

  getByDate(date) {
    const stmt = this.db.prepare("SELECT * FROM daily_log WHERE date = ?");
    return stmt.get(date);
  }

  getAll() {
    const stmt = this.db.prepare("SELECT * FROM daily_log ORDER BY date DESC");
    return stmt.all();
  }
}

module.exports = DailyLogRepository;
