import 'dotenv/config';

import Queue from './app/lib/Queue';

Queue.process();

console.log('Queue is running...');