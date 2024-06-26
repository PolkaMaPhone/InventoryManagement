const { Umzug, SequelizeStorage } = require('umzug');
const sequelize = require('./sequelize');
const Sequelize = require('sequelize');

let umzug;

async function runMigrations() {
    umzug = new Umzug({
        migrations: {
            glob: 'migrations/*.js',
            resolve: ({ name, path, context }) => {
                console.debug(`Migrator : Migrating: ${path}`);
                const migration = require(path || '');
                if (typeof migration.up !== 'function') {
                    throw new Error(`Migrator : Migration ${name} is missing the up method.`);
                }
                return {
                    name,
                    up: async () => migration.up(context, Sequelize),
                    down: async () => {
                        if (typeof migration.down !== 'function') {
                            throw new Error(`Migrator : Migration ${name} is missing the down method.`);
                        }
                        return migration.down(context, Sequelize);
                    },
                };
            },
        },
        context: sequelize.getQueryInterface(),
        storage: new SequelizeStorage({ sequelize }),
        //logger: console,
    });

    // Runs all pending migrations
    await umzug.up();
}

module.exports = { runMigrations };