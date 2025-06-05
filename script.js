window.addEventListener('load', function() {
  // Initialize map
  var map = L.map('map').setView([49.444, 7.769], 13);

  // Add OSM basemap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Invalidate size after the page has fully loaded
  setTimeout(() => {
    map.invalidateSize();
  }, 500);

  // Load districts (GeoJSON)
  //fetch('data/districts.geojson')
  //  .then(response => response.json())
  //  .then(geojsonData => {
  //    L.geoJSON(geojsonData, {
  //      style: {
 //        color: '#555',
  //        weight: 2,
   //       fillOpacity: 0.1
   //     },
   //     onEachFeature: function (feature, layer) {
  //        layer.bindPopup("District: " + feature.properties.name);
   //     }
   //   }).addTo(map);
    //  populateDistrictDropdown(geojsonData);
   // });

  // Load housing data and create heatmap
  fetch('data/rent_data.json')
    .then(response => response.json())
    .then(data => {
      updateHeatmap(data);
      createCharts(data);
    });

  // Populate district dropdown
  function populateDistrictDropdown(geojsonData) {
    const dropdown = document.getElementById('districtSelect');
    geojsonData.features.forEach(f => {
      const option = document.createElement('option');
      option.value = f.properties.name;
      option.text = f.properties.name;
      dropdown.add(option);
    });
  }

  // Update heatmap based on filters
  function updateHeatmap(data) {
    const rentValue = document.getElementById('rentRange').value;
    const rooms = document.getElementById('roomSelect').value;
    const selectedDistrict = document.getElementById('districtSelect').value;

    const filteredData = data.filter(d => {
      return d.rent <= rentValue &&
        (rooms === "All" || d.rooms >= parseInt(rooms)) &&
        (selectedDistrict === "All" || d.district === selectedDistrict);
    });

    const heatPoints = filteredData.map(d => [d.latitude, d.longitude, d.rent / 1000]);
    if (window.heatLayer) {
      map.removeLayer(window.heatLayer);
    }
    window.heatLayer = L.heatLayer(heatPoints, {radius: 25}).addTo(map);
  }

  // Hook up filters
  document.getElementById('rentRange').addEventListener('input', e => {
    document.getElementById('rentValue').innerText = e.target.value;
    fetch('data/rent_data.json')
      .then(response => response.json())
      .then(updateHeatmap);
  });

  document.getElementById('roomSelect').addEventListener('change', () => {
    fetch('data/rent_data.json')
      .then(response => response.json())
      .then(updateHeatmap);
  });

  document.getElementById('districtSelect').addEventListener('change', () => {
    fetch('data/rent_data.json')
      .then(response => response.json())
      .then(updateHeatmap);
  });

  // Create charts with D3.js
  function createCharts(data) {
    // Chart1: Rent vs. Size
    var svg1 = d3.select("#chart1").append("svg")
      .attr("width", "100%")
      .attr("height", "100%");
    // TODO: Add scatter plot logic here

    // Chart2: Rent by District
    var svg2 = d3.select("#chart2").append("svg")
      .attr("width", "100%")
      .attr("height", "100%");
    // TODO: Add bar chart logic here
  }
});
