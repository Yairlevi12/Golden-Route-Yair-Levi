# Drone Monitoring System

A self-contained application to detect and visualize potential collisions between a hostile drone and real-world aircraft in a user-defined danger radius. The system:

* Accepts a drone’s latitude, longitude, danger radius, and drone speed.
* Queries the OpenSky API for live aircraft within the radius.
* Calculates closure times for each plane vs. the drone.
* Plots both drone and aircraft icons on an interactive map with a red danger circle.
* Persists query history and aircraft logs in a PostgreSQL database via Prisma.
* Allows export of past checks and captured data.

---

## 🛠️ Tech Stack

* **Frontend:** React with Leaflet.js for mapping
* **Backend:** Express.js, Axios for API calls
* **Database:** PostgreSQL, managed through Prisma ORM
* **Containerization:** Docker & Docker Compose

---

## 🚀 Getting Started

### Prerequisites

* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/)
* Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Yairlevi12/Golden-Route-Yair-Levi.git
   cd Golden-Route-Yair-Levi
   ```

2. **Make sure your docker is oprn in the background and run in GitBash**


   ```bash
   docker-compose up -d --build
   ```

4. **Verify**

   * Frontend: [http://localhost:3000](http://localhost:3000)
   * Backend API: [http://localhost:5000](http://localhost:5000)

---

## 🧭 Usage

1. Open the web app at **[http://localhost:3000](http://localhost:3000)**.
2. Enter the drone’s **Latitude**, **Longitude**, **Radius (km)**, and **Speed (km/h)**.
3. View the red circle and icons for drone and endangered aircraft on the map.
4. Click any plane marker for callsign/license and closure time.


---

## 📦 Data Export

On the UI click **Export History** to download a CSV of all previous checks and detected aircraft logs.

---

## An illustraion for the UI:
![image](https://github.com/user-attachments/assets/dcd7c08b-4888-43c6-a6ba-526bd49a7db5)

## Note:

Because of the API Limitaions, can happen that the planes and the map will not show instantly. it is a rare situation but in this case all you need is to wait until the API limit will reset at 00:00.




---
