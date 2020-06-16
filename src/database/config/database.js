module.exports = {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    dbport: 5432,
    define: {
        timestamps: true,
        underscored: true,
    },
};