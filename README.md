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
   cd ../frontend && npm install
   ```
2. Start the development environment (runs server and client concurrently):
   ```bash
   npm start
   ```
   The API server will run on `http://localhost:8000` and the client on `http://localhost:5173`.
3. For a production build with offline capability:
   ```bash
   cd frontend && npm run build
   ```

Log in with any email. The domain before `.com` determines the carrier (e.g. `user@att.example.com`).

## Data

Sample data is located in the `models/` directory. `master.json` holds carrier and tower
information including policies and activity logs. `towers.json` contains towers that have not
been registered yet. Device discovery events are stored in `devicediscovery.json`.

## License

This project is provided for demo purposes and is licensed under the ISC license.
