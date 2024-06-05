const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

// MySQL connection
// Setting Up Connection to MySQL
// Use mysql2 to create a connection to a MySQL database.
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vehicle_management'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// Helper function to format responses
const formatResponse = (status, message, data) => {
    return {
        status,
        message,
        data
    };
};

// Get all vehicles
app.get('/api/vehicles', (req, res) => {
    const sql = 'SELECT * FROM vehicles';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(formatResponse(200, 'Successfully get data', results));
    });
});

// Get vehicle by ID
app.get('/api/vehicles/:id', (req, res) => {
    const sql = 'SELECT * FROM vehicles WHERE vehicle_id = ?';
    db.query(sql, req.params.id, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json(formatResponse(200, 'Successfully get data', result[0]));
        } else {
            res.status(404).json(formatResponse(404, 'Data not found', null));
        }
    });
});

// Create a new vehicle
app.post('/api/vehicles', (req, res) => {
    const newVehicle = req.body;
    const sql = 'INSERT INTO vehicles SET ?';
    db.query(sql, newVehicle, (err, result) => {
        if (err) throw err;
        res.status(201).json(formatResponse(201, 'Data created successfully', newVehicle));
    });
});

// Update vehicle by ID
app.put('/api/vehicles/:id', (req, res) => {
    const sql = 'UPDATE vehicles SET ? WHERE vehicle_id = ?';
    db.query(sql, [req.body, req.params.id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.json(formatResponse(200, 'Data updated successfully', req.body ));
        } else {
            res.status(404).json(formatResponse(404, 'Data not found', null));
        }
    });
});

// Delete vehicle by ID
app.delete('/api/vehicles/:id', (req, res) => {
    const sql = 'DELETE FROM vehicles WHERE vehicle_id = ?';
    db.query(sql, req.params.id, (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.status(200).json(formatResponse(200, 'Data deleted successfully', null));
        } else {
            res.status(404).json(formatResponse(404, 'Data not found', null));
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
