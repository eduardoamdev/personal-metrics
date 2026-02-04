const db = require("../config/database");
const DailyLogRepository = require("../repositories/DailyLogRepository");

class DailyLogService {
  constructor() {
    this.repo = new DailyLogRepository(db);
  }

  saveDailyLog(data) {
    try {
      // Basic sanitization: convert empty strings to nulls
      const sanitizedData = this._sanitize(data);

      this.repo.save(sanitizedData);
      return { success: true, message: "Entry saved successfully!" };
    } catch (error) {
      if (error.message.includes("UNIQUE constraint failed")) {
        // If it already exists, update it instead
        // We need to re-sanitize or reuse the sanitized data
        const sanitizedData = this._sanitize(data);
        this.repo.update(sanitizedData);
        return { success: true, message: "Entry updated successfully!" };
      }

      console.error("Service Error:", error);
      return { success: false, message: error.message };
    }
  }

  /**
   * Converts empty strings/undefined to null to ensure database consistency
   */
  _sanitize(data) {
    const cleaned = {};
    for (const [key, value] of Object.entries(data)) {
      if (value === "" || value === undefined || value === null) {
        cleaned[key] = null;
      } else {
        cleaned[key] = value;
      }
    }
    return cleaned;
  }
}

module.exports = new DailyLogService();
