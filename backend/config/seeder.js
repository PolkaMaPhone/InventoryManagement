const { spawn } = require('child_process');

function runSeeders(sequelize) {
    console.log('Seeder : Starting Seed');
    return new Promise((resolve, reject) => {
        const seed = spawn('npx', ['sequelize-cli', 'db:seed:all'], {
            stdio: 'inherit', // This will show all output from the command in the terminal
            shell: true, // For Windows compatibility
            env: { ...process.env, SCHEMA: sequelize.config.dialectOptions.searchPath } // Pass environment variables to the new process
        });

        seed.on('exit', (code) => {
            if (code === 0) {
                console.log('Seeder : Seed successful');
                resolve();
            } else {
                reject(new Error('Seeding failed'));
            }
        });
    });
}

module.exports = { runSeeders };