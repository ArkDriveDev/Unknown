class LeafletMap {
    constructor(containerId, center, zoom, locationId, apiKeys, Weather_ID) {
        this.apiKey = apiKeys;
        this.map = L.map(containerId).setView(center, zoom);
        this.initTileLayer();
        this.initMoveEndListener();
        
        // Initialize Loc_ID and weatherid using the provided IDs
        this.Loc_ID = document.getElementById(locationId);
        this.weatherid = document.getElementById(Weather_ID);
    }

    initTileLayer() {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

    addMarker(lat, lng, classroom) {
        const marker = L.marker([lat, lng]).addTo(this.map);
        
        marker.on('click', () => {
            localStorage.setItem('clickedMarker', classroom);
            window.location.href = 'Classroom.html';
        });
        
        marker.bindPopup(classroom);
    }

    loadMarkersFromJson(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(marker => {
                    this.addMarker(marker.latitude, marker.longitude, marker.classroom);
                });
            })
            .catch(error => console.error('Error loading markers:', error));
    }

    async reverseGeocode(lat, lng) {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        if (response.ok) {
            const data = await response.json();
            return data.display_name; // This is the place name
        } else {
            console.error('Geocoding error:', response.statusText);
            return 'Unknown location';
        }
    }

    initMoveEndListener() {
        this.map.on('moveend', async () => {
            const center = this.map.getCenter();
            const lat = center.lat;
            const lng = center.lng;

            // Get the place name first
            const placeName = await this.reverseGeocode(lat, lng);

            // Update the Loc_ID element with the place name and coordinates
            this.Loc_ID.innerHTML = `Place: ${placeName}<br>Latitude: ${lat.toFixed(6)}, Longitude: ${lng.toFixed(6)}`;

            // Fetch weather data for the new location
            await this.fetchWeatherByLocation(lat, lng);
        });
    }

    async fetchWeatherByLocation(lat, long) {
        const data = await this.getWeatherDataByCoordinates(lat, long);
        if (data) {
            // Display the weather information
            this.weatherid.innerHTML=`Temperature: ${data.main.temp} °C, Weather: ${data.weather[0].description}, Humidity: ${data.main.humidity}%, Wind Speed: ${data.wind.speed} m/s`;
        } else {
            alert('Unable to retrieve weather data for your location.');
        }
    }

    async getWeatherDataByCoordinates(latitude, longitude) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}&units=metric`);
            if (response.ok) {
                return await response.json();
            } else {
                console.error('Error fetching weather data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching weather data by coordinates:', error);
        }
        return null;
    }
}

/* Instantiate for map zoomed coordinates referencing the containerId, center, zoom, and locationId */
const apiKey = '56a134787af73dd1bc703ebe96d742dd'; 
const myMap = new LeafletMap('map', [8.360004, 124.868419], 18, 'location_id', apiKey, 'Weather_id');

/* JSON for loading markers */
myMap.loadMarkersFromJson('Pins.json');
