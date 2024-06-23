import { Hono } from 'hono';
import { Client } from 'pg';
import 'dotenv/config';
import bcrypt from 'bcrypt';

const app = new Hono();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect();

app.get('/api/queues', async (c) => {
    const res = await client.query('SELECT user_id, status, EXTRACT(EPOCH FROM (now() - created_at)) as wait_time FROM queues WHERE status = $1', ['waiting']);
    return c.json(res.rows);
});

app.post('/api/register', async (c) => {
    const { name, password } = await c.req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        await client.query('INSERT INTO staff (id, name, password_hash, created_at) VALUES (gen_random_uuid(), $1, $2, now())', [name, hashedPassword]);
        return c.json({ message: 'User registered successfully' });
    } catch (error) {
        return c.json({ error: 'User registration failed' }, 400);
    }
});

app.put('/api/queues/:userId/status', async (c) => {
    const { userId } = c.req.param();
    const { status } = await c.req.json();
    
    try {
        await client.query('UPDATE queues SET status = $1 WHERE user_id = $2', [status, userId]);
        return c.json({ message: 'Status updated successfully' });
    } catch (error) {
        return c.json({ error: 'Status update failed' }, 400);
    }
});

app.fire();
