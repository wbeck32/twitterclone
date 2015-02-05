// Update with your config settings.

module.exports = {

 development: {
     client: 'postgres',
     debug: true,
     connection: {
       host: process.env.APP_DB_HOST || 'ec2-23-21-235-249.compute-1.amazonaws.com',
       user: process.env.APP_DB_USER || 'cgwxbpmxocodpp',
       password: process.env.APP_DB_PASSWORD || 'YQzoulId6qhy8NlRWaU5UoFOjd',
       database: process.env.APP_DB_NAME || 'd22j5k0tlt7cob',
       ssl: true
     },
 }
};