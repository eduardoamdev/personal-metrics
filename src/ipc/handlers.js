const { ipcMain } = require("electron");
const DailyLogService = require("../services/DailyLogService");

function registerIpcHandlers() {
  ipcMain.handle("save-daily-log", async (event, data) => {
    // Determine if we need to run this off the main thread?
    // For small SQLite ops, blocking main thread is usually acceptable,
    // but wrapping in async handler satisfies the IPC contract.
    try {
      return DailyLogService.saveDailyLog(data);
    } catch (err) {
      return { success: false, message: "Internal Error: " + err.message };
    }
  });
}

module.exports = registerIpcHandlers;
