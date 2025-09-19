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
  weight: { type: DataTypes.DECIMAL(5, 2) },
  height: { type: DataTypes.DECIMAL(5, 2) },
  avatar: { type: DataTypes.STRING }
}, {
  tableName: 'sec_user',
  timestamps: false
});

export const templateRoutineModel = sequelize.define('template_routine', {
  id: { type: DataTypes.UUID, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false, field: "user_id" },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT }
}, {
  tableName: 'template_routine',
  timestamps: false,
  defaultScope: {
    attributes: { exclude: ['user_id'] }
  }
});


export const templateExercisesModel = sequelize.define('templateExercises', {
  id: { type: DataTypes.UUID, primaryKey: true },
  routineId: { type: DataTypes.UUID, allowNull: false, field: "routine_id" },
  exerciseId: { type: DataTypes.UUID, allowNull: false, field: "exercise_id" },
  numSeries: { type: DataTypes.INTEGER, field: "num_series" },
  numRepeats: { type: DataTypes.INTEGER, field: "num_repeats" }
}, {
  tableName: 'template_exercises',
  timestamps: false,
  attributes: { exclude: ['routine_id', 'exercise_id', 'num_series', 'num_repeats'] }
});


export const catExerciseModel = sequelize.define('exercise', {
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


export const exerciseDoneModel = sequelize.define('exercisesDone', {
  id: { type: DataTypes.UUID, primaryKey: true },
  sessionId: { type: DataTypes.UUID, allowNull: false, field: 'session_id' },
  exerciseId: { type: DataTypes.UUID, allowNull: false, field: 'exercise_id' },
  series: { type: DataTypes.INTEGER },
  repeatsPerSeries: { type: DataTypes.ARRAY(DataTypes.INTEGER), field: 'repeats_per_series' },
  weightPerSeries: { type: DataTypes.ARRAY(DataTypes.DECIMAL(5, 2)), field: 'weight_per_series' },
  comments: { type: DataTypes.TEXT }
}, {
  tableName: 'exercise_done',
  timestamps: false
});


export const trainingSessionModel = sequelize.define('training_session', {
  id: { type: DataTypes.UUID, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id' },
  startDate: { type: DataTypes.DATE, allowNull: false, field: 'start_date' },
  endDate: { type: DataTypes.DATE, field: 'end_date' },
  totalDuration: { type: DataTypes.INTEGER, field: 'total_duration' }, // minutes
  perceivedEffort: { type: DataTypes.INTEGER, field: 'perceived_effort' } // 1-5
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
templateExercisesModel.belongsTo(catExerciseModel, { foreignKey: 'exercise_id', as: 'exercise' });

userModel.hasMany(trainingSessionModel, { foreignKey: 'user_id' });
trainingSessionModel.belongsTo(userModel, { foreignKey: 'user_id' });

trainingSessionModel.hasMany(exerciseDoneModel, { foreignKey: 'session_id', as: 'exercisesDone' });
exerciseDoneModel.belongsTo(trainingSessionModel, { foreignKey: 'session_id' });

catExerciseModel.hasMany(exerciseDoneModel, { foreignKey: 'exercise_id' });
exerciseDoneModel.belongsTo(catExerciseModel, { foreignKey: 'exercise_id' });
