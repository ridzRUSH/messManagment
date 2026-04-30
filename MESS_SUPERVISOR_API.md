# Mess Supervisor API Implementation

## Overview

The Mess Supervisor module provides comprehensive ration item management and consumption tracking functionality for hostel mess operations.

## Database Schema

### New Tables Added

#### `supplier`
```sql
CREATE TABLE supplier (
    supplier_id INT AUTO_INCREMENT PRIMARY KEY,
    hostel_id INT,
    name VARCHAR(100),
    contact_info VARCHAR(255),
    FOREIGN KEY (hostel_id) REFERENCES hostel(hostel_id)
);
```

#### `ration_item`
```sql
CREATE TABLE ration_item (
    ration_item_id INT AUTO_INCREMENT PRIMARY KEY,
    hostel_id INT,
    name VARCHAR(100),
    unit VARCHAR(20),  -- KG, LITRE, PIECE, PACKET
    unit_cost DECIMAL(10,2),
    supplier_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hostel_id) REFERENCES hostel(hostel_id),
    FOREIGN KEY (supplier_id) REFERENCES supplier(supplier_id)
);
```

#### `ration_consumption`
```sql
CREATE TABLE ration_consumption (
    consumption_id INT AUTO_INCREMENT PRIMARY KEY,
    ration_item_id INT,
    hostel_id INT,
    date DATE,
    quantity DECIMAL(10,2),
    cost DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ration_item_id) REFERENCES ration_item(ration_item_id),
    FOREIGN KEY (hostel_id) REFERENCES hostel(hostel_id)
);
```

## API Endpoints

### Base URL: `/api/mess-supervisor`

### 1. Add Ration Item
**POST** `/add-ration-item`

**Request Body:**
```json
{
  "name": "Rice",
  "unit": "KG",
  "unit_cost": 50.00,
  "supplier_id": 1,
  "hostel_id": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Ration item added successfully",
  "data": {
    "ration_item_id": 1,
    "name": "Rice",
    "unit": "KG",
    "unit_cost": 50.00,
    "supplier_id": 1,
    "hostel_id": 1
  }
}
```

### 2. Get Ration Items
**GET** `/get-ration-items?hostel_id=1`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "ration_item_id": 1,
      "hostel_id": 1,
      "name": "Rice",
      "unit": "KG",
      "unit_cost": 50.00,
      "supplier_id": 1,
      "supplier_name": "Local Grocery Store"
    }
  ]
}
```

### 3. Update Ration Item
**POST** `/update-ration-item/1`

**Request Body:**
```json
{
  "name": "Premium Rice",
  "unit": "KG",
  "unit_cost": 55.00,
  "supplier_id": 1,
  "hostel_id": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Ration item updated successfully"
}
```

### 4. Delete Ration Item
**DELETE** `/delete-ration-item/1`

**Request Body:**
```json
{
  "hostel_id": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Ration item deleted successfully"
}
```

### 5. Get Monthly Consumption
**GET** `/monthly-consumption?hostel_id=1&year=2024&month=1`

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "total_monthly_cost": 15000.00,
      "active_days": 25,
      "items_used": 8
    },
    "consumption": [
      {
        "item_name": "Rice",
        "unit": "KG",
        "total_quantity": 150.5,
        "total_cost": 7525.00,
        "days_used": 25
      }
    ]
  }
}
```

## Frontend Integration

### API Functions (`frontend/src/api/messSupervisor.ts`)

```typescript
// Add new ration item
export const addRationItem = (data: {
  name: string;
  unit: string;
  unit_cost: number;
  supplier_id: number;
  hostel_id: number;
}) => axiosInstance.post("/mess-supervisor/add-ration-item", data);

// Get all ration items for a hostel
export const getRationItems = (hostel_id: number) =>
  axiosInstance.get("/mess-supervisor/get-ration-items", {
    params: { hostel_id }
  });

// Update ration item
export const updateRationItem = (
  id: number,
  data: {
    name: string;
    unit: string;
    unit_cost: number;
    supplier_id: number;
    hostel_id: number;
  }
) => axiosInstance.post(`/mess-supervisor/update-ration-item/${id}`, data);

// Delete ration item
export const deleteRationItem = (id: number, hostel_id: number) =>
  axiosInstance.delete(`/mess-supervisor/delete-ration-item/${id}`, {
    data: { hostel_id }
  });

// Get monthly consumption report
export const getMonthlyConsumption = (hostel_id: number, year: number, month: number) =>
  axiosInstance.get("/mess-supervisor/monthly-consumption", {
    params: { hostel_id, year, month }
  });
```

## Sample Data

### Suppliers
```sql
INSERT INTO supplier (supplier_id, hostel_id, name, contact_info) VALUES
(1, 1, 'Local Grocery Store', 'Phone: 9876543210'),
(2, 1, 'Fresh Vegetables Supplier', 'Phone: 9876543211'),
(3, 1, 'Rice & Grains Depot', 'Phone: 9876543212');
```

### Ration Items
```sql
INSERT INTO ration_item (ration_item_id, hostel_id, name, unit, unit_cost, supplier_id) VALUES
(1, 1, 'Rice', 'KG', 50.00, 3),
(2, 1, 'Dal', 'KG', 120.00, 1),
(3, 1, 'Vegetables', 'KG', 40.00, 2),
(4, 1, 'Cooking Oil', 'LITRE', 150.00, 1),
(5, 1, 'Spices', 'PACKET', 25.00, 1);
```

## Testing the API

### 1. Start the System
```bash
# Backend + Database
docker compose -f docker-compose.dev.yaml up --build

# Frontend
cd frontend && npm run dev
```

### 2. Login as Mess Supervisor
- Email: Create a staff record with role 'MESS_SUPERVISOR'
- Use the login flow to authenticate

### 3. Test Endpoints
```bash
# Get ration items
GET /api/mess-supervisor/get-ration-items?hostel_id=1

# Add new item
POST /api/mess-supervisor/add-ration-item
{
  "name": "Sugar",
  "unit": "KG",
  "unit_cost": 45.00,
  "supplier_id": 1,
  "hostel_id": 1
}

# Get monthly consumption
GET /api/mess-supervisor/monthly-consumption?hostel_id=1&year=2024&month=1
```

## Error Handling

All endpoints return standardized error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common Error Codes
- `400` - Bad Request (missing/invalid parameters)
- `401` - Unauthorized (invalid JWT)
- `403` - Forbidden (insufficient role permissions)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

## Security

- **Authentication**: JWT token required
- **Authorization**: `MESS_SUPERVISOR` role required for write operations
- **Validation**: Input validation on all endpoints
- **Hostel Isolation**: All operations scoped to user's hostel

## Integration Points

### With Mess Secretary
- Mess Supervisor manages the master list of ration items
- Mess Secretary records daily consumption using these items
- Monthly reports combine item definitions with consumption data

### With Dashboard
- Students can view available ration items (read-only)
- Mess Supervisor can manage items through dedicated dashboard

## Future Enhancements

1. **Supplier Management**: Full CRUD operations for suppliers
2. **Inventory Tracking**: Stock level monitoring
3. **Purchase Orders**: Integration with procurement system
4. **Cost Analysis**: Advanced reporting and analytics
5. **Barcode Integration**: For inventory management