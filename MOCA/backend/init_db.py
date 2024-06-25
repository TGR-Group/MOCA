import psycopg2
from psycopg2 import sql
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

def create_database():
    # Fetch admin credentials and host info from environment variables
    user = os.getenv('PG_ADMIN_USER')
    password = os.getenv('PG_ADMIN_PASSWORD')
    host = os.getenv('PG_HOST')
    port = os.getenv('PG_PORT', 5432)  # Default port for PostgreSQL is 5432

    # Connect to the default 'postgres' database using admin credentials
    conn = psycopg2.connect(dbname='postgres', user=user, password=password, host=host, port=port)
    conn.set_client_encoding('UTF8')
    conn.autocommit = True
    cur = conn.cursor()

    # Check if the target database exists
    cur.execute("SELECT 1 FROM pg_database WHERE datname = %s", (os.getenv('DB_NAME'),))
    exists = cur.fetchone()
    if not exists:
        # Create the database if it does not exist
        cur.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(os.getenv('DB_NAME'))))

    # Check if the target user exists
    cur.execute("SELECT 1 FROM pg_roles WHERE rolname = %s", (os.getenv('DB_USER'),))
    exists = cur.fetchone()
    if not exists:
        # Create the user and assign a password if the user does not exist
        cur.execute(sql.SQL("CREATE USER {} WITH PASSWORD %s").format(sql.Identifier(os.getenv('DB_USER'))), (os.getenv('DB_PASSWORD'),))
        # Grant all privileges on the new database to the new user
        cur.execute(sql.SQL("GRANT ALL PRIVILEGES ON DATABASE {} TO {}").format(sql.Identifier(os.getenv('DB_NAME')), sql.Identifier(os.getenv('DB_USER'))))

    # Close the cursor and connection
    cur.close()
    conn.close()

if __name__ == '__main__':
    create_database()