# System Design Overview

This document describes the high level design of **Telecom Mission Control**.

## Functional Requirements
- Provide dashboards summarizing carrier activity, towers and devices.
- Allow registration of towers to carriers.
- Simulate device discovery events and log activity.
- Apply security policies per carrier or globally.
- Query user activity logs within a date range.

## APIs
- `GET /api/dashboard?carrier=` – fetch dashboard metrics for a carrier.
- `GET /api/towers` – list towers waiting to be registered.
- `POST /api/register-tower` – register a tower to a carrier.
- `POST /api/simulate-device` – record a new device discovery event.
- `GET /api/device-discovery` – list discovered devices.
- `POST /api/policy` – apply a policy to one or all carriers.
- `GET /api/user-logs?carrier=&start=&end=` – return activity entries.

## Estimated Scale
The sample data represents thousands of towers and devices with tens of
thousands of activity log entries. In production, the architecture can scale to
many carriers each owning thousands of towers and hundreds of thousands of
devices.

## Data Models
- **master.json** – primary store containing carriers, their towers, applied
  policies and recent activity.
- **towers.json** – towers that have not yet been registered.
- **devicediscovery.json** – discovered devices awaiting action.

## Non-Functional Goals
- **Reliability** – simple Express server with JSON persistence for demo
  purposes; can be replaced with a database for higher reliability.
- **Security** – CORS enabled REST APIs with role based policy application.
- **Scalability** – stateless APIs that can run behind a load balancer.
- **Maintainability** – frontend and backend code are organized by feature.

## Component Descriptions
- **Backend** – Node/Express server exposing REST endpoints and updating JSON
  files as a lightweight data store.
- **Frontend** – React + TypeScript Progressive Web App served via Vite. Uses
  Redux Toolkit for state management.
- **Models** – JSON files under `models/` hold mock data. They are loaded and
  updated by the backend server.

## Mitigations
- Activity logs enable auditing of policy changes and tower registrations.
- Policies applied to carriers propagate to their towers ensuring consistency.
- Input validation on the server returns proper status codes for missing data.

## Offline & Accessibility Notes
- The frontend is configured as a PWA so assets and API responses are cached via
  service workers. Users can view previously loaded data when offline.
- All UI components include ARIA labels and work with screen readers. Layouts are
  responsive for mobile and desktop use.
