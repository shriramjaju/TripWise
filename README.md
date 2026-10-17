# TripWise

A travel planner where users explore real places in Hyderabad, view details, and build a personal itinerary that is saved in the browser.

**Live demo:** YOUR_VERCEL_LINK
**Track:** Frontend

## Features
- Explore places from the Geoapify Places API
- Search by name, filter by category, sort by name or distance
- Destination details page with live weather (Open-Meteo) and a map link
- Add and remove places in "My Trip", saved with localStorage so it persists after refresh
- Loading, error (with Retry) and empty states
- Responsive layout for mobile and desktop

## Tech stack
React, Vite, React Router, plain CSS, fetch, localStorage. Deployed on Vercel.

## APIs used
- **Geoapify Places API:** place data (https://www.geoapify.com). Data © OpenStreetMap contributors.
- **Open-Meteo:** current weather, no key needed (https://open-meteo.com).

## Setup
1. Clone the repo and run `npm install`.
2. Create a `.env` file in the project root (see `.env.example`):
   `VITE_GEOAPIFY_KEY=your_geoapify_key`
3. Run `npm run dev` and open http://localhost:5173.

## Project structure
- `src/api.js`: API calls
- `src/TripContext.jsx`: itinerary state and localStorage
- `src/pages/`: Explore, Details, MyTrip

## Notes
The API key is read from an environment variable and is not committed to the repo.