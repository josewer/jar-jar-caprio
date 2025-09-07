
process.loadEnvFile()

export default {
    db: {
        postgres: {
            host: process.env.POSTGRES_HOST,
            user: process.env.POSTGRES_USER,
            pass: process.env.POSTGRES_PASS,
            name: process.env.POSTGRES_DATABASE,
            port: process.env.POSTGRES_PORT
        }
    },
    app: {
        port: process.env.APP_PORT || 3000
    },
    cors: {
        validOrigins: process.env.CORS_ORIGINS
            ? process.env.CORS_ORIGINS.split(",")
            : []
    }
};
