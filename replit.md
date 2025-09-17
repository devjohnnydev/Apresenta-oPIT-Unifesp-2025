# Overview

This is a full-stack presentation application built with React/TypeScript frontend and Express.js backend. The application allows users to create, edit, and present slide-based presentations with various content types including charts, discussions, and multimedia content. It features a modern UI with shadcn/ui components, real-time slide editing capabilities, and fullscreen presentation mode.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with CSS custom properties for theming support
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for smooth transitions and animations
- **Charts**: Chart.js for data visualization capabilities

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Validation**: Zod schemas for runtime type validation and data parsing
- **Storage**: In-memory storage implementation with interface for future database integration
- **API Design**: RESTful API endpoints for CRUD operations on presentations

## Data Storage Solutions
- **Primary Database**: PostgreSQL with Neon serverless driver configured
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Session Storage**: PostgreSQL session store with connect-pg-simple
- **Development Storage**: In-memory storage fallback for development and testing

## Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL session store
- **Security**: CORS handling and request logging middleware implemented
- **User Context**: Session-based authentication ready for implementation

## External Dependencies
- **Database**: Neon PostgreSQL serverless database
- **Fonts**: Google Fonts integration (Inter, Architects Daughter, DM Sans, Fira Code, Geist Mono)
- **Icons**: FontAwesome icons for slide type indicators
- **Development**: Replit-specific plugins for development environment integration
- **Deployment**: Built for Node.js production deployment with ESBuild bundling

## Key Features
- **Slide Management**: Create, edit, and organize presentation slides with different content types (intro, content, charts, discussions, conclusions, references)
- **Real-time Editing**: Live editing capabilities with form validation and error handling
- **Presentation Mode**: Fullscreen presentation view with navigation controls
- **Content Types**: Support for various slide content including text, charts, multimedia, and interactive elements
- **Responsive Design**: Mobile-friendly interface with adaptive layouts
- **Export Capabilities**: PDF export functionality for presentations