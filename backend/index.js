const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/sequelize');

// Importing route handlers
const itemRoutes = require('./routes/itemRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const groupRoutes = require('./routes/groupRoutes');
const tubRoutes = require('./routes/tubRoutes');
const shelfRoutes = require('./routes/shelfRoutes');
const locationRoutes = require('./routes/locationRoutes');

// import models and apply associations
// const { applyAssociations } = require('./models/Associations');
// const Category = require('./models/Category');
// const Group = require('./models/Group');
// const Location = require('./models/Location');
// const Item = require('./models/Item');
// const Tub = require('./models/Tub');
// const Shelf = require('./models/Shelf');
// applyAssociations(sequelize);

const app = express();
const PORT = process.env.VITE_BACKEND_PORT || 3001;  // Define the default port or use environment variable

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // support json encoded bodies
app.use((err, req, res, next) => {
    console.error('Index :', err.stack);
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

async function recreateAndSeed() {
    console.log('Index : Dropping tables and re-creating them.');
    await sequelize.sync({ force: true });

    try {
        // Run the migrations
        await require('./config/migrator').runMigrations();
        console.log('Index : Migrations run successfully.');
    } catch (error) {
        console.error('Index : Failed to run migrations: ' + error.message);
        process.exit(1);
    }

    // Run the seeders
    await require('./config/seeder').runSeeders(sequelize);
}

async function connectAndStartServer() {
    await sequelize.sync({ force: false });
    console.log('Index : Database connected and models are synced.');
    app.listen(PORT, () => console.log(`Index : Server running on port ${PORT}`));
}

// console.debug('NODE_ENV:', process.env.NODE_ENV);
// console.debug('sequelize config in index.js', sequelize.config);
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
    recreateAndSeed()
        .then(() => app.listen(PORT, () => console.log(`Index : Server running on port ${PORT}`)))
        .catch(err => {
            console.debug('Index : Database connection details:', sequelize.config);
            console.error('Index : Failed to sync database: ' + err.message);
            process.exit(1);
        });
} else {
    connectAndStartServer()
        .catch(err => {
            console.debug('Index : Database connection details:', sequelize.config);
            console.error('Index : Failed to sync database: ' + err.message);
            process.exit(1);
        });
}

module.exports = app;
