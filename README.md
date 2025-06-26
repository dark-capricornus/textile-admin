# Textile Admin Dashboard

A comprehensive admin dashboard for textile business management built with Next.js and React.

## Project Structure

### Pages
- **Dashboard** (`/`) - Main overview with business metrics and analytics
- **Upload Products** (`/upload`) - Product management with bulk upload capabilities
- **Orders** (`/orders`) - Order tracking and management system
- **Delivery Tracking** (`/delivery-tracking`) - Real-time delivery status monitoring
- **Stocks** (`/stocks`) - Inventory management and stock levels
- **Expense** (`/expense`) - Financial expense tracking
- **Reviews & Ratings** (`/reviews`) - Customer feedback management
- **Advertisement** (`/advertisement`) - Marketing campaign management

### Core Features

#### Product Management
- Add new products with detailed information
- Color picker and size selection
- Image upload with preview
- Status management (Active/Inactive/Out of Stock)
- Product confirmation workflow
- Real-time table updates

#### Order Processing
- Order status tracking
- Customer information management
- Invoice generation
- Payment status monitoring

#### Delivery Tracking
- Shipment tracking integration
- Delivery partner management
- Real-time status updates
- Customer notification system

#### Inventory Control
- Stock level monitoring
- Low stock alerts
- Category-based filtering
- Search functionality

### Technical Implementation

#### Frontend Stack
- **Next.js 14** - React framework with App Router
- **React 18** - Component-based UI library
- **Tailwind CSS** - Utility-first styling framework

#### Components Architecture
- **Reusable UI Components** - Pagination, modals, forms
- **Layout Components** - Sidebar navigation, header
- **Feature Components** - Product forms, data tables
- **State Management** - React hooks for local state

#### Data Management
- **JSON Data Files** - Static data for products, orders, delivery
- **Client-side Filtering** - Search and category filtering
- **Pagination** - Efficient data presentation
- **Form Validation** - Input validation and error handling

### Key Functionalities

#### Product Workflow
1. Product form with comprehensive details
2. Image upload and preview
3. Confirmation page with review
4. Status-based categorization
5. Table integration with real-time updates

#### Order Management
- Order listing with status indicators
- Customer details and contact information
- Payment tracking and invoice management
- Delivery coordination

#### Tracking System
- Delivery status monitoring
- Tracking ID management
- Delivery partner integration
- Customer communication tools

#### Advertisement Management
- Campaign creation and editing
- Product showcasing
- Category-based organization
- Performance tracking

### File Structure
```
textile-admin/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── dashboard/
│   │   ├── upload/
│   │   ├── orders/
│   │   ├── delivery-tracking/
│   │   ├── stocks/
│   │   ├── expense/
│   │   ├── reviews/
│   │   └── advertisement/
│   └── components/             # Reusable components
│       ├── ui/
│       ├── orders/
│       └── forms/
├── data/                       # JSON data files
│   ├── productsData.json
│   ├── ordersData.json
│   └── deliveryData.json
├── public/                     # Static assets
└── components/                 # Shared components
    ├── Navbar.jsx
    ├── Sidebar.jsx
    ├── ProductForm.jsx
    └── ui/
```

### Development Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Build for Production
```bash
# Create production build
npm run build

# Start production server
npm start
```

### Features Overview

#### Dashboard Analytics
- Revenue tracking and charts
- Sales performance metrics
- Order status overview
- Inventory alerts

#### Product Management System
- Multi-step product creation
- Image gallery with upload
- Variant management (colors, sizes)
- Stock level tracking
- Category organization

#### Order Processing Pipeline
- Order status workflow
- Customer information capture
- Payment status tracking
- Invoice generation
- Delivery coordination

#### Delivery Tracking Interface
- Real-time tracking updates
- Delivery partner management
- Customer notification system
- Tracking ID assignment
- Status monitoring dashboard

#### Inventory Management
- Stock level monitoring
- Category-based organization
- Search and filter capabilities
- Low stock alerts
- Bulk operations

#### Financial Tracking
- Expense categorization
- Revenue analytics
- Profit margin calculations
- Financial reporting

#### Customer Feedback System
- Review collection
- Rating aggregation
- Response management
- Quality insights

#### Marketing Tools
- Advertisement campaign management
- Product showcase creation
- Performance analytics
- Customer targeting

This is a frontend-only application designed for comprehensive textile business administration with advanced product, order, delivery, and inventory management capabilities.
