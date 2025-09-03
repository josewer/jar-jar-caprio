import dotenv from "dotenv";
dotenv.config();

export default {
  db: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    pass: process.env.POSTGRES_PASS,
    name: process.env.POSTGRES_DATABASE,
    port: process.env.POSTGRES_PORT,
  },
  port: process.env.APP_PORT || 3000
};