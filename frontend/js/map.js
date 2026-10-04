// ================= NISAR INTERACTIVE MAP =================
// FE2 - Nova Matrics VI | Enhanced Version

// ================= AOI LOCATIONS =================
const AOI_LOCATIONS = {
    dhaka:     { lat: 23.8103, lng: 90.4125, zoom: 10, name: "Dhaka, Bangladesh" },
    sundarban: { lat: 21.9497, lng: 89.1833, zoom: 10, name: "Sundarbans" },
    sylhet:    { lat: 24.8949, lng: 91.8687, zoom: 10, name: "Sylhet Haor" },
    chittagong:{ lat: 22.3569, lng: 91.7832, zoom: 10, name: "Chittagong" },
    rangpur:   { lat: 25.7439, lng: 89.2752, zoom: 10, name: "Rangpur" }
};

// ================= DISASTER MODES =================
const DISASTER_MODES = {
    flood:     { label: "🌊 Flood",     color: "#27c9ff", icon: "🌊" },
    landslide: { label: "⛰️ Landslide", color: "#ff8c42", icon: "⛰️" },
    glacier:   { label: "❄️ Glacier",   color: "#b477ff", icon: "❄️" },
    vegetation:{ label: "🌿 Vegetation", color: "#44ff44", icon: "🌿" }
};

// ================= MAP INIT =================
const map = L.map('map', {
    center: [23.8103, 90.4125],
    zoom: 10,
    zoomControl: false,        // custom position
    attributionControl: false,
    preferCanvas: true         // performance
});

L.control.zoom({ position: 'bottomright' }).addTo(map);

// ================= BASE LAYERS =================
const darkLayer = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    { maxZoom: 16, attribution: 'Tiles &copy; Esri' }
);

const satelliteLayer = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    { maxZoom: 19, attribution: 'Tiles &copy; Esri' }
);

const terrainLayer = L.tileLayer(
    'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    { maxZoom: 17, attribution: 'Map data &copy; OpenStreetMap' }
);

darkLayer.addTo(map);

L.control.layers({
    "🌑 Dark Map": darkLayer,
    "🛰️ Satellite": satelliteLayer,
    "🗺️ Terrain": terrainLayer
}, null, { position: 'topright' }).addTo(map);

// ================= LAYER GROUPS =================
const aoiLayer = L.layerGroup().addTo(map);
const changeLayer = L.layerGroup().addTo(map);
const bufferLayer = L.layerGroup().addTo(map);

// ================= AOI MARKERS =================
const aoiMarkers = {};
Object.keys(AOI_LOCATIONS).forEach(key => {
    const aoi = AOI_LOCATIONS[key];
    const marker = L.circleMarker([aoi.lat, aoi.lng], {
        radius: 9,
        color: '#27c9ff',
        fillColor: '#27c9ff',
        fillOpacity: 0.6,
        weight: 2
    }).addTo(aoiLayer);

    marker.bindPopup(`
        <div style="font-family:sans-serif">
            <b style="color:#27c9ff">📍 ${aoi.name}</b><br>
            <small>Lat: ${aoi.lat.toFixed(4)}<br>Lng: ${aoi.lng.toFixed(4)}</small>
        </div>
    `);

    aoiMarkers[key] = marker;
});

// ================= AOI SELECT HANDLER =================
document.getElementById('aoi-select').addEventListener('change', (e) => {
    const aoi = AOI_LOCATIONS[e.target.value];
    if (aoi) {
        map.flyTo([aoi.lat, aoi.lng], aoi.zoom, { duration: 1.5 });
    }
});

// ================= SIMULATED SAR CHANGE DATA =================
// বাস্তবে BE2 এর Python pipeline থেকে আসবে
function generateChangeData(aoiKey, mode) {
    const aoi = AOI_LOCATIONS[aoiKey];
    if (!aoi) return [];

    // AOI এর চারপাশে random change polygons
    const changes = [];
    const numChanges = Math.floor(Math.random() * 4) + 3; // 3-6 changes

    for (let i = 0; i < numChanges; i++) {
        const offsetLat = (Math.random() - 0.5) * 0.15;
        const offsetLng = (Math.random() - 0.5) * 0.15;
        const size = (Math.random() * 0.02) + 0.01;

        const center = [aoi.lat + offsetLat, aoi.lng + offsetLng];
        const severity = Math.random() > 0.5 ? 'high' : 'low';
        const areaKm2 = (Math.random() * 5 + 0.5).toFixed(2);

        changes.push({
            center,
            radius: size * 111, // degree → km approx
            severity,
            areaKm2,
            mode
        });
    }
    return changes;
}

// ================= RENDER CHANGE DETECTION =================
function renderChanges(changes, mode) {
    changeLayer.clearLayers();
    bufferLayer.clearLayers();

    const modeConfig = DISASTER_MODES[mode] || DISASTER_MODES.flood;

    changes.forEach((change, idx) => {
        // Color based on severity
        const color = change.severity === 'high' ? '#ff4444' : '#ffaa00';

        // Change circle
        const circle = L.circle(change.center, {
            radius: change.radius * 1000,
            color: color,
            fillColor: color,
            fillOpacity: 0.35,
            weight: 2,
            dashArray: '5,5'
        }).addTo(changeLayer);

        circle.bindPopup(`
            <div style="font-family:sans-serif; min-width:180px">
                <b style="color:${color}">${modeConfig.icon} ${modeConfig.label} Change #${idx+1}</b><br>
                <small>
                    <b>Severity:</b> ${change.severity.toUpperCase()}<br>
                    <b>Area:</b> ${change.areaKm2} km²<br>
                    <b>Center:</b> ${change.center[0].toFixed(4)}, ${change.center[1].toFixed(4)}
                </small>
            </div>
        `);

        // Pulse animation (buffer circle)
        const buffer = L.circle(change.center, {
            radius: change.radius * 1300,
            color: color,
            fillOpacity: 0.05,
            weight: 1,
            opacity: 0.3
        }).addTo(bufferLayer);

        // Animate pulse
        let scale = 1;
        const pulse = setInterval(() => {
            scale += 0.05;
            if (scale > 1.5) scale = 1;
            buffer.setRadius(change.radius * 1000 * scale);
        }, 100);
        buffer._pulseInterval = pulse;
    });
}

// ================= LOAD BUTTON HANDLER =================
document.getElementById('load-btn').addEventListener('click', async () => {
    const aoi = document.getElementById('aoi-select').value;
    const date1 = document.getElementById('date1').value;
    const date2 = document.getElementById('date2').value;
    const mode = document.getElementById('mode-select')?.value || 'flood';

    // Validate dates
    if (!date1 || !date2) {
        showToast('⚠️ অনুগ্রহ করে দুটি তারিখ নির্বাচন করুন', 'error');
        return;
    }
    if (new Date(date1) >= new Date(date2)) {
        showToast('⚠️ Date 2 অবশ্যই Date 1 এর পরে হতে হবে', 'error');
        return;
    }

    // Loading state
    const btn = document.getElementById('load-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '⏳ Loading SAR Data...';
    btn.disabled = true;

    showToast(`🛰️ Loading ${DISASTER_MODES[mode].label} data for ${AOI_LOCATIONS[aoi].name}...`, 'info');

    // Simulate API delay (BE2 integration point)
    await new Promise(resolve => setTimeout(resolve, 1800));

    // Generate & render changes
    const changes = generateChangeData(aoi, mode);
    renderChanges(changes, mode);

    // Update stats
    updateStats({
        totalChanges: changes.length,
        totalArea: changes.reduce((sum, c) => sum + parseFloat(c.areaKm2), 0).toFixed(2),
        highSeverity: changes.filter(c => c.severity === 'high').length,
        aoi: AOI_LOCATIONS[aoi].name,
        date1, date2, mode
    });

    // Reset button
    btn.innerHTML = originalText;
    btn.disabled = false;

    showToast(`✅ ${changes.length} changes detected in ${AOI_LOCATIONS[aoi].name}`, 'success');
});

// ================= STATS PANEL =================
function updateStats(data) {
    const statsPanel = document.getElementById('stats-panel');
    if (!statsPanel) return;

    statsPanel.style.display = 'block';
    statsPanel.innerHTML = `
        <h4 style="color:#27c9ff; margin-bottom:10px;">📊 Detection Results</h4>
        <div class="stat-row"><span>📍 AOI:</span> <b>${data.aoi}</b></div>
        <div class="stat-row"><span>🎯 Changes:</span> <b style="color:#ff4444">${data.totalChanges}</b></div>
        <div class="stat-row"><span>📐 Area:</span> <b style="color:#ffd43b">${data.totalArea} km²</b></div>
        <div class="stat-row"><span>🔴 High Severity:</span> <b>${data.highSeverity}</b></div>
        <div class="stat-row"><span>📅 Date Range:</span> <b style="font-size:0.75rem">${data.date1} → ${data.date2}</b></div>
        <div class="stat-row"><span>🎭 Mode:</span> <b>${DISASTER_MODES[data.mode].label}</b></div>
    `;
}

// ================= TOAST NOTIFICATIONS =================
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    const colors = {
        info:    '#27c9ff',
        success: '#44ff44',
        error:   '#ff4444'
    };

    toast.style.borderColor = colors[type];
    toast.style.color = colors[type];
    toast.textContent = message;
    toast.style.display = 'block';
    toast.style.opacity = '1';

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.style.display = 'none', 300);
    }, 3500);
}

// ================= INIT =================
console.log('✅ NISAR Interactive Map initialized (Enhanced v2.0)');
