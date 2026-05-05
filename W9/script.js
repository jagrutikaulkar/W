function getWeather() {
    let city = document.getElementById('city').value.toLowerCase().trim();
    let result = document.getElementById('result');

    if (!city) {
        result.innerHTML = `<p class="error">Please enter a city</p>`;
        return;
    }

    fetch("weather.json")
        .then(res => res.json())
        .then(data => {

            if (data[city]) {
                result.innerHTML = `
                    <div class="weather-box">
                        <h2>${city.toUpperCase()}</h2>
                        <p>Temperature: ${data[city].temperature}</p>
                        <p>Humidity: ${data[city].humidity}</p>
                        <p>Condition: ${data[city].condition}</p>
                    </div>
                `;
            } else {
                result.innerHTML = `<p class="error">City not found</p>`;
            }

        })
        .catch(() => {
            result.innerHTML = `<p class="error">Failed to load data</p>`;
        });
}