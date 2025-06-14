// Function to update date dynamically
function updateDate() {
  const dateElement = document.getElementById("date");
  const dayElement = document.getElementById("day");

  const currentDate = new Date();

  // Format date properly
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Get the weekday (e.g., "Thursday")
  const weekday = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

  // Update HTML content
  dateElement.textContent = formattedDate;
  dayElement.textContent = weekday;
}

// Call function on page load
updateDate();

// Weather fetching function with enhanced UI
document.querySelector('#getWeather').addEventListener('click', () => {
  const place = document.getElementById('location').value.trim();
  const weatherInfo = document.getElementById('weatherInfo');

  if (place === '') {
    weatherInfo.innerHTML = '<p style="color: #ff6b6b;">Please enter a location!</p>';
    return;
  }

  // Show loading state
  weatherInfo.innerHTML = '<div class="loading"></div><p style="margin-top: 15px;">Fetching weather data...</p>';

  function updateTemp(data) {
    console.log(data); // Debug: log full API response

    if (data.error) {
      weatherInfo.innerHTML = `<p style="color: #ff6b6b;">${data.error.message}</p>`;
      weatherInfo.classList.remove('has-data');
    } else {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      weatherInfo.innerHTML = `
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Location:</strong> ${data.location.name}, ${data.location.country}</p>
        <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
        <p><strong>Condition:</strong> ${data.current.condition.text}</p>
        <img src="${data.current.condition.icon}" alt="Weather Icon" style="margin-top: 10px;">
      `;
      weatherInfo.classList.add('has-data');
    }
  }

  // 🔁 REPLACE THIS WITH YOUR ACTUAL API KEY FROM https://www.weatherapi.com/
  const apiKey = 'e350ff6fc71749ec9c8102813251406';

  fetch(`https://api.weatherapi.com/v1/current.json?key=e350ff6fc71749ec9c8102813251406&q=${place}&aqi=yes`)

    .then(response => response.json())
    .then(data => updateTemp(data))
    .catch(error => {
      console.error('Error fetching weather data:', error);
      weatherInfo.innerHTML = '<p style="color: #ff6b6b;">Failed to fetch weather data. Try again!</p>';
      weatherInfo.classList.remove('has-data');
    });
});

// Enhanced slideshow functionality
let slides = document.querySelectorAll('.slide');
let index = 0;

function showSlide() {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
  });
  if (slides.length > 0) {
    slides[index].classList.add('active');
    index = (index + 1) % slides.length;
  }
}

setInterval(showSlide, 4000); // Change image every 4 seconds
showSlide(); // Initialize first image

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add enter key support for weather search
document.getElementById('location').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    document.getElementById('getWeather').click();
  }
});
