const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/sequelize'); 
const { applyAssociations } = require('./models/Associations');

// Importing route handlers
const itemRoutes = require('./routes/itemRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); 
const groupRoutes = require('./routes/groupRoutes');
const tubRoutes = require('./routes/tubRoutes');
const shelfRoutes = require('./routes/shelfRoutes');
const locationRoutes = require('./routes/locationRoutes');

const app = express();
const PORT = process.env.BACKEND_PORT || 3001;  // Define the default port or use environment variable

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());  // for parsing application/json
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Routes
app.use('/api/items', itemRoutes);
app.use('/api/categories', categoryRoutes);  
app.use('/api/groups', groupRoutes);  
app.use('/api/tubs', tubRoutes);
app.use('/api/shelves', shelfRoutes);
app.use('/api/locations', locationRoutes);

// Basic route for testing if the server is running
app.get('/', (req, res) => {
    res.send('Welcome to the Inventory Management System API!');
});

// import models and apply associations
const Category = require('./models/Category');
const Item = require('./models/Item');
const Group = require('./models/Group');
const Tub = require('./models/Tub');
const Shelf = require('./models/Shelf');
const Location = require('./models/Location');
applyAssociations(sequelize);

// Start server and sync database
sequelize.sync({ force: false })  // Set 'force' to true only if you want to drop and recreate tables
    .then(() => {
        console.log('Database connected and models are synced.');
        //console.log('Database connection details:', sequelize.config);
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        //console.log('Database connection details:', sequelize.config);
        console.error('Failed to sync database: ' + err.message);
        process.exit(1);
    });

module.exports = app;
