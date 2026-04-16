const cityInput = document.getElementById('city-input');
const loadBtn = document.getElementById('load-btn');
const locationName = document.getElementById('location-name');
const weatherDetails = document.getElementById('weather-details');
const tempHighEl = document.getElementById('temp-high');
const tempLowEl = document.getElementById('temp-low');
const precipTotalEl = document.getElementById('precip-total');

const tempCtx = document.getElementById('tempChart').getContext('2d');
const precipCtx = document.getElementById('precipChart').getContext('2d');
let tempChart;
let precipChart;

const geocodeApi = 'https://geocoding-api.open-meteo.com/v1/search';
const weatherApi = 'https://api.open-meteo.com/v1/forecast';

async function fetchCityCoordinates(city) {
  const url = `${geocodeApi}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results && data.results[0] ? data.results[0] : null;
}

async function fetchWeather(lat, lon) {
  const url = `${weatherApi}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
  const response = await fetch(url);
  return response.json();
}

function formatNumber(value, decimals = 0) {
  return Number(value).toFixed(decimals);
}

function updateSummary(city, data) {
  locationName.textContent = city;
  weatherDetails.textContent = `7-day forecast for ${city}.`;
  const highs = data.daily.temperature_2m_max;
  const lows = data.daily.temperature_2m_min;
  const precips = data.daily.precipitation_sum;
  tempHighEl.textContent = `${formatNumber(Math.max(...highs))}°C`;
  tempLowEl.textContent = `${formatNumber(Math.min(...lows))}°C`;
  precipTotalEl.textContent = `${formatNumber(precips.reduce((sum, value) => sum + value, 0), 1)} mm`;
}

function createChart(chartInstance, ctx, labels, values, label, color, type = 'line') {
  if (chartInstance) chartInstance.destroy();
  return new Chart(ctx, {
    type,
    data: {
      labels,
      datasets: [
        {
          label,
          data: values,
          borderColor: color,
          backgroundColor: type === 'bar' ? 'rgba(79, 123, 255, 0.35)' : 'rgba(79, 123, 255, 0.15)',
          fill: type === 'line',
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { mode: 'index', intersect: false },
      },
      scales: {
        x: {
          ticks: { color: '#cbd6ee' },
          grid: { color: 'rgba(255,255,255,0.08)' },
        },
        y: {
          ticks: { color: '#cbd6ee' },
          grid: { color: 'rgba(255,255,255,0.08)' },
        },
      },
    },
  });
}

async function loadWeather() {
  const city = cityInput.value.trim();
  if (!city) return;
  locationName.textContent = 'Loading…';
  weatherDetails.textContent = 'Fetching weather data...';

  try {
    const cityData = await fetchCityCoordinates(city);
    if (!cityData) {
      throw new Error('City not found.');
    }

    const weather = await fetchWeather(cityData.latitude, cityData.longitude);
    const labels = weather.daily.time;
    const highs = weather.daily.temperature_2m_max;
    const lows = weather.daily.temperature_2m_min;
    const precips = weather.daily.precipitation_sum;

    updateSummary(`${cityData.name}, ${cityData.country}`, weather);

    tempChart = createChart(
      tempChart,
      tempCtx,
      labels,
      highs,
      'High Temperature (°C)',
      '#7c98ff',
      'line'
    );

    precipChart = createChart(
      precipChart,
      precipCtx,
      labels,
      precips,
      'Precipitation (mm)',
      '#55d4ff',
      'bar'
    );
  } catch (error) {
    locationName.textContent = 'Weather Dashboard';
    weatherDetails.textContent = error.message;
    tempHighEl.textContent = '--';
    tempLowEl.textContent = '--';
    precipTotalEl.textContent = '--';
  }
}

loadBtn.addEventListener('click', loadWeather);
window.addEventListener('load', loadWeather);
