# Weather Forecast Application

A responsive web application that provides current weather conditions and 5-day forecasts for cities worldwide using the OpenWeatherMap API. The application is containerized with Docker and deployed with load balancing across multiple servers.

## Features

- **Current Weather Display**: Shows real-time weather conditions including temperature, humidity, wind speed, and weather descriptions
- **5-Day Forecast**: Displays daily weather predictions with high/low temperatures and weather icons
- **Responsive Design**: Mobile-friendly interface that adapts to different screen sizes
- **Error Handling**: Graceful handling of API failures and invalid city names
- **Interactive UI**: Clean, intuitive interface with weather icons and organized data presentation

## API Integration

This application uses the [OpenWeatherMap API](https://openweathermap.org/api) to fetch weather data:
- Current Weather Data API
- 5 Day Weather Forecast API

**API Credits**: Weather data provided by OpenWeatherMap (https://openweathermap.org/)

## Local Development

### Prerequisites
- Node.js (for local development server)
- Docker (for containerization)
- Valid OpenWeatherMap API key

### Running Locally

1. Clone the repository:
```bash
git clone <your-repo-url>
cd WeatherApp
```

2. Open `index.html` in a web browser or serve using a local server:
```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx http-server -p 8080
```

3. Access the application at `http://localhost:8080`

## Docker Deployment

### Image Details
- **Docker Hub Repository**: `naillah/static-site`
- **Available Tags**: `v1`, `arm64-v1`
- **Base Port**: 8080

### Build Instructions

Build the Docker image locally:
```bash
docker build -t naillah/static-site:v1 .
```

### Local Testing
Test the container locally before deployment:
```bash
docker run -p 8080:8080 naillah/static-sitenaillah/static-site:v1
curl http://localhost:8080
```



## Live Application URLs

- **Server 1**: http://18.204.221.80:8080/
- **Server 2**: http://3.82.175.49:8080/
- **Load Balancer**: http://44.201.135.5/
- **Local Development**: http://localhost:8080

## Testing Load Balancing



 **Browser Testing:**
   - Access http://44.201.135.5/ multiple times
   - Check browser developer tools for response headers
   - Verify requests are distributed between servers

### Load Balancing Evidence

The load balancer successfully distributes traffic between Web01 and Web02 using round-robin algorithm. Each server responds with the same application content, ensuring seamless user experience regardless of which server handles the request.

## Security Considerations

### API Key Management
- API keys should be managed through environment variables in production
- Never commit API keys to version control
- Consider using Docker secrets or environment files for sensitive data:


## File Structure

```
WeatherApp/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── app.js             # JavaScript functionality and API integration
├── Dockerfile         # Container configuration
└── README.md          # Project documentation
```

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **API**: OpenWeatherMap API
- **Containerization**: Docker
- **Load Balancing**: HAProxy
- **Deployment**: AWS EC2 instances

## Error Handling

The application includes comprehensive error handling for:
- Invalid city names
- API service unavailability
- Network connectivity issues
- Malformed API responses

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 16+

## Development Challenges & Solutions

1. **API Rate Limiting**: Implemented efficient API calls by grouping forecast data by day
2. **Responsive Design**: Used CSS Flexbox for adaptive layout across devices
3. **Error Handling**: Added comprehensive error messages for better user experience
4. **Docker Networking**: Configured proper port mapping for container communication

## Future Enhancements

- Add geolocation-based weather detection
- Implement weather alerts and notifications
- Add weather maps integration
- Include historical weather data
- Add user preferences and favorites

## Credits

- **Weather Data**: OpenWeatherMap API (https://openweathermap.org/)
- **Icons**: OpenWeatherMap weather icons
- **Deployment Infrastructure**: AWS EC2 with HAProxy load balancing

## License

This project is for educational purposes as part of a web development assignment.

---
