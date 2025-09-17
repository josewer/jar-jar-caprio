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


export const userModel = sequelize.define('user', {
  id: { type: DataTypes.UUID, primaryKey: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  birth_date: { type: DataTypes.DATE },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  weight: { type: DataTypes.DECIMAL(5,2) },
  height: { type: DataTypes.DECIMAL(5,2) },
  avatar: { type: DataTypes.STRING }
}, {
  tableName: 'sec_user',
  timestamps: false
});

export const templateRoutineModel = sequelize.define('template_routine', {
  id: { type: DataTypes.UUID, primaryKey: true },
  user_id: { type: DataTypes.UUID, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT }
}, {
  tableName: 'template_routine',
  timestamps: false
});


export const templateExercisesModel = sequelize.define('template_exercises', {
  id: { type: DataTypes.UUID, primaryKey: true },
  routine_id: { type: DataTypes.UUID, allowNull: false },
  exercise_id: { type: DataTypes.UUID, allowNull: false },
  num_series: { type: DataTypes.INTEGER },
  num_repeats: { type: DataTypes.INTEGER }
}, {
  tableName: 'template_exercises',
  timestamps: false
});


export const catExerciseModel = sequelize.define('CAT_EXERCISES', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  mainMuscle: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: "main_muscle" // para mapear al snake_case de Postgres
  },
  difficulty: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 3
    }
  },
  involvedMuscles: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    field: "involved_muscles"
  },
  equipment: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  }
}, {
  tableName: 'cat_exercise', // minúscula y plural es lo estándar
  timestamps: false
});


export const exerciseDoneModel = sequelize.define('exercise_done', {
  id: { type: DataTypes.UUID, primaryKey: true },
  session_id: { type: DataTypes.UUID, allowNull: false },
  exercise_id: { type: DataTypes.UUID, allowNull: false },
  series: { type: DataTypes.INTEGER },
  repeats_per_series: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
  weight_per_series: { type: DataTypes.ARRAY(DataTypes.DECIMAL(5,2)) },
  comments: { type: DataTypes.TEXT }
}, {
  tableName: 'exercise_done',
  timestamps: false
});


export const trainingSessionModel = sequelize.define('training_session', {
  id: { type: DataTypes.UUID, primaryKey: true },
  user_id: { type: DataTypes.UUID, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  total_duration: { type: DataTypes.INTEGER }, // minutes
  perceived_effort: { type: DataTypes.INTEGER } // 1-5
}, {
  tableName: 'training_session',
  timestamps: false
});

// --- RELATIONS ---
userModel.hasMany(templateRoutineModel, { foreignKey: 'user_id' });
templateRoutineModel.belongsTo(userModel, { foreignKey: 'user_id' });

templateRoutineModel.hasMany(templateExercisesModel, { foreignKey: 'routine_id' });
templateExercisesModel.belongsTo(templateRoutineModel, { foreignKey: 'routine_id' });

catExerciseModel.hasMany(templateExercisesModel, { foreignKey: 'exercise_id' });
templateExercisesModel.belongsTo(catExerciseModel, { foreignKey: 'exercise_id' });

userModel.hasMany(trainingSessionModel, { foreignKey: 'user_id' });
trainingSessionModel.belongsTo(userModel, { foreignKey: 'user_id' });

trainingSessionModel.hasMany(exerciseDoneModel, { foreignKey: 'session_id' });
exerciseDoneModel.belongsTo(trainingSessionModel, { foreignKey: 'session_id' });

catExerciseModel.hasMany(exerciseDoneModel, { foreignKey: 'exercise_id' });
exerciseDoneModel.belongsTo(catExerciseModel, { foreignKey: 'exercise_id' });
