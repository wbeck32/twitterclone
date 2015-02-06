// Update with your config settings.

module.exports = {

 development: {
     client: 'postgres',
     debug: true,
     connection: {
       host: process.env.APP_DB_HOST || 'ec2-54-163-254-93.compute-1.amazonaws.com',
       user: process.env.APP_DB_USER || 'ldqeltazrierdk',
       password: process.env.APP_DB_PASSWORD || 'p9JpAAkaVOIgZfipLQngSO0OlT',
       database: process.env.APP_DB_NAME || 'd98hq4v524b470',
       ssl: true
     },
 }
};