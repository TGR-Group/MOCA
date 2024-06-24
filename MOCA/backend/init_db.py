import psycopg2
from psycopg2 import sql
from dotenv import load_dotenv
import os

def create_database():
    load_dotenv()

    user = os.getenv('PG_ADMIN_USER')
    password = os.getenv('PG_ADMIN_PASSWORD')
    host = os.getenv('PG_HOST')
    port = os.getenv('PG_PORT')

    new_user = os.getenv('DB_USER')
    new_password = os.getenv('DB_PASSWORD')
    new_db = os.getenv('DB_NAME')

    conn = psycopg2.connect(dbname='postgres', user=user, password=password, host=host, port=port)
    conn.autocommit = True
    cursor = conn.cursor()

    cursor.execute(sql.SQL("CREATE USER {} WITH PASSWORD %s").format(sql.Identifier(new_user)), [new_password])

    cursor.execute(sql.SQL("CREATE DATABASE {} OWNER {}").format(sql.Identifier(new_db), sql.Identifier(new_user)))

    cursor.close()
    conn.close()

if __name__ == '__main__':
    create_database()
