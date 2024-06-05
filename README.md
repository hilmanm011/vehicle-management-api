# Vehicle Management API

Simple API to manage vehicle data using Node.js, Express, and MySQL.

## Prerequisite

- Node.js
- MySQL
- Postman (opsional, for API testing)

## Installation Steps

1. **Clone repositori:**

    ```sh
    git clone https://github.com/hilmanm011/vehicle-management-api.git
    cd vehicle-management
    ```

2. **Instal dependensi:**

    ```sh
    npm install
    ```

3. **Database Configuration:**

    - Create a MySQL database and table as below:

    ```sql
    CREATE DATABASE vehicle_management;

    USE vehicle_management;

    CREATE TABLE vehicles (
        vehicle_id INT PRIMARY KEY,
        type VARCHAR(50),
        lock_status ENUM('Lock', 'Unlock'),
        current_speed DECIMAL(5,2),
        battery_level INT,
        status ENUM('PARKING', 'MOVING', 'IDLING', 'TOWING'),
        location VARCHAR(50),
        last_updated TIMESTAMP
    );
    ```

    - Change the database connection information in `app.js` if necessary:

    ```javascript
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'your_password',
        database: 'vehicle_management'
    });
    ```

4. **Run Server:**

    ```sh
    node app.js
    ```

## Using APIs

Use Postman or another tool to test the following API endpoints:

### Get All Vehicles

- **Method:** GET
- **URL:** `http://localhost:3000/api/vehicles`
- **Example Response:**
  ```json
    {
        "status": 200,
        "message": "Successfully get data",
        "data": [...]
    }

### Get Vehicle by ID

- **Method:** GET
- **URL:** `http://localhost:3000/api/vehicles/:id`
- **Example Response:**
  ```json
    {
        "status": 200,
        "message": "Successfully get data",
        "data": {...}
    }

### Create a New Vehicle

- **Method:** POST
- **URL:** `http://localhost:3000/api/vehicles`
- **Example Body (JSON):**
  ```json
    {
        "vehicle_id": 125864,
        "type": "Scooter",
        "lock_status": "Lock",
        "current_speed": 0,
        "battery_level": 15,
        "status": "TOWING",
        "location": "5.125,114"
    }

- **Example Response:**
  ```json
    {
        "status": 201,
        "message": "Data created successfully",
        "data": {
            "vehicle_id": 125864,
            "type": "Scooter",
            "lock_status": "Lock",
            "current_speed": 0,
            "battery_level": 15,
            "status": "TOWING",
            "location": "5.125,114"
        }
    }

### Update Vehicle

- **Method:** PUT
- **URL:** `http://localhost:3000/api/vehicles/:id`
- **Example Body (JSON):**
  ```json
    {
        "type": "Scooter",
        "lock_status": "Unlock",
        "current_speed": 0,
        "battery_level": 15,
        "status": "TOWING",
        "location": "5.125,114"
    }

- **Example Response:**
  ```json
    {
        "status": 200,
        "message": "Data updated successfully",
        "data": {
            "type": "Scooter",
            "lock_status": "Unlock",
            "current_speed": 0,
            "battery_level": 15,
            "status": "TOWING",
            "location": "5.125,114"
        }
    }

### Delete Vehicle

- **Method:** DELETE
- **URL:** `http://localhost:3000/api/vehicles/:id`
- **Example Response:**
  ```json
    {
        "status": 200,
        "message": "Data deleted successfully",
        "data": null
    }