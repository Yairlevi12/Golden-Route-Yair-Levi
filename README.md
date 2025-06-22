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

2. **Configure environment variables**

   Copy the sample and fill in your OpenSky credentials:

   ```bash
   cat > backend/.env << 'EOF'
   EXTERNAL_API_URL=https://opensky-network.org/api/states/all
   EXTERNAL_API_USERNAME=<YOUR_OPENSKY_CLIENT_ID>
   EXTERNAL_API_PASSWORD=<YOUR_OPENSKY_PASSWORD>
   DATABASE_URL="postgresql://postgres:password@db:5432/drone_db"
   EOF
   ```

3. **Bring up the services**

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
3. Click **Check** (or wait for automatic polling).
4. View the red circle and icons for drone and endangered aircraft on the map.
5. Click any plane marker for callsign/license and closure time.

### cURL Example

```bash
curl -X POST http://localhost:5000/api/check \
  -H "Content-Type: application/json" \
  -d '{
    "latitude": "51.4700",
    "longitude": "-0.4543",
    "radius": "50",
    "speed": "900"
  }'
```

---

## 📦 Data Export

On the UI click **Export History** to download a CSV of all previous checks and detected aircraft logs.

---

## An illustraion for the UI:
![image](https://github.com/user-attachments/assets/ee02151e-b630-4bab-9a35-e364e328f621)


---
