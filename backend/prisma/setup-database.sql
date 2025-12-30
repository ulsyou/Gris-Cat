-- Script to drop old databases and create griscat_db
-- Run this in PostgreSQL (psql or pgAdmin)

-- Drop old databases if they exist
DROP DATABASE IF EXISTS shopit_db;
DROP DATABASE IF EXISTS "shopit-db";

-- Drop griscat_db if it exists (to start fresh)
DROP DATABASE IF EXISTS griscat_db;

-- Create the new main database
CREATE DATABASE griscat_db;

-- Grant privileges (adjust username as needed)
-- GRANT ALL PRIVILEGES ON DATABASE griscat_db TO your_username;

-- Connect to the new database to verify
-- \c griscat_db

