import cluster from 'cluster';
import os from 'os';

import { app, port } from './app.js';

if (cluster.isPrimary) {
  console.clear();
  console.log(`Master ${process.pid} is running`);

  const numCPUs = os.cpus().length;
  // Forzar round-robin
  cluster.schedulingPolicy = cluster.SCHED_RR;

  // Crear un worker por cada núcleo
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Reemplazar workers que mueran
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  app.listen(port, () => {
    console.log(`Worker ${process.pid} listening on http://localhost:${port}`);
  });
}
