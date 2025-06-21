# Web3 MetaMask Platform

## Overview

This is a modern full-stack Web3 application built with React, Express, and blockchain integration. The platform provides a comprehensive MetaMask wallet connection interface with multi-chain support, portfolio management, and analytics capabilities. It features a sleek UI with shadcn/ui components and Tailwind CSS styling, designed to offer users a seamless Web3 experience across multiple blockchain networks.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: React hooks with TanStack Query for server state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom MetaMask-themed color variables
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Development**: Hot reload with Vite middleware integration
- **Storage**: In-memory storage with interface for easy database migration
- **API**: RESTful API structure (routes to be implemented)

### Blockchain Integration
- **Wallet**: MetaMask wallet connection and interaction
- **Networks**: Multi-chain support (Ethereum, BSC, Polygon, Avalanche)
- **Web3 Library**: Ethers.js for blockchain interactions
- **Provider**: Browser-injected Ethereum provider detection

## Key Components

### Web3 Integration
- **useWeb3 Hook**: Custom hook managing wallet connection state, network switching, and blockchain operations
- **Network Support**: Pre-configured network definitions for major chains with automatic switching
- **Wallet State**: Persistent connection status, balance tracking, and account management
- **Transaction Handling**: Token merge functionality and transaction management

### UI Components
- **Web3NodeMerger**: Main wallet connection and network selection interface
- **PlatformSection**: Feature showcase with MetaMask branding
- **PortfolioSection**: Portfolio overview and quick actions
- **AnalyticsSection**: Performance metrics and market insights
- **Layout**: Responsive navigation with section-based scrolling

### User Interface
- **Responsive Design**: Mobile-first approach with desktop optimizations
- **Theme System**: Light/dark mode support with CSS custom properties
- **Component Library**: Comprehensive shadcn/ui components (buttons, cards, forms, etc.)
- **Toast Notifications**: User feedback system for actions and errors

## Data Flow

### Wallet Connection Flow
1. User initiates wallet connection through Web3NodeMerger component
2. useWeb3 hook detects MetaMask availability and requests account access
3. Upon connection, hook fetches account balance and network information
4. State updates trigger UI changes across all connected components
5. Network switching requests are handled with automatic provider updates

### State Management
- **Local State**: Component-level state for UI interactions
- **Web3 State**: Custom hook managing blockchain-related state
- **Query State**: TanStack Query for server-side data caching and synchronization
- **Toast State**: Global notification system for user feedback

## External Dependencies

### Blockchain Libraries
- **@neondatabase/serverless**: Database driver (PostgreSQL compatible)
- **ethers**: Ethereum library for blockchain interactions
- **drizzle-orm**: Type-safe ORM with PostgreSQL support

### UI Dependencies
- **@radix-ui/***: Accessible component primitives
- **@tanstack/react-query**: Server state management
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **wouter**: Lightweight routing

### Development Tools
- **vite**: Build tool and dev server
- **typescript**: Type safety and enhanced DX
- **tsx**: TypeScript execution for server development
- **esbuild**: Fast bundling for production builds

## Deployment Strategy

### Development Environment
- **Replit Integration**: Optimized for Replit development environment
- **Hot Reload**: Vite middleware provides instant feedback during development
- **PostgreSQL**: Database provisioning through Replit modules
- **Port Configuration**: Configured for port 5000 with external access

### Production Build
- **Static Assets**: Frontend builds to dist/public directory
- **Server Bundle**: Express server bundled with esbuild for production
- **Environment Variables**: Database URL and other config through environment
- **Deployment Target**: Autoscale deployment on Replit infrastructure

### Database Strategy
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Type Safety**: Generated TypeScript types from database schema
- **Development Storage**: In-memory storage for rapid prototyping
- **Production Ready**: PostgreSQL integration ready for scaling

## Changelog

Changelog:
- June 21, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.