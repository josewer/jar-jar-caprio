CREATE DATABASE db_movies;

-- Habilitar extensión para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear tabla de ejercicios
CREATE TABLE EXERCISE (
    ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    NAME VARCHAR(50) NOT NULL,
    MUSCLE VARCHAR(50) NOT NULL,
    CATEGORY VARCHAR(50) NOT NULL
);

-- USERS TABLE
CREATE TABLE sec_user (
    id UUID PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    birth_date DATE,
    email VARCHAR(100) UNIQUE,
    weight DECIMAL(5,2),   -- in kg
    height DECIMAL(5,2),   -- in cm
    avatar VARCHAR(255)
);

-- TEMPLATE ROUTINES
CREATE TABLE template_routine (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES sec_user(id),
    name VARCHAR(100) NOT NULL,
    description TEXT
);
CREATE INDEX idx_template_routine_user ON template_routine(user_id);

-- CATALOG OF EXERCISES
CREATE TABLE cat_exercise (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    main_muscle VARCHAR(50) NOT NULL,
    involved_muscles TEXT[],  
    equipment TEXT[],       
    type VARCHAR(50),
    difficulty INT CHECK (difficulty BETWEEN 1 AND 3)
);

-- TEMPLATE EXERCISES
CREATE TABLE template_exercises (
    id UUID PRIMARY KEY,
    routine_id UUID NOT NULL REFERENCES template_routine(id),
    exercise_id UUID NOT NULL REFERENCES cat_exercise(id),
    num_series INT,
    num_repeats INT
);
CREATE INDEX idx_template_exercises_routine ON template_exercises(routine_id);
CREATE INDEX idx_template_exercises_exercise ON template_exercises(exercise_id);


-- TRAINING SESSIONS
CREATE TABLE training_session (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES sec_user(id),
    date DATE NOT NULL,
    total_duration INT,        -- minutes
    perceived_effort INT       -- scale 1-5
);
CREATE INDEX idx_training_session_user ON training_session(user_id);
CREATE INDEX idx_training_session_date ON training_session(date);

-- REALIZED EXERCISES
CREATE TABLE exercise_done (
    id UUID PRIMARY KEY,
    session_id UUID NOT NULL REFERENCES training_session(id),
    exercise_id UUID NOT NULL REFERENCES cat_exercise(id),
    series INT,
    repeats_per_series INT[],
    weight_per_series DECIMAL(5,2)[],
    comments TEXT
);
CREATE INDEX idx_exercise_done_session ON exercise_done(session_id);
CREATE INDEX idx_exercise_done_exercise ON exercise_done(exercise_id);


ALTER TABLE training_session
  RENAME COLUMN date TO start_date;

ALTER TABLE training_session
  ALTER COLUMN start_date TYPE TIMESTAMP USING start_date::timestamp;

ALTER TABLE training_session
  ADD COLUMN end_date TIMESTAMP;

ALTER TABLE cat_exercise
  ADD COLUMN description TEXT;


ALTER TABLE cat_exercise
  ALTER COLUMN involved_muscles TYPE VARCHAR(50)[];

ALTER TABLE cat_exercise
  ALTER COLUMN equipment TYPE VARCHAR(50)[];

ALTER TABLE template_exercises
  ADD COLUMN rest_time VARCHAR(5),
  ADD COLUMN type CHAR(1),
  ADD COLUMN time_per_set VARCHAR(5);