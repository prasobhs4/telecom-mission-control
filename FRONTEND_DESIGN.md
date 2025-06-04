# Frontend Architecture Overview

This document summarizes the approach used to build a high assurance and accessible frontend.

## Accessibility and Mobile Responsiveness
- All forms include labels and ARIA attributes for screen reader support.
- Layouts are built with MUI which provides responsive design out of the box.
- Additional CSS uses relative units so the UI adapts to phones, tablets and desktops.

## Offline Support
- The React app is configured as a Progressive Web App using `vite-plugin-pwa`.
- Service workers cache assets and API responses enabling the UI to operate when network connectivity is lost.

## Scalability
- State management relies on Redux Toolkit for predictable data flow.
- Components are written in TypeScript and organized by feature for easy maintenance.

## Usage
Run `npm start` during development. For production build with PWA support, run `cd frontend && npm run build`.
