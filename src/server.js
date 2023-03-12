import 'dotenv/config';

import express from 'express';
const { ExpressAdapter } = require('@bull-board/express');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
import UserController from './app/controllers/userController';

import Queue from './app/lib/Queue';

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullAdapter(Queue.queues.map((queue) => queue.bull))],
  serverAdapter: serverAdapter,
});

// queuesBull.setQueues([new BullAdapter(Queue.queues.map((queue) => queue.bull))]);

const app = express();

app.use(express.json());

const userController = new UserController();

app.post('/users', userController.store);

app.use('/admin/queues', serverAdapter.getRouter());

app.listen(3333, () => {
  console.log('Server is running on port 3333');
  console.log('For the UI, open http://localhost:3333/admin/queues');
});
