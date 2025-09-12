import { createClient } from 'redis';

const client = createClient({ url: 'redis://127.0.0.1:6379' });

client.on('error', (err) => console.error('Redis error:', err));

await client.connect();

await client.set('foo', 'bar');
const value = await client.get('foo');
console.log('Redis says foo =', value);

await client.disconnect();
