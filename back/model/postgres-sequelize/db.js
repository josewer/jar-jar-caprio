import { Sequelize, DataTypes } from 'sequelize';
import config from '../../config.js';

// conexión a PostgreSQL
const sequelize = new Sequelize(
  config.db.postgres.name
  , config.db.postgres.user
  , config.db.postgres.pass
  , {
    host: config.db.postgres.host,
    port: config.db.postgres.port,
    dialect: 'postgres',
    logging: (msg) => console.debug('[SQL] ' + msg)
  });

// definir modelo
export const exerciseModel = sequelize.define('Exercise', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  muscle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  tableName: 'exercise',
  timestamps: false // desactiva createdAt y updatedAt
}
);
