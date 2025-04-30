# Weather App

This is a simple weather application that allows users to check the current weather conditions for any city based on their current location. The app uses the Weatherbit API to fetch weather data and displays it in a user-friendly format.
A demo of the deployed site can be viewed on https://inthing.co.za/

## Design Decisions and Trade-offs
For detailed information on architectural decisions and their associated trade-offs, please refer to the [Architectural Decision Records](ADR/ADR_DesignDecisions.md).

## Tech Stack

- **Frontend**: React with TypeScript
- **Build Tool**: Vite
- **API**: [Weatherbit.io](https://www.weatherbit.io/) Weather API
- **Testing**:
    - Unit tests for weatherAPI service
    - Playwright for UI end-to-end testing
- **Styling**: Chakra UI (with responsive design)

## Features

- Calls the Weatherbit API to get current weather data
- Displays the weather data in a user-friendly format
- Pulls location data from browser
- Uses geo location to retrieve weather data
- Makes use of local storage to store API results and prevent redundant API calls
- Responsive design with both tile and list views
- Shows detailed weather metrics (temperature, humidity)
- Historical weather data display
- Multi-day forecast
- CI Pipeline with GitHub Actions to check if all tests pass for every PR

## How to Start the Project

1. Clone the repository
2. Install dependencies:
```bash
  npm install
```
Create a .env file based on .env.example and add your Weatherbit API key:
```bash
  VITE_WEATHER_API_KEY=your_api_key_here
```

### Start the development server:
```bash
  npm run dev
```

### To run tests:
```bash
  npm run test
```

### To run Playwright tests:
```bash
  npm run test:e2e
```
Note: For Playwright tests to work correctly, ensure the VITE_WEATHER_API_KEY environment variable is set in your .env file.

## How to Setup Weatherbit API

1. Sign up for a free trial account at [Weatherbit.io](https://www.weatherbit.io/)
2. Navigate to your dashboard and generate an API key
3. Copy the API key to your `.env` file as `VITE_WEATHER_API_KEY`
4. The app uses two main endpoints:
    - Forecast data: `/v2.0/forecast/daily`
    - Historical data: `/v2.0/history/hourly`
