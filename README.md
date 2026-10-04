# 🛰️ Nova Matrics - VI | Dancing with the SARs

> **NISAR Mission Dashboard** — NASA Space Apps Challenge 2026

[![NASA Space Apps](https://img.shields.io/badge/NASA-Space%20Apps-0B3D91?style=for-the-badge&logo=nasa&logoColor=white)](https://www.spaceappschallenge.org/)
[![NISAR](https://img.shields.io/badge/Mission-NISAR-27C9FF?style=for-the-badge)](https://nisar.jpl.nasa.gov/)
[![Made with](https://img.shields.io/badge/Made%20with-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 🌍 About the Project

**Dancing with the SARs** is an interactive web dashboard built for the **NASA Space Apps Challenge** that visualizes and analyzes data from the **NISAR (NASA-ISRO Synthetic Aperture Radar)** mission. The project uses SAR (Synthetic Aperture Radar) imagery to detect surface changes on Earth — including **floods, landslides, glacier movements, and vegetation shifts**.

By combining **Python-based SAR data processing** with **AI-powered change detection** and an **interactive Leaflet map**, this dashboard helps visualize disaster impact and environmental changes in near real-time.

---

## 🎯 Key Features

- 🗺️ **Interactive Leaflet Map** — Pan, zoom, and explore SAR data on a live map
- 🔄 **Before/After Image Slider** — Compare SAR imagery from different dates
- 🧠 **AI Change Detection** — CNN-based model identifies surface changes
- 🌊 **Disaster Visualization** — Floods, landslides, and glacier retreat highlighting
- 📊 **NISAR Data Pipeline** — Automatic `.h5` file parsing and layer extraction
- 🎨 **NASA-Themed UI** — Dark space-themed responsive dashboard

---

## 🏗️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript, Leaflet.js, Chart.js |
| **Backend** | Python, Rasterio, GDAL, NumPy |
| **Data** | NISAR GCOV/GUNW, HDF5 (.h5), GeoTIFF |
| **AI/ML** | PyTorch, TensorFlow, Image Differencing |
| **Tools** | ASF Vertex, earthaccess, QGIS, Panoply |

---

## 👥 Team Nova Matrics - VI

| Member | Role | Responsibility |
| :--- | :--- | :--- |
| **Backend Dev 1** | Data Pipeline | ASF Vertex API, earthaccess, data download |
| **Backend Dev 2** | Image Processing | Rasterio, GDAL, `.h5` parsing |
| **Frontend Dev 1** | UI/UX + Research | NISAR products, before/after slider |
| **Frontend Dev 2** | Visualization | Leaflet, Deck.gl, WebGL |
| **AI Specialist** | ML Engineer | CNN-based change detection |
| **Presenter** | Storytelling | Disaster impact presentation |

---

## 📁 Project Structure
## 📁 Google Drive Structure

The project files are organized in Google Drive as follows:

```text
EARTH-PULSE/
│
├── 00_ADMIN/
│   ├── Team_Members/
│   ├── Roles_and_Responsibilities/
│   └── Project_Management/
│
├── 01_RESEARCH/
│   ├── NISAR_Mission/
│   ├── SAR_Research/
│   ├── Floods/
│   ├── Landslides/
│   ├── Glacier_Movement/
│   └── Vegetation_Change/
│
├── 02_DATASETS/
│   ├── NISAR_GCOV/
│   ├── NISAR_GUNW/
│   ├── HDF5/
│   ├── GeoTIFF/
│   ├── Training_Data/
│   └── Test_Data/
│
├── 03_AI_ANALYTICS/
│   ├── Models/
│   ├── Training/
│   ├── Change_Detection/
│   ├── Results/
│   └── Notebooks/
│
├── 04_BACKEND/
│   ├── Python/
│   ├── Data_Pipeline/
│   ├── Raster_Processing/
│   ├── GDAL/
│   ├── Rasterio/
│   └── API/
│
├── 05_FRONTEND/
│   ├── HTML/
│   ├── CSS/
│   ├── JavaScript/
│   ├── Leaflet/
│   ├── Charts/
│   └── Components/
│
├── 06_DESIGN_ASSETS/
│   ├── Logos/
│   ├── Icons/
│   ├── Maps/
│   ├── UI_Assets/
│   └── Images/
│
├── 07_PRESENTATION/
│   ├── Slides/
│   ├── Demo/
│   ├── Screenshots/
│   └── Speaker_Notes/
│
├── 08_VIDEO/
│   ├── Raw_Footage/
│   ├── Satellite_Animations/
│   ├── Screen_Recordings/
│   ├── Voiceover/
│   └── Final_Video/
│
├── 09_SUBMISSION/
│   ├── Final_Code/
│   ├── Final_Presentation/
│   ├── Project_Description/
│   ├── Demo_Video/
│   └── Submission_Assets/
│
└── 10_ARCHIVE/
    ├── Old_Versions/
    ├── Backup/
    └── Unused_Data/
