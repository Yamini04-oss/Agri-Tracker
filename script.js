// ------------------- Soil Health Suggestion -------------------
document.getElementById("soilForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let ph = parseFloat(document.getElementById("ph").value);
  let n = parseInt(document.getElementById("n").value);
  let p = parseInt(document.getElementById("p").value);
  let k = parseInt(document.getElementById("k").value);

  let result = "";
  let crops = [];

  if (ph >= 6 && ph <= 7 && n > 50 && p > 40 && k > 40) {
    result = "Soil is healthy!";
    crops = ["Wheat", "Rice", "Maize"];
  } else if (ph < 6) {
    result = "Soil is acidic. Add lime.";
    crops = ["Groundnut", "Potato"];
  } else {
    result = "Soil is alkaline. Use organic matter.";
    crops = ["Barley", "Cotton"];
  }

  document.getElementById("soilResult").innerText = result;

  let cropList = document.getElementById("cropList");
  cropList.innerHTML = "";
  crops.forEach(crop => {
    let li = document.createElement("li");
    li.textContent = crop;
    cropList.appendChild(li);
  });
});

// ------------------- Weather (Free API using wttr.in) -------------------
document.getElementById("searchBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "<p style='color:red'>Please select a city!</p>";
    return;
  }

  try {
    const res = await fetch(`https://wttr.in/${city}?format=j1`);
    const data = await res.json();

    // Extract current weather
    const current = data.current_condition[0];

    resultDiv.innerHTML = `
      <h3>${city}</h3>
      <p><strong>Temperature:</strong> ${current.temp_C}°C</p>
      <p><strong>Weather:</strong> ${current.weatherDesc[0].value}</p>
      <p><strong>Humidity:</strong> ${current.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${current.windspeedKmph} km/h</p>
    `;
  } catch (err) {
    resultDiv.innerHTML = `<p style="color:red;">Error fetching weather!</p>`;
    console.error(err);
  }
});

// ------------------- Market Price Chart -------------------
const ctx = document.getElementById("priceChart").getContext("2d");
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [{
      label: "Wheat Price (₹/kg)",
      data: [22, 24, 25, 23, 26],
      borderWidth: 2,
      borderColor: "#2e7d32",
      fill: false
    }]
  },
  options: {
    responsive: true
  }
});
