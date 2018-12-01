// @flow
import {workerServer, MINUTE, heretic, chalk, log} from 'distraught';

function testDequeue(job: {payload: Object}, message: any, done: Function) {
  log(chalk.yellow.bold('Dequeueing job: Test queue'));
  return Promise.resolve()
    .then(done);
}

function testEnqueue() {
  console.log(chalk.red.bold('Enqueueing test job'));
  heretic.ck.enqueue('test.dequeue', {some: 'variable'}); // (queueName, payload)
  setTimeout(testEnqueue, 10000); // enqueues a job every 10 seconds
}

exports.startWorkerServer = () => {
  const debug = process.env.WORKER_DEBUG;
  const server = workerServer({
    heretic: heretic.ck,
    requiredEnv: [],
    queues: [
      {name: 'test.dequeue', concurrency: 3, handler: testDequeue, isEnabled: process.env.NODE_ENV === 'development', alertAt: MINUTE, killAt: MINUTE * 2, debug},
    ],
  });
  server.start();
  testEnqueue();
};
