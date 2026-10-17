# TripWise

TripWise is a travel planner for exploring places in Hyderabad. Users can browse real places from an API, search, filter and sort them, open a details page, and build a personal itinerary that stays saved after a page refresh.

- **Live demo:** https://trip-wise-lac.vercel.app/
- **Track:** Frontend
- **Author:** SHRI RAM JAJU (26BCE1534)

## Features
- **Explore:** places loaded from the Geoapify Places API, shown as cards with a photo
- **Search, filter, sort:** search by name, filter by category (attractions, museums, parks, temples, restaurants, cafes and more), sort by name A-Z, Z-A or nearest first
- **Category themes:** the page background changes with the selected category
- **Destination details:** photo gallery, address, categories, coordinates, distance, live weather and a map link
- **My Trip:** add and remove places; the itinerary is saved in localStorage so it persists after refresh
- **Navigation badge:** shows how many places are in the trip
- **Loading, error and empty states:** a loading message, an error message with a Retry button, and friendly empty messages
- **Filters in the URL:** the selected category, search and sort are kept in the address, so the Back button returns to the same view
- **Responsive:** works on phones, tablets and desktops

## Tech stack
React, Vite, React Router, plain CSS, fetch API, localStorage. Deployed on Vercel.

## APIs used
| API | Used for | Key needed |
|---|---|---|
| [Geoapify Places API](https://www.geoapify.com/places-api/) | Places, categories, addresses, coordinates and distances | Yes |
| [Open-Meteo](https://open-meteo.com/) | Current weather on the details page | No |
| [Wikimedia Commons API](https://commons.wikimedia.org/) | Place photos | No |

Place data is © Geoapify and © OpenStreetMap contributors. Photos are from Wikimedia Commons and belong to their respective authors. Weather is by Open-Meteo.

## Setup
1. Clone the repository:
```
   git clone https://github.com/shriramjaju/TripWise.git
   cd TripWise
```
2. Install dependencies:
```
   npm install
```
3. Create a `.env` file in the project root (see `.env.example`):
```
   VITE_GEOAPIFY_KEY=your_geoapify_api_key
```
   Get a free key at https://myprojects.geoapify.com.
```
4. Start the app:
   npm run dev
```
   Open http://localhost:5173.

To make a production build, run `npm run build`.

## Project structure
```
src/
  api.js            API calls (places, details, weather, photos)
  TripContext.jsx   itinerary state, saved to localStorage
  PlaceImage.jsx    lazy-loaded card photo
  App.jsx           navigation bar, routes, footer
  pages/
    Explore.jsx     search, filter, sort and place cards
    Details.jsx     destination details page
    MyTrip.jsx      saved itinerary
vercel.json         makes page refreshes work on Vercel
```

## Notes
- The API key is read from an environment variable and is never committed to the repository.
- Some small places have no photos on Wikimedia Commons; the app shows a placeholder for those.
- The itinerary is stored in the browser only, so it is per device and per browser.