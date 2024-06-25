import psycopg2
from psycopg2 import sql
from dotenv import load_dotenv
import os

load_dotenv()

def create_database():
    user = os.getenv('PG_ADMIN_USER')
    password = os.getenv('PG_ADMIN_PASSWORD')
    host = os.getenv('PG_HOST')
    port = os.getenv('PG_PORT',5432)

    conn = psycopg2.connect(dbname='postgres', user=user, password=password, host=host, port=port)
    conn.set_client_encoding('UTF8')
    conn.autocommit = True
    cur = conn.cursor()

    cur.execute("SELECT 1 FROM pg_database WHERE datname = %s", (os.getenv('DB_NAME'),))
    exists = cur.fetchone()
    if not exists:
        cur.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(os.getenv('DB_NAME'))))

    cur.execute("SELECT 1 FROM pg_roles WHERE rolname = %s", (os.getenv('DB_USER'),))
    exists = cur.fetchone()
    if not exists:
        cur.execute(sql.SQL("CREATE USER {} WITH PASSWORD %s").format(sql.Identifier(os.getenv('DB_USER'))), (os.getenv('DB_PASSWORD'),))
        cur.execute(sql.SQL("GRANT ALL PRIVILEGES ON DATABASE {} TO {}").format(sql.Identifier(os.getenv('DB_NAME')), sql.Identifier(os.getenv('DB_USER'))))

    cur.close()
    conn.close()

if __name__ == '__main__':
    create_database()
