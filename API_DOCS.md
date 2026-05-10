# Keyhox Backend API Documentation

**Base URL:** `http://localhost:5000/api`  
**Auth:** `Authorization: Bearer <token>` (where required)

---

## Auth

### POST `/auth/register`
Register a new user.

**Body:**
```json
{ "name": "John", "email": "john@example.com", "password": "secret123" }
```
**Response `201`:**
```json
{
  "message": "Registration successful",
  "token": "<jwt>",
  "user": { "id", "name", "email", "role", "createdAt", "updatedAt" }
}
```
**Errors:** `400` validation, `409` email already registered

---

### POST `/auth/login`
Login with email and password.

**Body:**
```json
{ "email": "john@example.com", "password": "secret123" }
```
**Response `200`:**
```json
{
  "message": "Login successful",
  "token": "<jwt>",
  "user": { "id", "name", "email", "role", "createdAt", "updatedAt" }
}
```
**Errors:** `400` validation, `401` invalid credentials

---

### GET `/users/me`
Get current logged-in user. 🔒 Auth required.

**Response `200`:**
```json
{
  "user": { "id", "name", "email", "role", "createdAt" }
}
```

---

## Products (Public)

### GET `/products`
Get all active products with available stock count.

**Response `200`:**
```json
{
  "products": [
    {
      "id", "name", "slug", "description", "price",
      "category", "imageUrl", "stock", "createdAt"
    }
  ],
  "total": 5
}
```

---

### GET `/products/:slug`
Get a single product by slug.

**Response `200`:**
```json
{
  "product": {
    "id", "name", "slug", "description", "price",
    "category", "imageUrl", "stock", "createdAt"
  }
}
```
**Errors:** `404` not found

---

## Products (Admin) 🔒 ADMIN only

### POST `/products`
Create a new product.

**Body:**
```json
{
  "name": "Windows 11 Pro",
  "description": "Genuine license key",
  "price": 29.99,
  "category": "Operating Systems",
  "imageUrl": "https://..." // optional
}
```
**Response `201`:**
```json
{ "message": "Product created successfully", "product": { ... } }
```
**Errors:** `400` missing fields / invalid price

---

### PUT `/products/:id`
Update a product. All fields optional.

**Body (any subset):**
```json
{
  "name": "...", "description": "...", "price": 19.99,
  "category": "...", "imageUrl": "...", "isActive": false
}
```
**Response `200`:**
```json
{ "message": "Product updated successfully", "product": { ... } }
```
**Errors:** `404` not found, `400` invalid price

---

### DELETE `/products/:id`
Delete a product (only if it has no keys).

**Response `200`:**
```json
{ "message": "Product deleted successfully" }
```
**Errors:** `404` not found, `400` has existing keys (deactivate instead)

---

### GET `/admin/products`
Get all products (including inactive) with key counts.

**Response `200`:**
```json
{
  "products": [
    {
      "id", "name", "slug", "description", "price", "category",
      "imageUrl", "isActive", "createdAt", "updatedAt",
      "stock": 10,       // available keys
      "soldCount": 5,
      "totalKeys": 15
    }
  ]
}
```

---

## Key Inventory (Admin) 🔒 ADMIN only

### POST `/products/:productId/keys`
Bulk add license keys to a product.

**Body:**
```json
{ "keys": ["KEY-001", "KEY-002", "KEY-003"] }
```
**Response `201`:**
```json
{
  "message": "Keys added successfully",
  "summary": { "submitted": 3, "added": 2, "skipped": 1 },
  "skippedKeys": ["KEY-001"],
  "productId": "..."
}
```
**Errors:** `400` invalid input, `404` product not found, `409` all keys already exist

---

### GET `/products/:productId/keys?status=AVAILABLE`
Get keys for a product. Optional `status` filter: `AVAILABLE` | `SOLD` | `RESERVED`.

**Response `200`:**
```json
{
  "productId": "...",
  "filter": "AVAILABLE",
  "counts": { "available": 10, "sold": 5, "reserved": 0, "total": 15 },
  "keys": [
    { "id", "licenseKey", "status", "assignedTo", "assignedAt", "createdAt" }
  ]
}
```
**Errors:** `404` product not found

---

### DELETE `/keys/:keyId`
Delete a single key (only AVAILABLE keys can be deleted).

**Response `200`:**
```json
{ "message": "Key deleted successfully", "keyId": "..." }
```
**Errors:** `404` not found, `400` key is SOLD or RESERVED

---

### GET `/admin/inventory`
Get inventory summary across all products.

**Response `200`:**
```json
{
  "summary": [
    {
      "productId", "productName", "slug", "isActive",
      "availableStock", "soldCount", "totalKeys"
    }
  ],
  "totals": {
    "totalProducts": 5,
    "totalKeysInSystem": 100,
    "totalAvailable": 60,
    "totalSold": 40
  }
}
```

---

## Health Check

### GET `/health`
Check if the API is running.

**Response `200`:**
```json
{ "status": "OK", "message": "Keyhox API is live" }
```

---

## Notes for Frontend Integration

- JWT token expires in **7 days**. Store in `localStorage` or context.
- `role` in JWT payload: `"CUSTOMER"` or `"ADMIN"`
- `price` is returned as a Decimal string from Prisma — parse with `parseFloat()`
- `stock` on public product endpoints = count of AVAILABLE keys
- Slug is auto-generated from product name (e.g. `"Windows 11 Pro"` → `"windows-11-pro"`)
- Admin routes require `role === "ADMIN"` in the JWT
