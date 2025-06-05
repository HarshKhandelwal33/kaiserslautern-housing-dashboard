# Kaiserslautern Housing Dashboard

This is a simple web dashboard that visualizes housing data for Kaiserslautern.

## How to run

Because the application loads data via JavaScript, it must be served from a web
server. Open a terminal in the repository directory and run:

```bash
python3 -m http.server 8000
```

Then open your browser at [http://localhost:8000](http://localhost:8000) to view
the dashboard.

## Data files

The application expects the following data files in the `data` folder:

- `rent_data.json` – housing offers
- `districts.geojson` – district boundaries

If you do not have district boundaries available, a small sample file is
provided so the map loads without errors.

Internet access is required when loading the page so that Leaflet and map tiles can be retrieved from the CDNs used in `index.html`.
