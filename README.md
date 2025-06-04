# Telecom Mission Control

Telecom Mission Control is a sample SaaS platform for managing cell towers, devices and carrier operations.
It provides a dashboard, tower registration, device discovery and policy management tools. The app is
designed to work globally and offline with full accessibility support. The frontend is implemented as a Progressive Web App (PWA) so users can access data even without a network connection.

For an architectural overview see [docs/SYSTEM_DESIGN.md](docs/SYSTEM_DESIGN.md).

## Features

- **Carrier/Tower compatibility** – know which tower allows which carrier, device and OS.
- **User activity tracking** – towers monitor the actions users perform in the app.
- **Security policies** – restrict or allow actions based on a user's role.
- **Plans**
  - _Basic_: view dashboards and monitor activity.
  - _Premium_: automatically fix issues by applying tower policies.
- **Real‑world tower data** – integrates tower information from different real estate owners.
- **Onboarding & discovery** – register new users and devices or auto‑discover enterprise devices.
- **Global & offline** – works worldwide even without internet access thanks to service workers.
- **Accessibility** – mobile‑responsive UI with ARIA labels for screen reader support.

## Project Structure

- **backend/** – Express server exposing REST APIs.
- **frontend/** – React + TypeScript client built with Vite.
- **models/** – JSON mock data for carriers, towers and devices.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   cd backend && npm install
   cd ../frontend && npm install --legacy-peer-deps
   ```
2. Copy `.env.example` to `.env` and update any values if required.
3. Start the development environment (runs server and client concurrently):
   ```bash
   npm start
   ```
   The API server will run on `http://localhost:8000` and the client on `http://localhost:5173`.
4. For a production build with offline capability:
   ```bash
   cd frontend && npm run build
   ```
5.Users to try
For testing or login purposes, users should follow one of the below formats based on their carrier:

username@att.com
username@verizon.com
username@tmobile.com
username@admin.com

Log in with any email. The domain before `.com` determines the carrier (e.g. `user@att.example.com`).

## Data

Sample data is located in the `models/` directory. `master.json` holds carrier and tower
information including policies and activity logs. `towers.json` contains towers that have not
been registered yet. Device discovery events are stored in `devicediscovery.json`.

## License

This project is provided for demo purposes and is licensed under the ISC license.


Screenshots for reference:

Login Page:
<img width="1508" alt="image" src="https://github.com/user-attachments/assets/c4269891-b72d-47ed-a382-72de46c4c37f" />

Landing Page(Dashboard):
<img width="1499" alt="image" src="https://github.com/user-attachments/assets/b9e1f0a3-6515-431e-9904-055ece595f41" />

Tower Registration Form:
<img width="1507" alt="image" src="https://github.com/user-attachments/assets/5a8e9e64-f568-423d-8e93-f6a49bf2f433" />

Device Discovery Input:
imulate device registration via the tower, which updates the database and reflects the changes in the recent activity log.
<img width="1500" alt="image" src="https://github.com/user-attachments/assets/9bf70d83-3312-40e5-8e23-ed8a3606908f" />

Policy Setup:
<img width="1508" alt="image" src="https://github.com/user-attachments/assets/7935635e-8524-4418-9a50-6602fb9c6c6a" />

User Action Log:
<img width="1512" alt="image" src="https://github.com/user-attachments/assets/3dee21bb-850d-4a55-9c42-27a5ea206c6f" />



