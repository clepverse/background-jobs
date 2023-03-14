import Queue from 'bull';
import redisConfig from '../../config/redis';

import * as jobs from '../jobs';

const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  handle: job.handle,
  options: job.options,
}));

export default {
  queues,
  add(name, data) {
    try {
      const queue = this.queues.find((queue) => queue.name === name);

      if (!queue) {
        throw new Error(`QUEUE ${name} NOT FOUND`);
      }

      return queue.bull.add(data, queue.options);
    } catch (err) {
      console.log('QUEUE ERROR [ADD]:', err?.message);
    }
  },
  process() {
    try {
      return this.queues.forEach((queue) => {
        queue.bull.process(queue.handle);

        queue.bull.on('failed', (job, result) => {
          console.log('Job failed', queue.key, job.data);
          console.log(result);
        });

        queue.bull.on('error', (job, result) => {
          console.log('Job error', queue.key, job.data);
          console.log(result);
        });

      });
    } catch (err) {
      console.log('QUEUE ERROR [PROCESS]:', err?.message);
    }
  },
};
