# User API Usage

**Base URL:** `http://localhost:3000`

---

## Headers

* `x-api-key: secret123` *(required for all requests)*

---

## Endpoints

### 1. Get all users

`GET /users`
Headers: `x-api-key: secret123`

---

### 2. Get user by ID

`GET /users/:id`
Example: `/users/3`
Headers: `x-api-key: secret123`

---

### 3. Filter users by role

`GET /users?role=admin`
Query Params:

* `role` (e.g., admin)
  Headers: `x-api-key: secret123`

---

### 4. Filter users by age range

`GET /users?minAge=28&maxAge=35`
Query Params:

* `minAge` (number)
* `maxAge` (number)
  Headers: `x-api-key: secret123`

---

### 5. Sort users

`GET /users?sort=name&order=asc`
Query Params:

* `sort` (field name, e.g., name or age)
* `order` (asc or desc)
  Headers: `x-api-key: secret123`

---

### 6. Pagination

`GET /users?limit=2&page=1`
Query Params:

* `limit` (number of results per page)
* `page` (page number)
  Headers: `x-api-key: secret123`

---

**Note:** All requests require the header `x-api-key` with value `secret123`. Requests without the API key will return 401 Unauthorized.

---


