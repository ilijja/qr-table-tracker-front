# Restaurant Management System
A comprehensive web application for restaurant table management, digital menu ordering, and payment processing.

---

## What the Project Does
**Restaurant Management System** is a full-stack web application that digitizes restaurant operations. Restaurant owners can create interactive table maps, manage digital menus, and track orders in real-time. Customers scan QR codes at tables to view menus, place orders, and pay bills directly from their devices.

---

## Key Features

### Table Management
- **Interactive Map Editor**: Create and customize restaurant floor plans
- **Drag-and-Drop Interface**: Position tables with precise coordinates
- **Real-Time Status**: Visual indicators for table states (available, ordered, occupied, paid)
- **QR Code Generation**: Automatic QR code creation for each table

### Menu Management
- **Dynamic Menu Creation**: Build multiple menus with categories and products
- **Product Management**: Add items with descriptions, prices, and images
- **Category Organization**: Group products into logical categories
- **Image Upload**: Support for product photos with Multer integration

### Order System
- **QR Code Ordering**: Customers scan table QR codes to access menus
- **Real-Time Updates**: WebSocket integration for instant order notifications
- **Order Tracking**: Staff can accept, process, and complete orders
- **Status Management**: Visual feedback for order progression

### Payment Processing
- **Stripe Integration**: Secure payment processing
- **Bill Splitting**: Customers can split bills or pay individually
- **Tip Options**: Built-in gratuity calculation
- **Payment Confirmation**: Automatic status updates after successful payments

---

## Frontend Architecture

### Technology Stack
- **React.js**: Component-based user interface
- **Vite**: Fast development build tool
- **TailwindCSS**: Utility-first styling framework
- **React Router**: Client-side routing and navigation
- **Context API**: Global state management

### Component Structure
- **Components Directory**: Reusable UI components
- **Pages Directory**: Route-specific page components
- **Store Directory**: Context providers for state management
- **Hooks**: Custom React hooks for business logic

### Key Frontend Features

#### Interactive Map Editor
Built with **Konva.js** for canvas-based table manipulation:
- **Stage Component**: Main drawing area for table placement
- **Layer Management**: Organized rendering of table elements
- **Transform Controls**: Resize and rotate tables with visual handles
- **Shape Support**: Rectangle and circle table shapes

```javascript
const MapEditorContainer = ({ data }) => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);

  return (
    <Stage onMouseMove={handleMouseMove} onClick={handleStageClick}>
      <Layer>
        {tables.map(table => (
          <Table key={table._id} {...table} />
        ))}
      </Layer>
    </Stage>
  );
};
```

#### Global State Management
**Context API** implementation for managing application state:

**MapContext**: Handles table maps and positioning
```javascript
const MapContext = createContext({
  maps: [],
  currentMap: null,
  setMaps: () => {},
  setCurrentMap: () => {},
  setContextTables: () => {},
});
```

**ProductContext**: Manages menus, categories, and products
```javascript
const ProductContext = createContext({
  menus: [],
  categories: [],
  products: [],
  addMenu: (menu) => {},
  addCategory: (category) => {},
  addProduct: (product) => {},
});
```

**OrderContext**: Controls order processing and cart management
```javascript
const OrderContext = createContext({
  order: [],
  userSelectedItems: [],
  setOrder: () => {},
  addUserSelectedItems: () => {},
});
```

#### Real-Time Communication
**WebSocket Integration** for live updates:
```javascript
useEffect(() => {
  const socket = openSocket('http://localhost:8080');
  socket.on('table', table => {
    setTable(table.table);
  });
  return () => socket.disconnect();
}, []);
```

#### Authentication System
**JWT Token Management** with React Router loaders:
```javascript
export async function loader() {
  const token = getAuthToken();
  if (!token) {
    return redirect('/login');
  }
  // Protected route logic
}
```

### User Interface Components

#### Table Management Interface
- **Map List**: Display all created restaurant maps
- **Table Editor**: Drag-and-drop table positioning
- **Properties Panel**: Configure table names, shapes, and colors
- **Action Buttons**: Generate QR codes, delete tables, save changes

#### Menu Management Interface
- **Menu Builder**: Create and organize multiple menus
- **Category Manager**: Add and edit product categories
- **Product Editor**: Manage items with images, descriptions, and pricing
- **Modal Forms**: Streamlined data entry for all entities

#### Customer Ordering Interface
- **QR Code Scanner Landing**: Direct access to table-specific menus
- **Product Gallery**: Visual menu with images and descriptions
- **Shopping Cart**: Add, remove, and modify order quantities
- **Order Summary**: Review items before submission

#### Payment Interface
- **Bill Review**: Itemized order breakdown
- **Split Payment**: Individual or shared payment options
- **Tip Calculator**: Automatic gratuity suggestions
- **Stripe Checkout**: Secure payment processing

---

## User Workflows

### Restaurant Owner Workflow
1. **Setup**: Register restaurant account and configure basic information
2. **Map Creation**: Design restaurant floor plan with interactive table editor
3. **Menu Building**: Create menus with categories and products
4. **QR Generation**: Generate and print QR codes for each table
5. **Order Management**: Monitor incoming orders and update statuses

### Customer Workflow
1. **QR Scan**: Scan table QR code with smartphone
2. **Menu Browse**: View restaurant menu with product details
3. **Order Placement**: Add items to cart and submit order
4. **Payment**: Pay bill individually or split with table companions
5. **Confirmation**: Receive payment confirmation and updated table status

### Staff Workflow
1. **Order Monitoring**: View incoming orders in real-time dashboard
2. **Order Processing**: Accept and prepare customer orders
3. **Status Updates**: Mark orders as completed when ready
4. **Table Management**: Monitor table statuses and turnover

---

## Technical Implementation

### State Management Architecture
The application uses React Context API with useReducer hooks for complex state management:

- **Centralized State**: Global contexts eliminate prop drilling
- **Reducer Pattern**: Predictable state updates with action-based modifications
- **Performance Optimization**: useCallback and useMemo for expensive operations
- **Real-Time Sync**: WebSocket integration maintains state consistency

### Component Lifecycle
- **Data Fetching**: React Router loaders handle server-side data loading
- **Authentication**: Token-based protection with automatic redirects
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Loading States**: Progressive loading indicators for better UX

### Responsive Design
- **Mobile-First**: Optimized for smartphone QR code scanning
- **Tablet Support**: Enhanced interface for staff order management
- **Desktop Admin**: Full-featured management interface for restaurant owners
- **Cross-Browser**: Compatible with modern web browsers

---

## Development Setup

### Prerequisites
- Node.js 18+ and npm
- Modern web browser
- Development server for API backend

### Installation
```bash
npm install
npm run dev
```

### Development Server
Application runs on `http://localhost:5173/` with Vite hot reload for rapid development.

---

This restaurant management system provides a complete digital solution for modern restaurant operations, from table management to payment processing, all built with modern React.js architecture and real-time communication capabilities.
