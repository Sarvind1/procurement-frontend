# Procurement Frontend

A modern React-based frontend for the Procurement & Inventory Management System with Amazon SP-API integration.

## 🚀 Features

- **Dashboard Analytics** - Real-time insights and KPIs
- **Product Management** - Full CRUD operations for products
- **Inventory Tracking** - Monitor stock levels and movements
- **Purchase Orders** - Create and manage purchase orders
- **Supplier Management** - Maintain supplier database
- **Amazon Integration** - Sync with Amazon SP-API
- **Import/Export** - CSV file support for bulk operations
- **Authentication** - JWT-based secure authentication
- **Responsive Design** - Works on desktop and mobile devices

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Query** for server state management
- **React Router** for navigation
- **React Hook Form** for form handling
- **Zustand** for client state management
- **Chart.js & Recharts** for data visualization
- **Axios** for API calls
- **Lucide React** for icons

## 📋 Prerequisites

- Node.xs 18+ and npm/yarn
- Backend API running on http://localhost:8000

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sarvind1/procurement-frontend.git
   cd procurement-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:8000/api/v1
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 in your browser

## 🏗️ Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── ui/         # Basic UI components (Button, Input, etc.)
│   └── ...         # Feature-specific components
├── features/        # Feature-specific components
├── hooks/          # Custom React hooks
├── layouts/        # Page layouts (Main, Auth)
├── lib/            # Utilities and helpers
├── pages/          # Route pages
├── services/       # API service functions
├── stores/         # Zustand state stores
├── types/          # TypeScript type definitions
└── App.tsx         # Main app component
```

## 🔐 Authentication

The app includes demo authentication for testing:

- **Admin User**: 
  - Username: `admin`
  - Password: `admin123`
  
- **Regular User**: 
  - Username: `user`
  - Password: `user123`

For production, connect to your actual backend authentication endpoint.

## 📱 Key Pages

### Dashboard
- Overview statistics
- Low stock alerts
- Recent purchase orders
- Top products by value

### Products
- Product listing with search
- Add/Edit/Delete products
- Stock level indicators
- Active/Inactive status

### Inventory
- Track inventory movements
- Record new movements (purchase, sale, adjustment, return)
- Movement history with filtering

### Purchase Orders
- Create and manage POs
- Track order status
- Supplier integration
- Expected delivery dates

### Amazon Integration
- SP-API connection status
- Sync orders and inventory
- View Amazon products
- Manual and automatic sync options

### Import/Export
- CSV file upload
- Bulk import products, inventory, POs, and suppliers
- Export data to CSV
- Download templates

## 🔄 API Integration

The frontend expects the following API endpoints:

- `POST /api/v1/auth/login` - User authentication
- `GET /api/v1/auth/me` - Get current user
- `GET/POST/PUT/DELETE /api/v1/products` - Product CRUD
- `GET/POST /api/v1/inventory` - Inventory movements
- `GET/POST /api/v1/purchase-orders` - Purchase orders
- `GET/POST /api/v1/suppliers` - Suppliers
- `GET/POST /api/v1/amazon/*` - Amazon integration

## 🎨 Styling

The project uses Tailwind CSS with a custom color palette:

```javascript
primary: {
  50: '#eff6ff',
  100: '#dbeafe',
  // ... through 900
}
```

## 📦 Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

The build output will be in the `dist` directory.

## 🚀 Deployment

### Using Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Set environment variables
4. Deploy

### Using Netlify

1. Build the project locally
2. Deploy the `dist` folder
3. Set up redirects for client-side routing

### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🧪 Testing

```bash
# Run linter
npm run lint

# Type checking
npm run type-check
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with React and Vite
- UI components inspired by Tailwind UI
- Icons from Lucide React
- Charts powered by Chart.js and Recharts