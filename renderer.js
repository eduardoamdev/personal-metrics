const { ipcRenderer } = require("electron");

// Set default date to today
document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("date");
  const today = new Date().toISOString().split("T")[0];
  dateInput.value = today;
});

// Handle form submission
document
  .getElementById("dailyLogForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      date: document.getElementById("date").value,
      sunlight_minutes: document.getElementById("sunlight_minutes").value,
      outside_minutes: document.getElementById("outside_minutes").value,
      temperature_celsius: document.getElementById("temperature_celsius").value,
      stressful_situations: document.getElementById("stressful_situations")
        .value,
      sleep_hours: document.getElementById("sleep_hours").value,
      cucumber_grams: document.getElementById("cucumber_grams").value,
      eggs_count: document.getElementById("eggs_count").value,
      tomato_grams: document.getElementById("tomato_grams").value,
      nuts_grams: document.getElementById("nuts_grams").value,
      beef_grams: document.getElementById("beef_grams").value,
      chicken_grams: document.getElementById("chicken_grams").value,
      fish_grams: document.getElementById("fish_grams").value,
      olive_oil_grams: document.getElementById("olive_oil_grams").value,
      water_liters: document.getElementById("water_liters").value,
      dairy_grams: document.getElementById("dairy_grams").value,
      viscera_grams: document.getElementById("viscera_grams").value,
      honey_grams: document.getElementById("honey_grams").value,
      fruits_count: document.getElementById("fruits_count").value,
      notes: document.getElementById("notes").value,
    };

    // Send data to main process
    const result = await ipcRenderer.invoke("save-daily-log", formData);

    if (result.success) {
      alert(result.message);
      // Optionally reset form
      // e.target.reset();
      // Set date back to today
      // document.getElementById("date").value = new Date().toISOString().split("T")[0];
    } else {
      alert("Error saving entry: " + result.message);
    }
  });
