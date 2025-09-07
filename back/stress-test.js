const url = 'http://localhost:3000/exercises';
const concurrentRequests = 12; // requests simultáneas
const totalRequests = 1000; // total de requests a enviar

const workerCount = {}; // Contador de requests por worker

async function makeRequest (i) {
  const start = Date.now();
  try {
    const body = {
      name: 'Row',
      muscle: 'Back',
      category: 'Strength'
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const worker = res.headers.get('X-Worker-PID') || 'unknown';
    const time = Date.now() - start;

    console.log(`Request ${i} atendida por Worker ${worker} en ${time} ms`);

    // Contar requests por worker
    if (!workerCount[worker]) workerCount[worker] = 0;
    workerCount[worker]++;
  } catch (err) {
    console.error(`Request ${i} falló:`, err.message);
  }
}

async function runTest () {
  const promises = [];

  const now = Date.now();

  for (let i = 1; i <= totalRequests; i++) {
    promises.push(makeRequest(i));

    // Limitar concurrencia
    if (promises.length >= concurrentRequests) {
      await Promise.all(promises);
      promises.length = 0;
    }
  }

  if (promises.length > 0) await Promise.all(promises);

  console.log('\n--- Resumen por Worker ---');
  for (const worker in workerCount) {
    console.log(`Worker ${worker} atendió ${workerCount[worker]} requests`);
  }

  console.log(`Tardo: ${Date.now() - now} ms`);
  console.log('\nTest terminado');
}

runTest();
