# Courier Service Application

A modern courier service application built with the PERN stack (PostgreSQL, Express, React, Node.js) using TypeScript. This application allows clients to create and track shipments, while providing administrative capabilities for managing the courier service operations.

## Features

- User Registration and Authentication
- Shipment Creation and Management
- Real-time Shipment Tracking
- User Dashboard for Shipment Overview
- Admin Dashboard for Shipment Management
- Responsive and Modern UI
- Secure Authentication and Authorization
- Error Handling and Validation

## Tech Stack

- React 18
- TypeScript
- Material-UI
- Redux Toolkit
- React Router
- React Hook Form
- Yup Validation
- TailwindCSS
- Lucide Icons
- Vite

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm (recommended) or yarn package manager

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/MadurangaDev/bconic_assignment_fe.git
cd bconic_assignment_fe
```

### 2. Install Dependencies

```bash
npm install
```

### 5. Running the Application

1. Backend server must be running

2. In a new terminal, start the frontend development server:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173

## Project Structure

```
bconic_assignment_fe/
├── .git/
├── node_modules/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── atoms/
│   │   ├── layouts/
│   │   ├── modals/
│   │   ├── sections/
│   │   ├── RouteGuards.tsx
│   │   └── index.ts
│   ├── configs/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   │   ├── auth/
│   │   ├── AdminDashboard.tsx
│   │   ├── LandingPage.tsx
│   │   ├── ShipmentCreation.tsx
│   │   ├── ShipmentTracking.tsx
│   │   ├── UserDashboard.tsx
│   │   └── index.ts
│   ├── providers/
│   ├── redux/
│   ├── services/
│   ├── typings/
│   ├── utils/
│   ├── index.tsx
│   └── vite-env.d.ts
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Future Enhancements

1. Real-time shipment tracking using WebSocket
2. Mobile application development
3. Integration with third-party logistics providers
4. Advanced analytics dashboard
5. Automated route optimization
6. Customer feedback and rating system
7. Bulk shipment creation
8. Integration with payment gateways
9. Multi-language support
10. Advanced reporting features