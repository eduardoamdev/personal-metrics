const { app, BrowserWindow, ipcMain } = require("electron");
const { db, statements } = require("./database");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("index.html");
};

// Handle form submission from renderer process
ipcMain.handle("save-daily-log", async (event, data) => {
  try {
    const {
      date,
      sunlight_minutes,
      outside_minutes,
      temperature_celsius,
      stressful_situations,
      sleep_hours,
      cucumber_grams,
      eggs_count,
      tomato_grams,
      nuts_grams,
      beef_grams,
      chicken_grams,
      fish_grams,
      olive_oil_grams,
      water_liters,
      dairy_grams,
      viscera_grams,
      honey_grams,
      fruits_count,
      notes,
    } = data;

    // Try to insert new entry
    try {
      statements.insert.run(
        date,
        sunlight_minutes || null,
        outside_minutes || null,
        temperature_celsius || null,
        stressful_situations !== "" ? stressful_situations : null,
        sleep_hours || null,
        cucumber_grams || null,
        eggs_count || null,
        tomato_grams || null,
        nuts_grams || null,
        beef_grams || null,
        chicken_grams || null,
        fish_grams || null,
        olive_oil_grams || null,
        water_liters || null,
        dairy_grams || null,
        viscera_grams || null,
        honey_grams || null,
        fruits_count || null,
        notes || null,
      );
      return { success: true, message: "Entry saved successfully!" };
    } catch (error) {
      // If date already exists, update instead
      if (error.message.includes("UNIQUE constraint failed")) {
        statements.update.run(
          sunlight_minutes || null,
          outside_minutes || null,
          temperature_celsius || null,
          stressful_situations !== "" ? stressful_situations : null,
          sleep_hours || null,
          cucumber_grams || null,
          eggs_count || null,
          tomato_grams || null,
          nuts_grams || null,
          beef_grams || null,
          chicken_grams || null,
          fish_grams || null,
          olive_oil_grams || null,
          water_liters || null,
          dairy_grams || null,
          viscera_grams || null,
          honey_grams || null,
          fruits_count || null,
          notes || null,
          date,
        );
        return { success: true, message: "Entry updated successfully!" };
      }
      throw error;
    }
  } catch (error) {
    console.error("Error saving daily log:", error);
    return { success: false, message: error.message };
  }
});

app.whenReady().then(() => {
  createWindow();
});
