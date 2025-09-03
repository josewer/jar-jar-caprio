import { Pool } from 'pg';
import config from '../../config.js'


// Configuración de conexión
const pool = new Pool({
  user: config.db.user,
  host: config.db.host,
  database: config.db.name,
  password: config.db.pass,
  port: config.db.port,
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