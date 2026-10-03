// ================= NISAR INTERACTIVE MAP =================
// FE2 - Nova Matrics VI

const AOI_LOCATIONS = {
    dhaka:     { lat: 23.8103, lng: 90.4125, zoom: 10, name: "Dhaka, Bangladesh" },
    sundarban: { lat: 21.9497, lng: 89.1833, zoom: 10, name: "Sundarbans" },
    sylhet:    { lat: 24.8949, lng: 91.8687, zoom: 10, name: "Sylhet Haor" }
};

const map = L.map('map', {
    center: [23.8103, 90.4125],
    zoom: 10,
    zoomControl: true,
    attributionControl: false
});

// ================= BASE LAYERS (Key-less) =================

// 🌑 Dark Map — ESRI Dark Gray Canvas (NO API KEY)
const darkLayer = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    {
        maxZoom: 16,
        attribution: 'Tiles &copy; Esri'
    }
);

// 🛰️ Satellite — ESRI World Imagery
const satelliteLayer = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
        maxZoom: 19,
        attribution: 'Tiles &copy; Esri'
    }
);

// 🗺️ Terrain — OpenTopoMap
const terrainLayer = L.tileLayer(
    'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    {
        maxZoom: 17,
        attribution: 'Map data &copy; OpenStreetMap contributors'
    }
);

// Default layer
darkLayer.addTo(map);

// Layer switcher (top-right)
L.control.layers({
    "🌑 Dark Map": darkLayer,
    "🛰️ Satellite": satelliteLayer,
    "🗺️ Terrain": terrainLayer
}, null, { position: 'topright' }).addTo(map);

// ================= AOI MARKERS =================
Object.keys(AOI_LOCATIONS).forEach(key => {
    const aoi = AOI_LOCATIONS[key];
    const marker = L.circleMarker([aoi.lat, aoi.lng], {
        radius: 8,
        color: '#27c9ff',
        fillColor: '#27c9ff',
        fillOpacity: 0.5,
        weight: 2
    }).addTo(map);

    marker.bindPopup(`<b>${aoi.name}</b>`);
});

// ================= AOI SELECT HANDLER =================
document.getElementById('aoi-select').addEventListener('change', (e) => {
    const aoi = AOI_LOCATIONS[e.target.value];
    if (aoi) {
        map.flyTo([aoi.lat, aoi.lng], aoi.zoom, { duration: 1.5 });
    }
});

// ================= LOAD BUTTON =================
document.getElementById('load-btn').addEventListener('click', () => {
    const aoi = document.getElementById('aoi-select').value;
    const date1 = document.getElementById('date1').value;
    const date2 = document.getElementById('date2').value;
    console.log('🔄 Load clicked:', { aoi, date1, date2 });
    alert(`Loading SAR data for ${aoi}\nDate 1: ${date1}\nDate 2: ${date2}\n\n(BE2 data integration coming next!)`);
});

console.log('✅ NISAR Map initialized');