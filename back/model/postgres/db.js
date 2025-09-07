import { Pool } from 'pg';
import config from '../../config.js';

// Configuración de conexión
const pool = new Pool({
  user: config.db.postgres.user,
  host: config.db.postgres.host,
  database: config.db.postgres.name,
  password: config.db.postgres.pass,
  port: config.db.postgres.port,
  options: '-c search_path=public'
});

// Probar la conexión
pool.connect()
  .then(client => {
    console.log('Conectado a PostgreSQL');
    client.release();
  })
  .catch(err => console.error('Error conectando a PostgreSQL', err));

export default pool;
