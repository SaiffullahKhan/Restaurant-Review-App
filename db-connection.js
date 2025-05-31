const mysql = require('mysql');

// Use environment variables with fallback values for local development
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'restaurant_review',
  connectionLimit: 10, // Good practice for createPool
  waitForConnections: true,
  queueLimit: 0
};

const connection = mysql.createPool(dbConfig);

// Verify connection on startup
connection.getConnection((err, conn) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database as id', conn.threadId);
  conn.release(); // Release the connection back to the pool
});

// Handle connection errors
connection.on('error', (err) => {
  console.error('MySQL pool error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    // Reconnect if connection is lost
    connection.getConnection();
  } else {
    throw err;
  }
});

module.exports = connection;