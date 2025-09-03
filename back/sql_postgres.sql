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