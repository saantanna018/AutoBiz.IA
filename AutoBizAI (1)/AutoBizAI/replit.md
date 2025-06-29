# AutoBiz.AI - SaaS Platform Replit Guide

## Overview

AutoBiz.AI is a modern SaaS platform that allows users to launch digital businesses automatically using artificial intelligence. The platform generates landing pages, email sequences, products, and marketing automation with minimal user input. This is a full-stack web application built with React, Express, and PostgreSQL.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: TailwindCSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized builds
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (Neon serverless) - configured and active
- **Storage**: DatabaseStorage implementation with PostgreSQL backend

### Project Structure
```
├── client/          # Frontend React application
├── server/          # Backend Express server
├── shared/          # Shared types and schemas
├── migrations/      # Database migration files
└── dist/           # Production build output
```

## Key Components

### Frontend Components
- **Landing Page**: Complete marketing site with hero, features, pricing, and testimonials
- **UI Library**: Comprehensive shadcn/ui components for consistent design
- **Responsive Design**: Mobile-first approach with glass morphism effects
- **Spanish Localization**: All content optimized for Spanish-speaking market

### Backend Services
- **Authentication**: User management with PostgreSQL storage
- **API Routes**: RESTful endpoints with Express middleware
- **Storage Layer**: Abstracted storage interface supporting multiple backends
- **Development Setup**: Hot reload with Vite integration

### Database Schema
- **Users Table**: Basic user authentication and profile management
- **Extensible Design**: Schema ready for business data, templates, and AI-generated content

## Data Flow

1. **User Registration**: Frontend signup modal → API validation → Database storage
2. **Authentication**: Session-based auth with cookie management
3. **Business Generation**: User input → AI processing (placeholder) → Database storage
4. **Content Delivery**: Static assets via Vite → Dynamic content via Express API

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database operations and migrations
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **@replit/vite-plugin-***: Replit-specific development enhancements
- **tsx**: TypeScript execution for development server
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development Mode
```bash
npm run dev  # Starts both frontend and backend with hot reload
```

### Production Build
```bash
npm run build  # Builds frontend and bundles backend
npm start     # Runs production server
```

### Database Management
```bash
npm run db:push  # Pushes schema changes to database
```

### Environment Requirements
- `DATABASE_URL`: PostgreSQL connection string (required for production)
- `NODE_ENV`: Environment mode (development/production)

### Hosting Configuration
- **Frontend**: Served as static files from `/dist/public`
- **Backend**: Express server on configurable port
- **Database**: PostgreSQL (Neon serverless recommended)

## Changelog
- June 29, 2025: Initial setup with complete landing page
- June 29, 2025: Added PostgreSQL database with user authentication storage

## User Preferences

Preferred communication style: Simple, everyday language.