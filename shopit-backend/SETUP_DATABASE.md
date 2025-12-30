# Set Up griscat_db as Main Database

This guide will help you drop old databases and set up `griscat_db` as your main database.

## Step-by-Step Setup

### Step 1: Drop Old Databases and Create griscat_db

**Method A: Using psql (Command Line)**

```powershell
# Connect to PostgreSQL
psql -U postgres

# In psql, run these commands:
DROP DATABASE IF EXISTS shopit_db;
DROP DATABASE IF EXISTS shopit-db;
CREATE DATABASE griscat_db;

# Verify the database was created
\l

# Exit psql
\q
```

**Method B: Using SQL File**

```powershell
cd shopit-backend
psql -U postgres -f prisma/setup-database.sql
```

**Method C: Using pgAdmin (GUI)**

1. Open pgAdmin
2. Connect to your PostgreSQL server
3. Right-click on "Databases" → "Delete/Drop" for `shopit_db` and `shopit-db` (if they exist)
4. Right-click on "Databases" → "Create" → "Database"
5. Name it: `griscat_db`
6. Click "Save"

### Step 2: Update .env File

Make sure your `.env` file in `shopit-backend` directory uses `griscat_db`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/griscat_db?schema=public"
```

**Replace:**
- `username` with your PostgreSQL username (usually `postgres`)
- `password` with your PostgreSQL password

### Step 3: Run Migrations

Create all the database tables:

```powershell
cd shopit-backend
npx prisma migrate dev
# or
yarn prisma migrate dev
```

This will:
- Create all necessary tables based on your Prisma schema
- Generate Prisma Client

### Step 4: Seed the Database

Populate the database with initial data:

```powershell
yarn prisma db seed
# or
yarn ts-node prisma/seed.ts
```

This will create:
- Collections: Áo, Quần, Vải
- Sample products

### Step 5: Verify Setup

Check that everything is working:

```powershell
# Open Prisma Studio to view your data
npx prisma studio
```

This will open a browser at `http://localhost:5555` where you can see all your tables and data.

## Quick Command Summary

```powershell
# 1. Drop old DBs and create griscat_db (in psql)
psql -U postgres
DROP DATABASE IF EXISTS shopit_db;
DROP DATABASE IF EXISTS shopit-db;
CREATE DATABASE griscat_db;
\q

# 2. Update .env file (make sure DATABASE_URL uses griscat_db)

# 3. Run migrations
cd shopit-backend
yarn prisma migrate dev

# 4. Seed database
yarn prisma db seed

# 5. Verify (optional)
npx prisma studio
```

## Troubleshooting

**Error: "database does not exist"**
- Make sure you created `griscat_db` in Step 1
- Verify your `.env` file has the correct database name

**Error: "permission denied"**
- Make sure your PostgreSQL user has permission to create databases
- You may need to use the `postgres` superuser

**Error: "connection refused"**
- Make sure PostgreSQL is running
- Check your connection string in `.env`

## Next Steps

After setting up the database:
- Your backend should connect to `griscat_db`
- All API endpoints will use this database
- You can start the backend server: `yarn start` or `yarn dev`

